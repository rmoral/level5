import type { Dictionary } from "./schema";

/**
 * Castellano: texto de origen. Portado literalmente de reference/Main.dc.html (y de
 * Movil.dc.html para las tarjetas móviles de verticales), salvo los titulares y
 * entradillas de sección y el paso de Valira Valley, revisados por los socios el 13-11-2026
 * (docs/DECISIONS.md, 19 y 20).
 * Las cadenas marcadas con [no-canvas] no están en el canvas: son etiquetas de
 * accesibilidad o metadatos necesarios; se revisan con los socios (docs/DECISIONS.md).
 */
export const es = {
  meta: {
    title: "Level Five", // [no-canvas]
    description:
      "Level Five es un grupo empresarial andorrano que integra consultoría estratégica e inteligencia artificial, aceleración de startups, implantación en Andorra, formación, software y comunidad: seis marcas especializadas y un único equipo.",
  },
  a11y: {
    skipLink: "Saltar al contenido", // [no-canvas]
    logoLabel: "Símbolo de Level Five",
    homeLabel: "Level Five, inicio", // [no-canvas]
    mainNav: "Principal",
    languageNav: "Idioma", // [no-canvas]
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú", // [no-canvas]
    verticalsTablist: "Verticales de Level Five",
    unavailableLanguage: "Disponible próximamente", // [no-canvas]
  },
  nav: {
    group: "El grupo",
    verticals: "Verticales",
    andorra: "Andorra",
    partners: "Socios",
    cta: "Hablemos",
  },
  hero: {
    kicker: "Level Five · Principat d'Andorra · Desde 2026",
    title: "Un único grupo para cada etapa del crecimiento de una empresa.",
    lead: "Level Five es un grupo empresarial andorrano que integra consultoría estratégica e inteligencia artificial, aceleración de startups, implantación en Andorra, formación, software y comunidad: seis marcas especializadas y un único equipo.",
    ctaPrimary: "Cuéntanos tu caso",
    ctaSecondary: "Ver las seis verticales ↓",
    photoAlt: "",
  },
  credentials: [
    "Andorra · España",
    "Seis marcas, una sociedad",
    "IA aplicada, no teoría",
    "Una iniciativa a la vez, con métrica",
  ],
  group: {
    eyebrow: "01 · El grupo",
    title: "Estrategia, tecnología, talento y capital. En ese orden y con un único interlocutor.",
    paragraphs: [
      "Una empresa en crecimiento suele trabajar a la vez con una consultora, un centro de formación, un proveedor de software, un inversor y una gestoría que no se coordinan entre sí. Level Five reúne todas esas funciones en un único interlocutor.",
      "Somos una sociedad andorrana que opera seis marcas especializadas. Cada una cuenta con su propia oferta y su propia web; todas comparten método, estándares de calidad y los mismos socios.",
    ],
    principles: [
      {
        index: "A",
        title: "Operadores, no teóricos",
        body: "Dirigimos empresas, lanzamos productos y nos instalamos aquí antes de aconsejar a nadie que lo haga.",
      },
      {
        index: "B",
        title: "Una iniciativa a la vez",
        body: "Cada proyecto empieza con una métrica pactada por escrito y no se abre el siguiente hasta que se mueve.",
      },
      {
        index: "C",
        title: "Andorra como plataforma",
        body: "Primer mercado, laboratorio y punto de salida hacia España y Europa. Pequeño para probar, conectado para escalar.",
      },
    ],
  },
  verticals: {
    eyebrow: "02 · Verticales",
    title: "Seis especialidades que se complementan.",
    lead: "Cada vertical atiende una etapa distinta de la vida de una empresa y da paso a la siguiente. Sea cual sea tu punto de entrada, cuentas con el respaldo de todo el grupo.",
    goTo: "Ir a {domain} ↗",
    comingSoon: "Próximamente",
    items: {
      intelligence: {
        short: "Consultoría estratégica e IA",
        kind: "Consultoría · IA aplicada",
        lead: "Estrategia que se implanta. Diagnóstico, plan y ejecución con inteligencia artificial para empresas andorranas y españolas.",
        offer: [
          "Audit · tres semanas de diagnóstico que terminan con un plan de 90 días",
          "Program y Build · implantación acompañada, una iniciativa a la vez",
          "Partner · dirección fraccional para pocas empresas",
        ],
        who: "Para empresas que quieren resultados medibles, no un informe.",
        step: "DIAGNOSTICAMOS",
        cardLine: "Estrategia que se implanta, una iniciativa a la vez.",
        photoAlt: "Reunión de trabajo alrededor de una mesa, junto a un ventanal con luz natural.",
      },
      foundry: {
        short: "Aceleradora y venture studio",
        kind: "Startups · Inversión",
        lead: "La aceleradora de las startups de IA de Andorra: seis meses a medida con mentores operadores, clientes piloto e inversores privados.",
        offer: [
          "Program · una cohorte anual en fase pre-seed o seed temprana",
          "Build · compañías creadas por el grupo con un fundador externo",
          "Capital · inversión estructurada operación a operación",
        ],
        who: "Para fundadores con producto de IA y para inversores que buscan operaciones bien preparadas.",
        step: "ACELERAMOS",
        cardLine: "La aceleradora de las startups de IA de Andorra.",
        photoAlt: "Dos personas organizan notas adhesivas en una pizarra blanca sobre una pared naranja.",
      },
      landing: {
        short: "Recepción e instalación en Andorra",
        kind: "Soft landing · Residencia",
        lead: "Llegar a Andorra sin equivocarse de vía: decidir, constituir, instalarse y quedarse, con un único interlocutor que responde del conjunto.",
        offer: [
          "Compass · el diagnóstico que elige la vía y calcula el coste total",
          "Business, Professional y Family · sociedad, residencia e instalación familiar",
          "Stay · acompañamiento durante todo el primer año",
        ],
        who: "Para empresarios, profesionales y familias que trasladan su vida y su empresa.",
        step: "INSTALAMOS",
        cardLine: "Sociedad, residencia y familia con un proceso resuelto.",
        photoAlt: "Camino empedrado sobre Andorra la Vella, con la ciudad y las montañas al fondo.",
      },
      academy: {
        short: "Formación para equipos que crecen",
        kind: "Formación · Presencial y en directo",
        lead: "Dirección, estrategia, procesos e inteligencia artificial para la startup y la pequeña empresa que quiere llegar a sus objetivos.",
        offer: [
          "Talleres presenciales en Andorra, también en directo en línea",
          "Membresía con acceso a todo el contenido, o pago por curso",
          "Planes de formación y crecimiento para equipos de empresa",
        ],
        who: "Para directivos y equipos que aprenden para aplicarlo el lunes.",
        step: "FORMAMOS",
        cardLine: "Talleres presenciales y en directo para equipos que crecen.",
        photoAlt: "Grupo reducido trabajando sobre unos planos extendidos en una mesa, visto desde arriba.",
      },
      labs: {
        short: "Aplicaciones que adelantan lo que viene",
        kind: "Software · Suscripción",
        lead: "El catálogo de software del grupo: herramientas hechas para operar mejor, por suscripción mensual y listas para usar.",
        offer: [
          "Andón y Flow Tracker · incidencias, conocimiento y tareas",
          "Squaired y FenShoui · facturación, contabilidad y gestión inmobiliaria",
          "PodSwitch · vídeo para redes sociales",
        ],
        who: "Para pymes y equipos que quieren herramienta, no proyecto.",
        step: "EQUIPAMOS",
        cardLine: "Aplicaciones propias por suscripción, listas para usar.",
        photoAlt: "Manos tecleando en un portátil sobre una mesa de madera, en plano corto.",
      },
      valira: {
        short: "Medio, pódcast y comunidad",
        kind: "Media · Valira Club",
        lead: "Empresa, economía e IA por quien las aplica. Un pódcast, un medio y Valira Club, la comunidad donde el ecosistema de Andorra hace negocio.",
        offer: [
          "Pódcast y artículos sobre empresa, economía e inteligencia artificial",
          "Valira Club · encuentros mensuales con entrevista en vivo, desde enero de 2027",
          "Entrar en el Club es gratis; la membresía incluye todas las Club Nights",
        ],
        who: "Para empresarios y directivos residentes, y para quien piensa en serlo.",
        step: "CONECTAMOS",
        cardLine: "Pódcast, medio y Valira Club.",
        photoAlt: "Dos micrófonos de estudio en primer plano.",
      },
    },
  },
  andorra: {
    eyebrow: "03 · Por qué Andorra",
    title: "Un mercado a la escala adecuada para validar con rapidez y proyectarse a Europa.",
    reasons: [
      {
        title: "Todo queda cerca",
        body: "Empresas, instituciones e inversores están a una llamada. Lo que en otro sitio lleva meses de puertas, aquí es una conversación.",
      },
      {
        title: "Entre dos mercados",
        body: "España y Francia a un paso. Trabajamos con empresas andorranas y españolas, y pensamos cada proyecto con salida europea.",
      },
      {
        title: "Lo vivimos nosotros",
        body: "Nos instalamos aquí con nuestras familias en 2025 y dirigimos empresas andorranas. Hablamos de lo que hacemos cada día.",
      },
    ],
    photoAlt: "",
  },
  partners: {
    eyebrow: "04 · Quién está detrás",
    title: "Dos sociedades andorranas al frente del grupo.",
    lead: "Level Five está formado por BrightTech y Saikaris, que trabajan como un único equipo en todas las verticales y se apoyan en una red de mentores y colaboradores que se incorpora según las necesidades de cada proyecto.",
    brighttech: {
      label: "Socio · Negocio digital, software e IA",
      body: "Veinticinco años creando y dirigiendo negocios digitales. Aporta al grupo la estrategia, el desarrollo de software y la implantación de inteligencia artificial.",
    },
    saikaris: {
      label: "Socio · Operaciones y procesos industriales",
      body: "Especialista en optimización de procesos industriales. Aporta al grupo el método para medir, ordenar y mejorar las operaciones de una empresa.",
    },
  },
  contact: {
    eyebrow: "05 · Contacto",
    title: "Explícanos tu proyecto y te indicaremos por dónde empezar.",
    next: [
      "Respondemos en un día laborable.",
      "Te ponemos en contacto con la vertical adecuada, o con varias.",
      "Primera conversación de 30 minutos, en Andorra o por vídeo. Sin compromiso.",
    ],
    form: {
      name: "Nombre",
      email: "Correo",
      company: "Empresa",
      optional: "(opcional)",
      interest: "¿Qué te interesa?",
      interestPlaceholder: "Elige una opción",
      interestOptions: {
        intelligence: "Consultoría e IA · Fifth Intelligence",
        foundry: "Acelerar o invertir en una startup · Fifth Foundry",
        landing: "Instalarme en Andorra · Fifth Landing",
        academy: "Formación · Fifth Academy",
        labs: "Aplicaciones · Fifth Labs",
        valira: "Comunidad y pódcast · Valira Valley",
        grupo: "Level Five en general · prensa, alianzas, instituciones",
        nose: "No lo tengo claro todavía",
      },
      message: "Tu consulta",
      consentInquiry:
        "Acepto que Level 5, SL trate mis datos para responder a esta consulta y trasladarla a la vertical que corresponda.",
      privacyLink: "Política de privacidad",
      consentNews: "Quiero recibir las novedades de Level Five por correo. Opcional; puedes darte de baja con un clic.",
      submit: "Enviar consulta",
    },
    sent: {
      eyebrow: "Consulta recibida",
      title: "Gracias. Te escribimos en un día laborable.",
      body: "Te hemos enviado un acuse a tu correo. Si marcaste las novedades, confírmalo desde el enlace que encontrarás en un segundo mensaje.",
      again: "Enviar otra consulta",
    },
    // [no-canvas] Mensajes de error del formulario.
    errors: {
      required: "Este campo es obligatorio.",
      email: "Revisa el correo: no parece una dirección válida.",
      disposable: "Usa un correo permanente: no aceptamos direcciones temporales.",
      tooLong: "La consulta no puede superar los 5.000 caracteres.",
      consent: "Necesitamos tu consentimiento para responder a la consulta.",
      tooFast: "Espera unos segundos y vuelve a enviar el formulario.",
      rateLimited: "Hemos recibido varios envíos seguidos. Inténtalo de nuevo dentro de una hora.",
      generic: "No hemos podido enviar el formulario. Inténtalo de nuevo en unos minutos.",
      summary: "Revisa los campos marcados.",
    },
  },
  // [no-canvas] Páginas de confirmación y baja de novedades.
  subscription: {
    confirm: {
      title: "Confirma tu alta en las novedades",
      body: "Pulsa el botón para confirmar que quieres recibir las novedades de Level Five por correo.",
      button: "Confirmar mi alta",
      confirmed: "Listo: tu alta está confirmada. Te escribiremos cuando haya algo que contar.",
      alreadyConfirmed: "Tu alta ya estaba confirmada. No tienes que hacer nada más.",
      unsubscribed: "Este alta se dio de baja. Si quieres volver a recibir las novedades, apúntate de nuevo desde la portada.",
      notFound: "Este enlace no es válido o ha caducado. Puedes apuntarte de nuevo desde la portada.",
    },
    unsubscribe: {
      title: "Darte de baja de las novedades",
      body: "Pulsa el botón y dejarás de recibir las novedades de Level Five por correo.",
      button: "Darme de baja",
      unsubscribed: "Te has dado de baja. No volverás a recibir las novedades.",
      alreadyUnsubscribed: "Ya estabas dado de baja. No recibirás más novedades.",
      notFound: "Este enlace no es válido. Si sigues recibiendo correos, responde a cualquiera de ellos y te daremos de baja.",
    },
    error: "No hemos podido completar la operación. Inténtalo de nuevo en unos minutos.",
    back: "Volver a la portada",
  },
  // [no-canvas] Correos: textos nuevos, a revisar por los socios. Las dos líneas de
  // "next" son las de "qué pasa después" del canvas.
  mail: {
    ack: {
      subject: "Hemos recibido tu consulta · Level Five",
      greeting: "Hola, {name}:",
      received: "Gracias por escribirnos. Hemos recibido tu consulta.",
      topic: "Tema",
      next: ["Respondemos en un día laborable.", "Te ponemos en contacto con la vertical adecuada, o con varias."],
      reply: "Si quieres añadir algo, responde a este correo.",
      signature: "El equipo de Level Five",
    },
    news: {
      subject: "Confirma tu alta en las novedades de Level Five",
      body: "Has pedido recibir las novedades de Level Five por correo. Para completar el alta, confírmala desde este enlace:",
      button: "Confirmar mi alta",
      fallback: "Si el botón no funciona, copia este enlace en el navegador:",
      ignore: "Si no lo has pedido tú, ignora este mensaje: no te enviaremos nada.",
    },
  },
  // [no-canvas] Páginas legales. Los datos son los del sitio (especificación y código);
  // los apartados "pending" los redacta la gestoría (decisión abierta 7).
  legal: {
    provisional: "Texto provisional. La redacción legal definitiva está pendiente de la gestoría.",
    pendingLabel: "Pendiente de la gestoría",
    back: "Volver a la portada",
    nav: "Textos legales",
    holder: {
      title: "Titular del sitio y responsable del tratamiento",
      contact: "Contacto",
      contactValue: "Formulario de contacto de esta web",
      nrt: "NRT",
      address: "Domicilio social",
      registry: "Datos registrales",
      pendingRegistration: "[pendiente de la inscripción de la sociedad]",
    },
    pages: {
      notice: {
        title: "Aviso legal",
        description: "Aviso legal de level5.ad, sitio de Level Five.",
        showHolder: true,
        sections: [
          { title: "Objeto", text: ["level5.ad es el sitio institucional de Level Five: presenta el grupo, enlaza a sus seis verticales y recoge consultas y altas a las novedades."], list: [], pending: "Condiciones de acceso y uso del sitio." },
          { title: "Propiedad intelectual e industrial", text: [], list: [], pending: "Titularidad de marcas, textos e imágenes; licencias de las fotografías de banco." },
          { title: "Responsabilidad", text: [], list: [], pending: "Limitación de responsabilidad sobre el contenido y los enlaces a las webs de las verticales." },
          { title: "Legislación aplicable y jurisdicción", text: [], list: [], pending: "Ley aplicable y tribunales competentes." },
        ],
      },
      privacy: {
        title: "Política de privacidad",
        description: "Cómo trata Level 5, SL los datos que recoge level5.ad.",
        showHolder: true,
        sections: [
          {
            title: "Qué datos tratamos",
            text: [],
            list: [
              "Consulta: nombre, correo, empresa (opcional), el tema que eliges, el texto de la consulta, el idioma de la página, la página desde la que escribes y, si llegas desde una campaña, sus parámetros (UTM).",
              "Novedades: tu correo y el idioma.",
              "Consentimientos: qué aceptas, la versión del texto, el idioma, la página y la fecha. Cada cambio queda registrado como una entrada nueva.",
              "Prevención de abusos: no guardamos tu dirección IP. Para limitar los envíos repetidos usamos un código cifrado de la IP y del correo que cambia cada día y se borra a las 24 horas.",
            ],
            pending: "",
          },
          {
            title: "Para qué los usamos",
            text: [],
            list: [
              "Responder a tu consulta y trasladarla a la vertical que corresponda.",
              "Enviarte las novedades de Level Five, solo si marcas la casilla y lo confirmas desde el enlace que te enviamos (doble confirmación).",
              "Evitar envíos abusivos del formulario.",
            ],
            pending: "Base jurídica de cada tratamiento.",
          },
          {
            title: "Quién más interviene",
            text: ["Usamos estos proveedores para que el sitio funcione:"],
            list: [
              "Vercel: alojamiento del sitio.",
              "Supabase: base de datos donde se guardan las consultas y los consentimientos.",
              "El proveedor de correo de level5.ad: envío de los correos.",
            ],
            pending: "Condición de encargados del tratamiento, ubicación de los datos y, si las hay, transferencias internacionales.",
          },
          { title: "Cuánto tiempo los conservamos", text: [], list: [], pending: "Plazos de conservación de consultas, consentimientos y altas a novedades." },
          {
            title: "Tus derechos",
            text: ["Puedes pedir la baja de las novedades en cualquier momento respondiendo a cualquiera de nuestros correos."],
            list: [],
            pending: "Derechos reconocidos, cómo ejercerlos y autoridad de control ante la que reclamar.",
          },
        ],
      },
      cookies: {
        title: "Política de cookies",
        description: "level5.ad no usa cookies.",
        showHolder: false,
        sections: [
          {
            title: "Este sitio no usa cookies",
            text: [
              "level5.ad no instala cookies ni guarda información en tu navegador, y no usa píxeles ni servicios de seguimiento de terceros. Las fuentes y las imágenes se sirven desde el propio sitio.",
            ],
            list: [],
            pending: "Redacción definitiva de esta política y, si se añade, descripción de la analítica sin cookies.",
          },
        ],
      },
    },
  },
  notFound: {
    title: "Esta página no existe.", // [no-canvas]
    back: "Volver a la portada", // [no-canvas]
  },
  footer: {
    newsletter: {
      body: "Recibe las novedades del grupo. Un correo cuando hay algo que contar, nada más.",
      label: "Correo para las novedades",
      placeholder: "tu@correo.com",
      submit: "Apuntarme",
      submitted: "Revisa tu correo",
      note: "Al apuntarte aceptas recibir correos de Level 5, SL. Confirmación por doble opt-in.",
    },
    verticalsHeading: "Verticales",
    siteHeading: "Level Five",
    siteLinks: {
      group: "El grupo",
      andorra: "Por qué Andorra",
      partners: "Socios",
      contact: "Contacto",
      linkedin: "LinkedIn ↗",
    },
    legal: {
      notice: "Aviso legal",
      privacy: "Privacidad",
      cookies: "Cookies",
    },
    companyStatus: {
      en_constitucion: "en constitución",
      inscrita: "",
    },
  },
} satisfies Dictionary;
