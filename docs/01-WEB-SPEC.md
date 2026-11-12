# level5.ad — Brief para Claude Code

13 de noviembre de 2026 · @Ruben

Versión 1.2 · Level 5, SL · Complemento del canvas **"Level 5 — web (level5.ad)"** (Claude Design, sistema Level Five): https://claude.ai/artifact/NgFf6Y7afPtGKpZ4DLYbkS

Cambios de la 1.1: lanzamiento en cuatro idiomas con castellano por defecto (sección 3.5), dominio de Fifth Intelligence confirmado, Valira Valley confirmada en portada.

Cambios de la 1.2: los socios que se presentan son las dos sociedades, BrightTech y Saikaris, no personas (sección 4.7); Level 5, SL aún no está registrada (sección 4.10).

---

## 1. Qué es y dónde vive

Sitio institucional del grupo **Level Five** (Level 5, SL, Andorra) en **`level5.ad`**. Es un **one-page** con transiciones suaves al hacer scroll. Tiene tres trabajos, por este orden:

1. **Explicar el grupo en diez segundos**: una sociedad, seis marcas, un mismo equipo.
2. **Repartir tráfico a las verticales**: cada una tiene su propia web y su propia oferta; la portada del grupo no vende, dirige.
3. **Recoger consultas y correos de interesados**, con consentimiento registrado, y avisar a los socios.

No es un catálogo de servicios, no publica precios, no tiene blog (el contenido vive en Valira Valley y en Fifth Intelligence) y no tiene cuentas de usuario.

**Punto de partida obligatorio: el canvas**, con dos artboards: `Main` (la página completa a 1440 px, con el selector de verticales y el formulario funcionando) y `Movil` (referencia por debajo de 860 px). Sus copias están en `reference/Main.dc.html` y `reference/Movil.dc.html`. Contienen estructura, orden de secciones, textos definitivos en castellano y dirección visual. **Los textos se portan literalmente**; lo que aparezca entre corchetes es un dato pendiente (sección 12), no relleno.

El sitio se lanza en **cuatro idiomas** (castellano, catalán, francés e inglés), con el castellano por defecto en la raíz (sección 3.5).

Los archivos `.dc.html` son maquetas del editor de diseño: se leen como referencia de marcado, estilos y contenido, **no se copian como código** (ni `support.js`, ni `<x-dc>`, ni la clase `Component`).

---

## 2. Referencias y qué se toma de cada una

Patrones observados en webs de holdings, venture studios y consultoras, y cómo se aplican aquí. Son patrones, no plantillas: no se copia el diseño de ninguna.

| Patrón | De dónde viene | Cómo se aplica en level5.ad |
| --- | --- | --- |
| Hero a pantalla completa con una sola frase y una sola acción | Webs de holding de una página (Vivium, Prior Holdings) y de fondos (Northzone, Lux Capital) | Sección 4.1: titular único, entradilla de dos frases, un botón |
| El portfolio como protagonista, no como lista al pie | Venture studios (Hexa, Atomic, Antler) | Sección 4.4: las seis verticales ocupan la sección central, cada una con su pantalla |
| Scroll con sección fijada que cambia de contenido | Sitios premiados de una página (colección *Single page* y *Scrolling* de Awwwards; sitios de Locomotive) | Sección 6.4: la sección de verticales se fija y recorre las seis |
| Sobriedad editorial: tipografía grande, reglas finas, mucho aire | Grandes consultoras (McKinsey, BCG) y el resto de webs del grupo | Sección 8: identidad Level Five sin sombras ni degradados |
| Scroll suave con una sola fuente de tiempo | Lenis + GSAP ScrollTrigger, el estándar actual de estos sitios | Sección 6.1 |
| Franja de credenciales en mono en lugar de logotipos de clientes | Patrón ya usado en fifth-intelligence.com | Sección 4.2 |
| Formulario que pregunta "qué te interesa" y enruta | Webs de grupo con varias líneas de negocio | Sección 5 |

---

## 3. Alcance

### 3.1 v1 (W1–W3)

1. La página con las nueve secciones de la sección 4, en castellano, catalán, francés e inglés (sección 3.5).
2. Sistema de movimiento completo (sección 6) con alternativa sin movimiento.
3. Formulario de consulta y alta a novedades funcionando de extremo a extremo (sección 5), con correos de acuse, aviso interno y doble opt-in.
4. Imágenes de banco descargadas, tratadas y servidas desde el propio sitio (sección 7).
5. Páginas legales con huecos marcados para el texto de la gestoría: `/legal/aviso-legal`, `/legal/privacidad`, `/legal/cookies`.
6. SEO: metadatos, Open Graph, `sitemap.xml`, `robots.txt`, `canonical`, `hreflang`, datos estructurados `Organization` con las seis marcas en `brand` / `subOrganization` y sus URL.
7. Analítica sin cookies con eventos: clic en vertical (con `vertical`), cambio de vertical en el selector, cambio de idioma, inicio de formulario, consulta enviada (con `interest` y `locale`), alta a novedades.
8. Correos, casillas de consentimiento, mensajes de error y páginas legales en los cuatro idiomas, según el idioma en el que se envió el formulario.

### 3.2 v2 (tras el lanzamiento)

Vídeo del hero si los socios lo aportan (sección 7.3); webhook de la consulta al CRM de la vertical elegida; página `/prensa` con kit de marca.

### 3.3 Fuera de alcance

Blog, precios, cuentas de usuario, pagos, chat, píxeles de terceros, panel de administración (las consultas se leen en Supabase y llegan por correo), logotipos de clientes.

### 3.4 Rutas

```
/                         one-page en castellano (anclas #grupo #verticales #circulo #andorra #equipo #contacto)
/ca · /fr · /en           la misma página en catalán, francés e inglés
/confirmar/[token]        confirmación del alta a novedades (doble opt-in)
/baja/[token]             baja de novedades en un clic
/legal/aviso-legal · /legal/privacidad · /legal/cookies
/[idioma]/legal/… · /[idioma]/confirmar/… · /[idioma]/baja/…
/sitemap.xml · /robots.txt · /opengraph-image
```

Las anclas son URL reales: al cargar `level5.ad/#verticales` la página se sitúa en esa sección sin animación de entrada previa.

### 3.5 Idiomas

| Idioma | Ruta | `lang` |
| --- | --- | --- |
| Castellano (por defecto) | `/` | `es` |
| Catalán | `/ca` | `ca` |
| Francés | `/fr` | `fr` |
| Inglés | `/en` | `en` |

- **`level5.ad` muestra siempre el castellano.** No hay redirección automática por idioma del navegador ni por país: quien quiere otro idioma lo elige en el selector de la cabecera (ES · CA · FR · EN), que lleva a la misma sección de la página en el idioma elegido.
- `hreflang` cruzado entre las cuatro versiones, con `x-default` apuntando a `/`. Cada idioma con su `canonical`, sus metadatos y su imagen Open Graph.
- El castellano del canvas es el texto de origen. Catalán, francés e inglés se traducen a partir de él y **los revisan los socios antes de publicar**: el catalán es el de Andorra, el francés es de Francia y el inglés es internacional. Los nombres de marca y de producto (Audit, Program, Compass, Club Night…) no se traducen.
- Los enlaces a las verticales apuntan a la versión de la web de la vertical en ese idioma cuando exista (`content/verticals.ts` admite una URL por idioma); si no, a su portada.

---

## 4. La página, sección a sección

Orden y contenido según el artboard `Main`. Ids de sección entre paréntesis.

**4.1 Hero (`#inicio`).** Fondo de fotografía a sangre con velo `#0B1A33` al 55 %, cabecera transparente encima. Etiqueta en mono, titular *"Lo que una empresa necesita para crecer, bajo un mismo techo."*, entradilla, botón principal **"Cuéntanos tu caso"** (a `#contacto`) y enlace secundario "Ver las seis verticales ↓". Altura `100svh` con mínimo de 640 px.

**4.2 Franja de credenciales.** Cuatro frases en mono separadas por reglas. Sin logotipos.

**4.3 El grupo (`#grupo`).** Titular a la izquierda, dos párrafos a la derecha y tres principios en rejilla de reglas (A · B · C).

**4.4 Verticales (`#verticales`).** La sección central. Lista de las seis a la izquierda y ficha a la derecha con: regla superior en el acento de la vertical, fotografía, nombre en la fuente de su logo, descriptor en mono, frase principal, tres líneas de oferta, "para quién" y botón **"Ir a [dominio] ↗"**. En escritorio la sección se fija y avanza con el scroll (sección 6.4); en móvil son seis tarjetas apiladas enlazadas a su web (artboard `Movil`).

Datos de las verticales (se leen de `content/verticals.ts`, nunca escritos en los componentes):

| # | Marca | Descriptor | Acento (papel) | Fuente del nombre | URL |
| --- | --- | --- | --- | --- | --- |
| 01 | Fifth Intelligence | Consultoría estratégica e IA | `#2A50D6` | Space Grotesk 600, mayúsculas, +0,06 em | `https://www.fifth-intelligence.com` |
| 02 | Fifth Foundry | Aceleradora y venture studio | `#E8571E` | Archivo Expanded 800, mayúsculas, +0,02 em | `https://fifth-foundry.com` (por confirmar) |
| 03 | Fifth Landing | Recepción e instalación en Andorra | `#2F7D5B` | Nunito Sans 600 | `https://fifth-landing.com` |
| 04 | Fifth Academy | Formación para equipos que crecen | `#8A3FB8` | Literata 500 | `https://fifth-academy.com` |
| 05 | Fifth Labs | Aplicaciones que adelantan lo que viene | `#B8336A` (provisional) | JetBrains Mono 600, mayúsculas, +0,08 em (provisional) | `https://fifth-labs.com` |
| 06 | Valira Valley | Medio, pódcast y comunidad | `#0B7C8C` | Newsreader 500 | `https://valiravalley.com` |

Valira Valley aparece en la portada junto al resto de verticales, con el mismo tratamiento (decisión de los socios, 13 de noviembre de 2026).

Todo enlace de salida a una vertical lleva `utm_source=level5&utm_medium=grupo&utm_campaign=portada&utm_content=[seccion]` y abre en la misma pestaña. Una vertical con `published: false` en `content/verticals.ts` muestra "Próximamente" en lugar del botón y no enlaza.

**Regla de color.** El manual prohíbe dos acentos de marcas distintas en la misma composición. Por eso la ficha muestra **una sola vertical cada vez**, y el acento aparece solo en la regla superior de la ficha y en el punto de la lista. La sección 4.5 y el pie nombran las seis sin color.

**4.5 Cómo encaja (`#circulo`).** Seis pasos en rejilla de reglas: nos conocemos (Valira Valley) → diagnosticamos (Intelligence) → formamos (Academy) → equipamos (Labs) → aceleramos (Foundry) → instalamos (Landing). Cada paso enlaza a su vertical.

**4.6 Por qué Andorra (`#andorra`).** Fotografía a sangre con velo, titular grande y tres razones. Sin cifras fiscales: cualquier dato numérico sobre fiscalidad o residencia queda fuera de esta página y vive en fifth-landing.com, revisado por la gestoría.

**4.7 Quién está detrás (`#equipo`).** Los socios de Level Five son dos sociedades andorranas y así se presentan: **BrightTech** (negocio digital, software e IA; `https://brighttechsolutions.io`) y **Saikaris** (operaciones y procesos industriales; `https://saikaris.com`). Dos fichas en rejilla de reglas con descriptor en mono, nombre, dos líneas y enlace a su web. Sin personas, sin retratos y sin LinkedIn personales. El enlace de la cabecera y del pie se llama "Socios".

**4.8 Contacto (`#contacto`).** Fondo oscuro. A la izquierda, titular y "qué pasa después"; a la derecha, el formulario (sección 5).

**4.9 Pie.** Lockup en negativo, alta a novedades (correo + botón), enlaces a las seis verticales, enlaces del sitio, datos de la sociedad y legales.

**4.10 Sociedad en constitución.** A 13 de noviembre de 2026 Level 5, SL **no está registrada**: no hay NRT, domicilio social ni datos registrales. Mientras sea así, el pie dice "Level 5, SL (en constitución) · Principat d'Andorra" y esos datos salen de `settings` (`company_legal`), de modo que al inscribirse la sociedad se completan sin tocar código. El aviso legal y la política de privacidad necesitan un titular y un responsable del tratamiento identificados: **el formulario no se publica** hasta que la gestoría confirme quién figura como responsable mientras la sociedad no esté inscrita (decisión abierta 8).

**Cabecera.** Lockup Level Five, anclas (El grupo · Verticales · Cómo encaja · Andorra · Socios), selector de idioma (ES · CA · FR · EN) y botón "Hablemos". Comportamiento en sección 6.2. Por debajo de 860 px se pliega a botón de menú con panel a pantalla completa, con el selector de idioma dentro.

---

## 5. El formulario y los datos

### 5.1 Campos

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| Nombre | texto | sí | |
| Correo | email | sí | Validación de formato y de dominio desechable |
| Empresa | texto | no | |
| ¿Qué te interesa? | select | sí | Ocho opciones: las seis verticales, "Level Five en general" y "No lo tengo claro todavía". Valores: `intelligence`, `foundry`, `landing`, `academy`, `labs`, `valira`, `grupo`, `nose` |
| Tu consulta | área de texto | sí | 1–5.000 caracteres |
| Consentimiento de consulta | casilla | sí | Texto con versión y fecha. Cubre responder y **trasladar la consulta a la vertical que corresponda** |
| Consentimiento de novedades | casilla | no | **Separado y nunca preseleccionado**. Activa el doble opt-in |
| Ocultos | | | `source_page`, UTM, `locale` (`es`, `ca`, `fr`, `en`), marca de tiempo de carga |

Si el visitante llega al formulario desde el botón de una ficha de vertical, el select viene preseleccionado con esa vertical.

Formulario del pie: solo correo. Mismo doble opt-in.

### 5.2 Qué ocurre al enviar

1. Validación en cliente y en servidor (`zod`); errores junto a cada campo, en texto y en el idioma de la página, sin borrar lo escrito.
2. Acción de servidor → función `submit_inquiry` (`supabase/0001_level5_web.sql`): crea o actualiza el contacto, crea la consulta, registra los consentimientos y, si procede, la suscripción pendiente.
3. Correos por SMTP propio (patrón del grupo, `nodemailer`): **acuse** al visitante en su idioma, **aviso interno** a los socios en castellano con todos los campos, el idioma y la vertical elegida en el asunto (`[level5.ad · Fifth Landing · FR] Nueva consulta de …`), y **confirmación de novedades** con enlace a `/confirmar/[token]` si marcó la casilla.
4. La ficha del formulario se sustituye por el mensaje de confirmación del canvas, sin cambiar de página.

**Sin trasvase automático entre verticales.** Cada vertical mantiene su propia base de contactos (decisión del grupo). En v1 la consulta se queda en la base de level5.ad y los socios la trasladan a mano al CRM de la vertical, marcando `status = routed` y `routed_to`. El webhook es v2 y solo para consultas con el consentimiento de traslado.

### 5.3 Antispam y privacidad

Campo trampa, tiempo mínimo de 3 s entre carga y envío, límite de ritmo por IP y por correo (5 por hora). Sin reCAPTCHA ni servicios de terceros con seguimiento. La IP no se guarda: solo un hash con sal rotatoria diaria para el límite de ritmo. Ningún dato personal en URL ni en registros de analítica.

### 5.4 Modelo de datos

`supabase/0001_level5_web.sql`, **probada contra Postgres 16**:

| Tabla | Para qué |
| --- | --- |
| `contacts` | Una fila por correo (`citext` único), con su `locale` |
| `inquiries` | Cada consulta, con `interest`, `status` (`new`, `routed`, `answered`, `closed`, `spam`) y UTM |
| `consents` | Registro **inmutable** por finalidad (`inquiry`, `news`) con versión del texto, idioma y página |
| `subscriptions` | Alta a novedades: `pending` → `confirmed` → `unsubscribed`, con tokens de confirmación y baja |
| `settings` | Versión de consentimientos, correos de aviso, URL de las verticales, datos legales de la sociedad (`company_legal`) |

RLS activado y sin políticas públicas: el navegador nunca toca las tablas; todo pasa por acciones de servidor con la clave de servicio. Proyecto de Supabase propio de level5.ad, separado de los de las verticales.

---

## 6. Movimiento: las transiciones

El encargo pide transiciones suaves. El criterio es el de las mejores referencias: **el movimiento explica la estructura, no la decora**. Una sola curva (`power3.out` / `cubic-bezier(0.22, 1, 0.36, 1)`), duraciones entre 0,5 y 0,9 s, y solo `transform`, `opacity` y `clip-path`.

### 6.1 Base técnica

- **Lenis** para el scroll suave (`lerp` ≈ 0,1; táctil nativo), sincronizado con **GSAP ScrollTrigger** desde un único bucle: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
- Anclas con `lenis.scrollTo(destino, { offset: -alturaCabecera })`; el foco de teclado se mueve al titular de la sección de destino.
- Todo el movimiento vive en `components/motion/` como componentes cliente pequeños; el contenido se renderiza en servidor y es legible sin JavaScript.
- Las máscaras por líneas y por palabras se calculan sobre el texto ya renderizado, así que funcionan igual en los cuatro idiomas aunque cambie la longitud de los titulares.

### 6.2 Cabecera

Transparente sobre el hero con lockup en negativo. A partir de 80 px de scroll pasa a fondo papel con regla inferior y lockup en color (transición de 300 ms). Se oculta al bajar y reaparece al subir. El ancla de la sección visible se marca con una regla de 2 px que se desliza entre enlaces.

### 6.3 Hero

Al cargar: la fotografía pasa de escala 1,08 a 1 en 1,4 s; el titular entra línea a línea con máscara (desplazamiento del 100 % de la línea, 80 ms de escalonado); entradilla y botones en fundido después. Al hacer scroll: la imagen se desplaza a la mitad de velocidad que el contenido (parallax del 12 %) y el contenido se desvanece.

### 6.4 Verticales, la pieza central

En escritorio (≥ 1024 px) la sección se **fija** (`pin`) durante seis tramos de 80 % de la altura de ventana. En cada tramo: se activa la siguiente vertical en la lista, la ficha hace fundido cruzado, la fotografía entra con un barrido de `clip-path` de abajo arriba, y la regla superior cambia al acento de esa vertical. Un clic en la lista lleva el scroll al tramo correspondiente. Por teclado, la lista funciona como pestañas (`role="tablist"`, flechas arriba y abajo) sin depender del scroll.

Entre 860 y 1023 px no se fija: lista arriba y ficha debajo, cambia con clic. Por debajo de 860 px, tarjetas apiladas (artboard `Movil`).

### 6.5 Resto de secciones

- **Entradas**: cada bloque sube 24 px con fundido al entrar en pantalla, una sola vez, con 60 ms de escalonado entre hermanos.
- **El grupo**: el titular se "enciende" palabra a palabra ligado al scroll (opacidad de 0,25 a 1).
- **Cambio de fondo**: al pasar de papel a oscuro (Andorra, Contacto) el color de fondo de la página hace transición de 600 ms en lugar de cortar en seco.
- **Cómo encaja**: los seis pasos entran en orden y una regla se dibuja de izquierda a derecha por encima.
- **Andorra**: parallax de la fotografía (−8 % a 8 %) y titular con máscara.
- **Formulario**: transición de foco en los campos; el cambio a confirmación usa la View Transitions API cuando existe y un fundido cuando no.
- **Cambio de idioma**: fundido de 300 ms del contenido con la View Transitions API cuando existe, conservando la sección en la que estaba el visitante.

### 6.6 Límites

- `prefers-reduced-motion: reduce` → sin Lenis, sin fijado, sin parallax, sin máscaras: todo visible y estático, con la sección de verticales en modo pestañas.
- Nada de secuestro de scroll fuera de la sección de verticales, ni cursores personalizados, ni pantalla de carga.
- La imagen del hero es el LCP: `priority`, precarga y tamaños correctos. El JavaScript de movimiento se carga después del primer pintado.
- Lighthouse móvil ≥ 90 en las cuatro categorías con el movimiento activado.

---

## 7. Imágenes y vídeo

### 7.1 Fotografías de banco

Se descargan de **Unsplash** o **Pexels**, se guardan en `public/img/` (sin enlazar en caliente) y se sirven con `next/image` en AVIF y WebP. Cada hueco del canvas lleva escrita la foto que necesita:

| Hueco | Archivo | Qué buscar | Formato |
| --- | --- | --- | --- |
| Hero | `hero.jpg` | Valle de Andorra al amanecer, vista aérea o desde ladera; "Andorra valley sunrise", "Pyrenees aerial" | 2400×1400 + recorte 4:5 para móvil |
| Andorra | `andorra.jpg` | Carretera de montaña o pueblo del Pirineo andorrano; "Andorra mountains road", "Ordino", "Pyrenees village" | 2400×1400 |
| Fifth Intelligence | `v-intelligence.jpg` | Reunión de trabajo con luz natural, sin pantallas con marcas | 1600×900 |
| Fifth Foundry | `v-foundry.jpg` | Equipo fundador ante una pizarra | 1600×900 |
| Fifth Landing | `v-landing.jpg` | Calle de Andorra la Vella o Escaldes; llegada, mudanza | 1600×900 |
| Fifth Academy | `v-academy.jpg` | Taller con grupo reducido | 1600×900 |
| Fifth Labs | `v-labs.jpg` | Persona trabajando ante pantalla, plano corto, interfaz no reconocible | 1600×900 |
| Valira Valley | `v-valira.jpg` | Grabación de pódcast o charla con público | 1600×900 |
| Open Graph | generado | Imagen tipográfica con el lockup sobre `#0B1A33`, sin foto; una por idioma | 1200×630 |

Criterios de selección: las dos fotos de paisaje tienen que ser **de Andorra de verdad** (comprobar la ubicación en la ficha de la foto), luz fría o neutra, sin texto ni marcas visibles, sin poses de catálogo. Tratamiento común para que parezcan una serie: saturación al 85 % y velo azul `#0B1A33` (55 % en hero y Andorra, 0 % en las fichas).

Por cada foto se anota en `docs/IMAGES.md`: URL de la ficha, autor, licencia y fecha de descarga, tras **comprobar en la propia ficha que la licencia permite uso comercial**. Texto alternativo descriptivo en los cuatro idiomas; las fotos de fondo con velo llevan `alt=""`.

No hay retratos de personas en el sitio.

### 7.2 Símbolos y lockups

El símbolo de Level Five (la V sin variación) está en el canvas como polígono con las cotas del manual: `22,18 32.92,18 50,57.05 67.08,18 78,18 50,82` sobre retícula de 100. Los símbolos de las verticales **no se redibujan**: se exportan desde `identity/v-geometry.js` del manual. Hasta que los socios los entreguen, las verticales aparecen solo con su nombre en la fuente de su logo, como en el canvas.

### 7.3 Vídeo (opcional, v2)

El hero funciona con fotografía. Si los socios aportan un plano propio de Andorra, sustituye a la foto en escritorio: bucle de 8–12 s, sin audio, 1080p, H.264 + WebM, menos de 2,5 MB, con la foto como `poster`. No se reproduce en móvil, con `prefers-reduced-motion` ni con ahorro de datos.

---

## 8. Diseño e identidad

La identidad es la del **Manual de identidad Level Five v1.0**, en el sistema de diseño "Level Five" (https://claude.ai/artifact/QhCFRsLyLuq1e1mJdWYctg), ya aplicada en el canvas.

- **Color**: papel `#FAF9F6`, superficie secundaria `#F1F0EC`, texto en azul de grupo `#0B2A5B`, texto secundario `#4C5A73`, reglas `#D9D7D1`. Bloques oscuros: fondo `#0B1A33`, superficie `#132442`, reglas `#2A3B5C`, texto `#FAF9F6`, secundario `#AEB8CB`. El acento de Level Five es el propio azul de grupo: botón principal azul sobre papel, blanco sobre oscuro.
- **Tipografía**: Instrument Sans para todo el texto (hero `clamp(40px, 6vw, 84px)` / 1,04; h2 `clamp(30px, 3.6vw, 52px)` / 1,1; h3 22/28; cuerpo 16/25; entradillas 18–20). IBM Plex Mono en mayúsculas con tracking para etiquetas e índices. Outfit Medium en mayúsculas con tracking +0,16 em solo en el lockup. Fuentes autoalojadas con `next/font`, con los subconjuntos que cubren catalán y francés (ç, l·l, œ, acentos).
- **Forma**: radios 0 en símbolos y bloques de color, 4 px en botones y campos, 6 px en fichas. **Sin sombras ni degradados**: las reglas separan. Las rejillas de principios y de pasos son `grid` con `gap: 1px` sobre fondo de línea.
- **Tokens** como variables CSS en `styles/tokens.css`, con los nombres del sistema (`--surface`, `--surface-2`, `--ink`, `--ink-2`, `--line`, `--group-blue`, y un `--accent-*` por vertical).
- **Textos más largos**: el francés y el catalán alargan titulares y botones respecto al castellano. Ningún contenedor tiene altura fija; los botones y las pestañas admiten dos líneas.
- **Accesibilidad**: contraste 4,5:1 en todo el texto (el naranja de Foundry no se usa nunca como color de texto), objetivos táctiles de 44 px, foco visible de 2 px, navegación completa por teclado, `lang` correcto por idioma; el selector de idioma es una lista de enlaces reales con `hreflang` y `lang` en cada uno.

---

## 9. Pila técnica

- **Next.js 15** (App Router, TypeScript) + **Supabase** (región Frankfurt), el patrón del resto del grupo. Repositorio propio: `level5-web`.
- **Lenis** + **GSAP** (ScrollTrigger) para el movimiento. CSS propio con variables; sin librerías de componentes.
- Contenido en `content/` (`es.ts`, `ca.ts`, `fr.ts`, `en.ts`, `verticals.ts`), validado con `zod`: los cuatro diccionarios tienen exactamente las mismas claves y la compilación falla si a uno le falta alguna. Ningún texto en los componentes.
- Rutas por idioma con segmento `[locale]` y el castellano servido en la raíz sin prefijo; sin detección ni redirección por `Accept-Language`.
- Correo por SMTP propio con `nodemailer`; plantillas en texto y HTML sencillo con el lockup, una por idioma.
- Analítica sin cookies (Plausible o Umami, decide tú).
- Despliegue con vista previa por rama. Variables en `.env.example`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `NOTIFY_EMAILS`, `SITE_URL`, `RATE_LIMIT_SALT`.

---

## 10. Criterios de aceptación

- La página coincide con el artboard `Main` a 1440 px y con `Movil` a 390 px en estructura, textos y orden.
- Flujo e2e en móvil: portada → ficha de Fifth Landing → "Cuéntanos tu caso" → envío con novedades marcadas → `contact` + `inquiry` con `interest = landing` + dos filas en `consents` + `subscription` en `pending` → acuse y correo de confirmación en menos de un minuto → clic en el enlace → `confirmed`. Aviso interno a los socios con todos los campos.
- `/baja/[token]` da de baja en un clic y registra un consentimiento `news` con `granted = false`.
- Sin la casilla de novedades no se crea suscripción ni se envía ningún correo que no sea el acuse.
- Los seis botones de vertical llevan a su URL con los cuatro UTM y el clic queda en analítica con `vertical`.
- Con `prefers-reduced-motion` no hay ninguna animación y todo el contenido es accesible; sin JavaScript, la página se lee entera y el formulario se envía.
- La sección de verticales se recorre entera con teclado sin usar el scroll.
- Lighthouse móvil ≥ 90 en las cuatro categorías; LCP < 2,5 s en 4G; CLS < 0,05.
- Las cuatro versiones (`/`, `/ca`, `/fr`, `/en`) tienen todo el contenido traducido, sin textos en castellano sueltos y sin desbordes ni cortes en ningún ancho.
- `level5.ad` carga en castellano con cualquier idioma de navegador; el selector conserva la sección; `hreflang` y `x-default` validan.
- Una consulta enviada desde `/fr` guarda `locale = fr` y recibe el acuse y la confirmación en francés.
- Sin cookies; ningún dato personal en URL ni en registros.
- `docs/IMAGES.md` lista cada fotografía con su fuente, autor y licencia comprobada.
- Datos estructurados `Organization` válidos en la herramienta de resultados enriquecidos de Google.

---

## 11. Hitos

| Hito | Contenido | Se cierra cuando |
| --- | --- | --- |
| **W1** | Estructura con rutas por idioma, tokens, las nueve secciones estáticas en castellano desde el canvas, imágenes de banco, responsive | La página coincide con los dos artboards y pasa Lighthouse sin movimiento |
| **W2** | Movimiento completo (sección 6), formulario y correos de extremo a extremo, legales con huecos, SEO, analítica | Se cumplen los criterios de la sección 10 en castellano |
| **W3** | Catalán, francés e inglés: página, correos, consentimientos, legales, `hreflang` y selector | Los socios han revisado las tres traducciones y se cumplen todos los criterios de la sección 10: **el sitio puede publicarse** |

---

## 12. Lo que falta de los socios antes de publicar

| Dato | Para qué |
| --- | --- |
| Visto bueno de BrightTech y Saikaris a las dos líneas con las que se presentan | Sección 4.7 |
| NRT, domicilio social y datos registrales de Level 5, SL, cuando esté inscrita | Pie y legales (`settings.company_legal`) |
| Confirmación de `fifth-foundry.com`, y de qué verticales tienen ya web publicada | Enlaces; las que no, salen como "Próximamente" |
| Registro de `level5.ad` y acceso al DNS | Despliegue |
| Proyecto de Supabase, datos del SMTP y correos que reciben los avisos | Formulario |
| Lockups de las verticales exportados del manual | Fichas de vertical |
| Textos legales andorranos y cláusulas de consentimiento, en los cuatro idiomas | `/legal/*` y casillas (gestoría o despacho) |
| Revisión de las traducciones al catalán, francés e inglés | W3 |
| URL de LinkedIn de Level Five | Pie |

---

## 13. Decisiones

### 13.1 Cerradas (13 de noviembre de 2026)

| Decisión | Resultado |
| --- | --- |
| Idiomas de lanzamiento | Catalán, castellano, francés e inglés; `level5.ad` muestra el castellano por defecto |
| Valira Valley en la portada | Sí, junto al resto de verticales |
| Dominio de Fifth Intelligence | `www.fifth-intelligence.com` |
| Quién se presenta como socio | Las dos sociedades, BrightTech y Saikaris; sin fichas de personas |

### 13.2 Abiertas

| # | Decisión | Quién decide |
| --- | --- | --- |
| 1 | Si Level Five Ventures (nombre por confirmar en el manual) se añade como séptima marca | Socios; por defecto no |
| 2 | Vídeo del hero: grabar un plano propio de Andorra o quedarse con fotografía | Socios |
| 3 | Nombre de las novedades por correo del grupo, o si se remite a los boletines que ya existen en Valira Valley e Intelligence | Socios |
| 4 | Analítica: Plausible o Umami | Decide tú; sin cookies |
| 5 | Correo o teléfono público en el pie | Socios; por defecto solo formulario, como en el resto del grupo |
| 6 | Sustituir las fotos de banco de las fichas por fotos propias | Socios, tras el lanzamiento |
| 7 | Textos legales | Gestoría o despacho |
| 8 | Quién figura como titular del sitio y responsable del tratamiento de datos mientras Level 5, SL no esté inscrita, o si el formulario espera a la inscripción | Gestoría o despacho, con los socios |

---

*Brief de producto y orientación técnica. Los aspectos de protección de datos deben validarse con asesoría jurídica antes de publicar el formulario.*
