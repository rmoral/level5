# Prompts para Claude Code — level5.ad

## Cómo proceder

1. **Crea una carpeta vacía**, por ejemplo `~/Proyectos/level5-web`, e inicializa el repositorio (`git init`).
2. **Descomprime `level5-web-kit.zip` dentro.** Quedan `CLAUDE.md` en la raíz, `docs/01-WEB-SPEC.md`, `reference/` (los dos artboards del canvas) y `supabase/0001_level5_web.sql`.
3. Ten a mano lo que Claude Code te va a pedir. Para W1 no hace falta nada. Para W2: proyecto de Supabase (región Frankfurt), datos del SMTP, correos que reciben los avisos y el dominio.
4. Abre Claude Code en la carpeta y pega el prompt de arranque. Trabaja **un hito por sesión**.

Canvas de diseño, por si quieres tenerlo abierto al lado: https://claude.ai/artifact/NgFf6Y7afPtGKpZ4DLYbkS

---

## Prompt de arranque (W1)

```
Vas a construir level5.ad, el sitio one-page institucional de Level Five (Level 5, SL, Andorra): presenta el grupo, enlaza a sus seis verticales y recoge consultas y correos de interesados. Se lanza en castellano, catalán, francés e inglés, con el castellano por defecto en la raíz. Toda la especificación está en este repositorio:

- CLAUDE.md: reglas de trabajo. Léelo primero.
- docs/01-WEB-SPEC.md: alcance, secciones, formulario y datos, movimiento, imágenes, pila técnica, criterios de aceptación e hitos.
- reference/Main.dc.html y reference/Movil.dc.html: las maquetas del canvas de diseño (escritorio a 1440 px y móvil a 390 px). Mandan en estructura, textos y dirección visual. Son archivos de un editor de diseño: úsalos como referencia de marcado, estilos en línea y contenido, pero no copies su código de editor (support.js, <x-dc>, la clase Component). Los datos de las seis verticales están en el bloque de script de Main.dc.html.
- supabase/0001_level5_web.sql: la migración, ya probada contra Postgres 16.

Antes de escribir código:
1. Lee CLAUDE.md, docs/01-WEB-SPEC.md y los dos archivos de reference/ completos.
2. Resume en una lista el plan de hitos W1, W2 y W3 con lo que entrega cada uno.
3. Dime qué decisiones "decide tú" vas a tomar en W1 y con qué criterio.

Después construye el hito W1: proyecto Next.js 15 (App Router, TypeScript), tokens del sistema Level Five como variables CSS, fuentes autoalojadas con next/font, y las nueve secciones de la página en castellano, estáticas y responsive, con todo el texto en content/ portado literalmente del canvas. Deja ya montada la estructura de rutas por idioma de la sección 3.5 (/ en castellano, /ca, /fr, /en) y el selector de la cabecera, aunque en W1 solo exista content/es.ts. La sección de verticales funciona en W1 como pestañas (clic y teclado), sin fijado por scroll todavía.

Imágenes: para cada hueco de la tabla de la sección 7.1 de la especificación, busca en Unsplash o Pexels una fotografía que cumpla lo descrito, enséñame dos o tres candidatas por hueco con su enlace antes de descargar nada, y cuando yo elija descárgalas a public/img/, aplícales el tratamiento indicado y regístralas en docs/IMAGES.md con fuente, autor y licencia comprobada en la ficha. Las dos fotos de paisaje tienen que ser de Andorra de verdad.

No pases a W2. Al terminar, ejecuta lint, typecheck y Lighthouse en móvil, compara la página con los dos artboards a 1440 y 390 px, y dame el resumen de cinco líneas que marca CLAUDE.md.
```

---

## Prompt del hito W2 (movimiento y formulario)

```
Lee CLAUDE.md y docs/DECISIONS.md. W1 está cerrado. Construye el hito W2 de docs/01-WEB-SPEC.md, en este orden:

1. Movimiento (sección 6): Lenis sincronizado con GSAP ScrollTrigger desde un único bucle; cabecera que cambia sobre el hero y se oculta al bajar; entrada del hero con máscara por líneas y parallax; sección de verticales fijada con seis tramos, fundido cruzado, barrido de la fotografía y cambio de acento; titular de "El grupo" encendiéndose palabra a palabra; transición de color de fondo entre secciones claras y oscuras; entradas escalonadas del resto. Todo desactivado con prefers-reduced-motion, y la página legible sin JavaScript. Enséñamelo funcionando antes de seguir con el punto 2.

2. Formulario (sección 5): aplica supabase/0001_level5_web.sql al proyecto de Supabase, acción de servidor con zod que llama a submit_inquiry y subscribe_news, antispam (campo trampa, tiempo mínimo, límite de ritmo con hash de IP), correos por SMTP con nodemailer (acuse, aviso interno con la vertical en el asunto, confirmación de novedades), y las rutas /confirmar/[token] y /baja/[token].

3. Legales con huecos marcados, SEO (metadatos, Open Graph tipográfico, sitemap, robots, datos estructurados Organization con las seis marcas), y analítica sin cookies con los eventos de la sección 3.1.

Antes de empezar el punto 2, pídeme las credenciales que necesites (Supabase, SMTP, correos de aviso, dominio) y espera a que te las dé; no las escribas en ningún archivo versionado.

Da el hito por cerrado solo cuando se cumplan en castellano los criterios de la sección 10. Ejecuta el flujo e2e de esa sección con Playwright en un viewport móvil y enséñame el resultado, junto con Lighthouse móvil con el movimiento activado.
```

---

## Prompt del hito W3 (catalán, francés e inglés, y publicación)

```
Lee CLAUDE.md y docs/DECISIONS.md. W2 está cerrado. Construye W3 de docs/01-WEB-SPEC.md según su sección 3.5:

1. Traduce content/es.ts a catalán, francés e inglés (content/ca.ts, content/fr.ts, content/en.ts). El catalán es el de Andorra, no una traducción literal del castellano; el francés es de Francia; el inglés, internacional. No traduzcas nombres de marca ni de producto.
2. Publica las tres versiones en /ca, /fr y /en con el selector de idioma conservando la sección, hreflang cruzado y x-default a la raíz. level5.ad debe seguir mostrando el castellano con cualquier idioma de navegador: sin redirección automática.
3. Traduce también los correos (acuse, confirmación de novedades, baja), las casillas de consentimiento, los mensajes de error del formulario, los metadatos, los textos alternativos y las páginas legales con sus huecos. El correo que recibe cada persona va en el idioma desde el que escribió.

Déjame las tres traducciones en una rama con vista previa y un documento docs/TRADUCCIONES.md con las frases en las que hayas dudado, para que las revisemos los socios antes de fusionar. Cuando las apruebe, comprueba todos los criterios de la sección 10 en los cuatro idiomas y dame el resumen de cierre: a partir de ahí el sitio se puede publicar.
```

---

## Prompts cortos

- **Continuar:** "Lee CLAUDE.md y docs/DECISIONS.md. Estamos en el hito [X]. Comprueba qué criterios de aceptación ya se cumplen y continúa con lo que falta."
- **Ajustar el movimiento:** "La transición de [sección] se siente [lenta / brusca / mareante]. Propón dos alternativas dentro de las reglas de la sección 6 de la especificación, enséñamelas en vista previa y espera a que elija."
- **Cambiar un texto o una vertical:** "Cambia [qué] en content/[archivo]. No toques los componentes."
- **Cambiar la especificación:** "Propongo cambiar [qué] en docs/01-WEB-SPEC.md §[n] por [motivo]. Edita primero la especificación, enséñame el diff y, si lo apruebo, impleméntalo."
- **Revisión final:** "Ejecuta tests, lint y typecheck, pasa Lighthouse móvil y el flujo e2e de la sección 10, y dame los resultados antes de dar el hito por cerrado."
