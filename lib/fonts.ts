import {
  Archivo,
  IBM_Plex_Mono,
  Instrument_Sans,
  JetBrains_Mono,
  Literata,
  Newsreader,
  Nunito_Sans,
  Outfit,
  Space_Grotesk,
} from "next/font/google";

/*
 * next/font descarga las fuentes en compilación y las sirve desde el propio dominio:
 * ninguna petición a Google en el navegador. El subconjunto "latin" cubre
 * castellano, catalán (l·l, ç, à) y francés (œ, ç, acentos).
 */

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-outfit",
  display: "swap",
});

// Fuentes de los nombres de vertical: solo se ve una a la vez; sin precarga.
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", preload: false, weight: ["600"], variable: "--font-space-grotesk" });
// Archivo Expanded: fuente variable con el eje de anchura (font-stretch: 125%).
export const archivo = Archivo({ subsets: ["latin"], display: "swap", preload: false, axes: ["wdth"], variable: "--font-archivo" });
export const nunitoSans = Nunito_Sans({ subsets: ["latin"], display: "swap", preload: false, weight: ["600"], variable: "--font-nunito-sans" });
export const literata = Literata({ subsets: ["latin"], display: "swap", preload: false, weight: ["500"], variable: "--font-literata" });
export const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap", preload: false, weight: ["600"], variable: "--font-jetbrains-mono" });
export const newsreader = Newsreader({ subsets: ["latin"], display: "swap", preload: false, weight: ["500"], variable: "--font-newsreader" });

export const fontVariables = [
  instrumentSans,
  plexMono,
  outfit,
  spaceGrotesk,
  archivo,
  nunitoSans,
  literata,
  jetbrainsMono,
  newsreader,
]
  .map((f) => f.variable)
  .join(" ");
