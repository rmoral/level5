-- level5.ad — migración 0002: permisos y search_path del esquema level5
-- (especificación 1.4, §5.4). Se aplica DESPUÉS de 0001.

-- Las funciones de 0001 nombran las tablas sin esquema: se fija su search_path
-- para que resuelvan siempre a level5, las llame quien las llame.
alter function level5.touch_updated_at() set search_path = level5, extensions;
alter function level5.consents_immutable() set search_path = level5, extensions;
alter function level5.submit_inquiry(
  text, text, text, text, level5.inquiry_interest, text, boolean, text, text, text, text, text, text
) set search_path = level5, extensions;
alter function level5.subscribe_news(text, text, text, text) set search_path = level5, extensions;

-- Postgres concede EXECUTE a PUBLIC en toda función nueva: se retira.
revoke all on all functions in schema level5 from public;
revoke all on all tables in schema level5 from public;
revoke all on all sequences in schema level5 from public;
revoke usage on type level5.inquiry_interest, level5.inquiry_status, level5.consent_purpose,
  level5.subscription_status from public;

do $$
declare r text;
begin
  foreach r in array array['anon', 'authenticated'] loop
    if exists (select 1 from pg_roles where rolname = r) then
      execute format('revoke all on all functions in schema level5 from %I', r);
      execute format('revoke all on all tables in schema level5 from %I', r);
      execute format('revoke all on all sequences in schema level5 from %I', r);
      execute format('alter default privileges in schema level5 revoke all on tables from %I', r);
      execute format('alter default privileges in schema level5 revoke all on functions from %I', r);
      execute format('alter default privileges in schema level5 revoke all on sequences from %I', r);
    end if;
  end loop;
end $$;

alter default privileges in schema level5 revoke execute on functions from public;

-- Solo el rol de servicio (acciones de servidor de level5.ad).
grant select, insert, update, delete on all tables in schema level5 to service_role;
grant usage, select on all sequences in schema level5 to service_role;
grant execute on all functions in schema level5 to service_role;
grant usage on type level5.inquiry_interest, level5.inquiry_status, level5.consent_purpose,
  level5.subscription_status to service_role;
alter default privileges in schema level5 grant select, insert, update, delete on tables to service_role;
alter default privileges in schema level5 grant execute on functions to service_role;
