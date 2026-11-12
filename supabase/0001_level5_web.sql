-- level5.ad — migración 0001: contactos, consultas, consentimientos y altas a novedades
-- Postgres 16 / Supabase. Todo el acceso es por servidor (service role); RLS activado sin políticas públicas.

create extension if not exists pgcrypto;
create extension if not exists citext;

create type inquiry_interest as enum ('intelligence','foundry','landing','academy','labs','valira','grupo','nose');
create type inquiry_status   as enum ('new','routed','answered','closed','spam');
create type consent_purpose  as enum ('inquiry','news');
create type subscription_status as enum ('pending','confirmed','unsubscribed');

create table contacts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  email       citext not null unique,
  name        text,
  company     text,
  locale      text not null default 'es' check (locale in ('es','ca','fr','en'))
);

create table inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  contact_id  uuid not null references contacts(id) on delete cascade,
  interest    inquiry_interest not null,
  message     text not null check (char_length(message) between 1 and 5000),
  status      inquiry_status not null default 'new',
  routed_to   text,
  routed_at   timestamptz,
  source_page text,
  utm_source  text, utm_medium text, utm_campaign text,
  ip_hash     text
);
create index inquiries_status_idx  on inquiries (status, created_at desc);
create index inquiries_contact_idx on inquiries (contact_id);

-- Inmutable: un cambio de consentimiento crea fila nueva.
create table consents (
  id          uuid primary key default gen_random_uuid(),
  contact_id  uuid not null references contacts(id) on delete cascade,
  purpose     consent_purpose not null,
  granted     boolean not null,
  version     text not null,
  locale      text not null,
  source_page text,
  granted_at  timestamptz not null default now()
);
create index consents_contact_idx on consents (contact_id, purpose, granted_at desc);

create table subscriptions (
  id                uuid primary key default gen_random_uuid(),
  contact_id        uuid not null unique references contacts(id) on delete cascade,
  status            subscription_status not null default 'pending',
  confirm_token     uuid not null unique default gen_random_uuid(),
  unsubscribe_token uuid not null unique default gen_random_uuid(),
  requested_at      timestamptz not null default now(),
  confirmed_at      timestamptz,
  unsubscribed_at   timestamptz
);

create table settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

insert into settings (key, value) values
  ('consent_version', '"2026-11-v1"'),
  ('notify_emails',   '[]'),
  ('contact_email',   'null'),
  ('company_legal',   '{"name":"Level 5, SL","status":"en_constitucion","nrt":null,"address":null,"registry":null,"country":"Principat d''Andorra"}'),
  ('verticals', '{
    "intelligence": {"name":"Fifth Intelligence","url":"https://www.fifth-intelligence.com"},
    "foundry":      {"name":"Fifth Foundry","url":"https://fifth-foundry.com"},
    "landing":      {"name":"Fifth Landing","url":"https://fifth-landing.com"},
    "academy":      {"name":"Fifth Academy","url":"https://fifth-academy.com"},
    "labs":         {"name":"Fifth Labs","url":"https://fifth-labs.com"},
    "valira":       {"name":"Valira Valley","url":"https://valiravalley.com"}
  }');

create or replace function touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
create trigger contacts_touch before update on contacts for each row execute function touch_updated_at();
create trigger settings_touch before update on settings for each row execute function touch_updated_at();

create or replace function consents_immutable() returns trigger language plpgsql as $$
begin raise exception 'consents es inmutable: inserta una fila nueva'; end $$;
create trigger consents_no_update before update on consents for each row execute function consents_immutable();

-- Alta atómica de una consulta desde el formulario (la llama la acción de servidor).
create or replace function submit_inquiry(
  p_email text, p_name text, p_company text, p_locale text,
  p_interest inquiry_interest, p_message text,
  p_consent_news boolean, p_consent_version text,
  p_source_page text default null,
  p_utm_source text default null, p_utm_medium text default null, p_utm_campaign text default null,
  p_ip_hash text default null
) returns table (inquiry_id uuid, confirm_token uuid) language plpgsql as $$
declare v_contact uuid; v_inquiry uuid; v_token uuid;
begin
  insert into contacts (email, name, company, locale)
  values (p_email, nullif(p_name,''), nullif(p_company,''), p_locale)
  on conflict (email) do update
    set name = coalesce(excluded.name, contacts.name),
        company = coalesce(excluded.company, contacts.company)
  returning id into v_contact;

  insert into inquiries (contact_id, interest, message, source_page, utm_source, utm_medium, utm_campaign, ip_hash)
  values (v_contact, p_interest, p_message, p_source_page, p_utm_source, p_utm_medium, p_utm_campaign, p_ip_hash)
  returning id into v_inquiry;

  insert into consents (contact_id, purpose, granted, version, locale, source_page)
  values (v_contact, 'inquiry', true, p_consent_version, p_locale, p_source_page);

  if p_consent_news then
    insert into consents (contact_id, purpose, granted, version, locale, source_page)
    values (v_contact, 'news', true, p_consent_version, p_locale, p_source_page);
    insert into subscriptions (contact_id) values (v_contact)
    on conflict (contact_id) do update
      set status = case when subscriptions.status = 'confirmed' then subscriptions.status else 'pending' end,
          requested_at = now()
    returning subscriptions.confirm_token into v_token;
  end if;

  return query select v_inquiry, v_token;
end $$;

-- Alta solo a novedades (formulario del pie).
create or replace function subscribe_news(p_email text, p_locale text, p_consent_version text, p_source_page text default null)
returns uuid language plpgsql as $$
declare v_contact uuid; v_token uuid;
begin
  insert into contacts (email, locale) values (p_email, p_locale)
  on conflict (email) do update set locale = contacts.locale
  returning id into v_contact;
  insert into consents (contact_id, purpose, granted, version, locale, source_page)
  values (v_contact, 'news', true, p_consent_version, p_locale, p_source_page);
  insert into subscriptions (contact_id) values (v_contact)
  on conflict (contact_id) do update
    set status = case when subscriptions.status = 'confirmed' then subscriptions.status else 'pending' end,
        requested_at = now()
  returning subscriptions.confirm_token into v_token;
  return v_token;
end $$;

alter table contacts      enable row level security;
alter table inquiries     enable row level security;
alter table consents      enable row level security;
alter table subscriptions enable row level security;
alter table settings      enable row level security;
