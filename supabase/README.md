# Base de datos de level5.ad

Desde la especificación 1.4 (§5.4), los datos de level5.ad viven en el **esquema `level5`
del proyecto de Supabase de Fifth Landing**, separado de las tablas de la vertical.

## Orden de aplicación

1. `0001a_level5_esquema.sql`: crea el esquema `level5` e instala `pgcrypto` y `citext`
   en el esquema `extensions` si no lo están.
2. `0001_level5_web.sql`, **sin modificar**, ejecutado en la misma sesión con:

   ```sql
   set search_path = level5, extensions;
   -- a continuación, el contenido de 0001_level5_web.sql
   ```

   Así sus tipos, tablas y funciones se crean en `level5` y no en `public`.
3. `0002_level5_permisos.sql`: fija el `search_path` de las funciones y deja el esquema
   solo para el rol de servicio (`anon` y `authenticated` sin acceso).
4. `0003_level5_suscripciones_y_ritmo.sql`: confirmación y baja de novedades
   (`confirm_subscription`, `unsubscribe`) y límite de ritmo (`rate_events`, `rate_hit`).

## Después de aplicar

En el panel de Supabase del proyecto: **Project Settings → Data API → Exposed schemas**,
añadir `level5`. Sin ese paso, la acción de servidor no puede llamar a
`level5.submit_inquiry` desde `supabase-js` (`.schema("level5").rpc(...)`). Con los
permisos de 0002, exponerlo no da acceso a `anon` ni a `authenticated`.

## Probado

El conjunto se ha probado contra Postgres 16 local con los roles de Supabase
(`anon`, `authenticated`, `service_role`) y el esquema `extensions` simulados.
