-- level5.ad — migración 0003: confirmación y baja de novedades, y límite de ritmo
-- (especificación §3.4, §5.2 y §5.3). Se aplica DESPUÉS de 0002, en el proyecto de
-- Fifth Landing. Todo se crea en el esquema level5 con nombres cualificados.

-- Límite de ritmo: solo hashes (IP o correo con sal rotatoria diaria), nunca datos en claro.
create table level5.rate_events (
  id         bigint generated always as identity primary key,
  kind       text not null,
  key_hash   text not null,
  created_at timestamptz not null default now()
);
create index rate_events_lookup_idx on level5.rate_events (kind, key_hash, created_at desc);
alter table level5.rate_events enable row level security;

-- Devuelve false si alguna clave ha alcanzado el límite en la ventana; si no,
-- registra el intento para todas las claves y devuelve true. Limpia lo de más de un día.
create or replace function level5.rate_hit(
  p_kind text, p_key_hashes text[], p_limit int, p_window interval default interval '1 hour'
) returns boolean language plpgsql set search_path = level5, extensions as $$
declare k text; n int;
begin
  delete from level5.rate_events where created_at < now() - interval '1 day';
  foreach k in array p_key_hashes loop
    select count(*) into n from level5.rate_events
      where kind = p_kind and key_hash = k and created_at > now() - p_window;
    if n >= p_limit then return false; end if;
  end loop;
  insert into level5.rate_events (kind, key_hash) select p_kind, unnest(p_key_hashes);
  return true;
end $$;

-- Doble opt-in: confirma una suscripción pendiente.
-- Devuelve 'confirmed', 'already_confirmed', 'unsubscribed' o 'not_found'.
create or replace function level5.confirm_subscription(p_token uuid)
returns text language plpgsql set search_path = level5, extensions as $$
declare v_status level5.subscription_status;
begin
  select status into v_status from level5.subscriptions where confirm_token = p_token for update;
  if not found then return 'not_found'; end if;
  if v_status = 'confirmed' then return 'already_confirmed'; end if;
  if v_status = 'unsubscribed' then return 'unsubscribed'; end if;
  update level5.subscriptions set status = 'confirmed', confirmed_at = now() where confirm_token = p_token;
  return 'confirmed';
end $$;

-- Baja en un clic: marca la suscripción y registra un consentimiento news con granted = false.
-- Devuelve 'unsubscribed', 'already_unsubscribed' o 'not_found'.
create or replace function level5.unsubscribe(
  p_token uuid, p_locale text, p_consent_version text, p_source_page text default null
) returns text language plpgsql set search_path = level5, extensions as $$
declare v_contact uuid; v_status level5.subscription_status;
begin
  select contact_id, status into v_contact, v_status
    from level5.subscriptions where unsubscribe_token = p_token for update;
  if not found then return 'not_found'; end if;
  if v_status = 'unsubscribed' then return 'already_unsubscribed'; end if;
  update level5.subscriptions set status = 'unsubscribed', unsubscribed_at = now()
    where unsubscribe_token = p_token;
  insert into level5.consents (contact_id, purpose, granted, version, locale, source_page)
    values (v_contact, 'news', false, p_consent_version, p_locale, p_source_page);
  return 'unsubscribed';
end $$;

-- Permisos: solo el rol de servicio.
revoke all on table level5.rate_events from public;
revoke all on function level5.rate_hit(text, text[], int, interval) from public;
revoke all on function level5.confirm_subscription(uuid) from public;
revoke all on function level5.unsubscribe(uuid, text, text, text) from public;
do $$
declare r text;
begin
  foreach r in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      execute format('revoke all on table level5.rate_events from %I', r);
      execute format('revoke all on function level5.rate_hit(text, text[], int, interval) from %I', r);
      execute format('revoke all on function level5.confirm_subscription(uuid) from %I', r);
      execute format('revoke all on function level5.unsubscribe(uuid, text, text, text) from %I', r);
    end if;
  end loop;
end $$;
grant select, insert, delete on table level5.rate_events to service_role;
grant execute on function level5.rate_hit(text, text[], int, interval) to service_role;
grant execute on function level5.confirm_subscription(uuid) to service_role;
grant execute on function level5.unsubscribe(uuid, text, text, text) to service_role;
