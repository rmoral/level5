-- level5.ad — migración 0001a: esquema propio dentro del proyecto de Fifth Landing
-- (especificación 1.4, §5.4). Se aplica ANTES de 0001.
--
-- Orden de aplicación (ver supabase/README.md):
--   1. 0001a_level5_esquema.sql
--   2. 0001_level5_web.sql, sin cambios, con search_path = level5, extensions
--   3. 0002_level5_permisos.sql

create schema if not exists level5;

-- Las extensiones van al esquema "extensions" de Supabase, no a level5. Si ya
-- están instaladas, no se tocan; así el "create extension if not exists" de 0001
-- no hace nada.
create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;

-- Nadie salvo el rol de servicio entra en el esquema.
revoke all on schema level5 from public;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    execute 'revoke all on schema level5 from anon';
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    execute 'revoke all on schema level5 from authenticated';
  end if;
end $$;
grant usage on schema level5 to service_role;
