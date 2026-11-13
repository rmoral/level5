# Fotografías de banco

Registro obligatorio (CLAUDE.md, especificación §7.1). Una fila por archivo de `public/img/`, después de **comprobar en la propia ficha** que la licencia permite uso comercial y, para las dos de paisaje, que la ubicación es Andorra.

Tratamiento común: saturación al 85 % aplicada al archivo. El velo `#0B1A33` al 55 % del hero y de Andorra va en CSS (docs/DECISIONS.md, decisión 4).

| Archivo | Hueco | Ficha | Autor | Licencia (comprobada en la ficha) | Ubicación (según la ficha) | Tamaño | Descarga |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `hero.jpg` (2400×1400) + `hero-mobile.jpg` (1280×1600, 4:5) | Hero | [unsplash.com/photos/rTGY77LF8BI](https://unsplash.com/es/fotos/montana-durante-el-dia-rTGY77LF8BI) ("montaña durante el día", publicada el 18-01-2019, Apple iPhone XS) | Kira Laktionov ([@kiralaktionov](https://unsplash.com/@kiralaktionov)) | Uso gratuito bajo la Licencia Unsplash (no Unsplash+). Comprobado en la ficha por Ruben el 13-11-2026 (captura de la ficha) | Encamp, Andorra (según la ficha) | Original 2400×1600; recorte centrado y saturación al 85 % (`scripts/process-photo.mjs`) | 13-11-2026 (archivo descargado de la ficha y aportado por Ruben) |
| `andorra.jpg` (2400×1350) | Andorra | [unsplash.com/photos/oSGl_yOaMc4](https://unsplash.com/photos/a-winding-road-through-a-forest-oSGl_yOaMc4) ("Un camino sinuoso a través de un bosque", publicada el 27-11-2022, DJI FC7203) | Adrià Sánchez Roqué | Uso gratuito bajo la Licencia Unsplash. Comprobado en la ficha por Ruben el 13-11-2026 | Andorra (según la ficha) | Original 2400×1350, sin ampliar (la especificación pide 2400×1400; se sirve en `cover`); saturación al 85 % | 13-11-2026 (aportado por Ruben) |
| `v-intelligence.jpg` (1600×900) | Fifth Intelligence | [unsplash.com/photos/5txln04Cx7I](https://unsplash.com/photos/business-professionals-in-a-meeting-around-a-table-5txln04Cx7I) ("Profesionales de negocios en una reunión alrededor de una mesa", publicada el 22-09-2025) | Vitaly Gariev (@silverkblack) | Uso gratuito bajo la Licencia Unsplash. Comprobado en la ficha por Ruben el 13-11-2026 | Sin ubicación en la ficha | Original 3800×2138; recorte centrado; saturación al 85 % | 13-11-2026 (aportado por Ruben) |
| _pendiente_ | Fifth Foundry (`v-foundry.jpg`) | | | | | | |
| `v-landing.jpg` (1600×900) | Fifth Landing | [unsplash.com/photos/htxYtc81yxA](https://unsplash.com/photos/green-trees-on-mountain-near-body-of-water-during-daytime-htxYtc81yxA) ("Árboles verdes en la montaña cerca del cuerpo de agua durante el día", publicada el 11-09-2020, Canon EOS 600D) | Di Ya (@diiiya) | Uso gratuito bajo la Licencia Unsplash. Comprobado en la ficha por Ruben el 13-11-2026 | Andorra la Vella, Andorra (según la ficha) | Original 2400×1600; recorte centrado 16:9; saturación al 85 % | 13-11-2026 (aportado por Ruben) |
| `v-academy.jpg` (1600×900) | Fifth Academy | [unsplash.com/photos/ZEaR7RoXR_o](https://unsplash.com/photos/a-group-of-people-sitting-around-a-table-working-on-a-project-ZEaR7RoXR_o) ("Un grupo de personas sentadas alrededor de una mesa trabajando en un proyecto", publicada el 06-05-2024) | Vitaly Gariev (@silverkblack) | Uso gratuito bajo la Licencia Unsplash. Comprobado en la ficha por Ruben el 13-11-2026 | Sin ubicación en la ficha | Original 3840×2160; recorte centrado; saturación al 85 % | 13-11-2026 (aportado por Ruben) |
| `v-labs.jpg` (1600×900) | Fifth Labs | [unsplash.com/photos/AnB0zwEeuYU](https://unsplash.com/photos/hands-typing-on-a-laptop-computer-keyboard-AnB0zwEeuYU) ("Manos escribiendo en el teclado de una computadora portátil", publicada el 26-09-2025) | Vitaly Gariev (@silverkblack) | Uso gratuito bajo la Licencia Unsplash. Comprobado en la ficha por Ruben el 13-11-2026 | Sin ubicación en la ficha | Original 3840×2160; recortado el borde izquierdo (asomaba el logotipo del portátil); saturación al 85 % | 13-11-2026 (aportado por Ruben) |
| `v-valira.jpg` (1600×900) | Valira Valley | [unsplash.com/photos/5JhHiSAEiz0](https://unsplash.com/photos/two-gray-microphones-5JhHiSAEiz0) ("Dos micrófonos grises", publicada el 20-08-2017, Canon EOS 600D) | Gritte (@gritte) | Uso gratuito bajo la Licencia Unsplash. Comprobado en la ficha por Ruben el 13-11-2026 | Sin ubicación en la ficha | Original 5184×3456; recorte centrado 16:9; saturación al 85 % | 13-11-2026 (aportado por Ruben) |

La imagen Open Graph es tipográfica y se genera en W2 (sin foto).

Nota: desde el entorno de desarrollo las fichas de Unsplash están tras un control antibots; la licencia y la ubicación se comprueban en la ficha desde el navegador y se anota quién y cuándo.

## Descartadas (13-11-2026)

| Hueco | Ficha | Motivo |
| --- | --- | --- |
| Fifth Intelligence | [Sable Flow, KHpjeuaWOec](https://unsplash.com/photos/a-group-of-people-sitting-around-a-table-KHpjeuaWOec) | Marca "Sable Flow" en el tablero y logotipo de Apple en el portátil; no se pueden recortar sin bajar de 1600 px. |
| Fifth Foundry | [Vitaly Gariev, CdTQI-Nh7J4](https://unsplash.com/photos/team-collaborating-around-a-whiteboard-in-an-office-CdTQI-Nh7J4) | Texto legible en la pizarra y en la pared (PLAN, GOAL, nombres). |
| Fifth Landing | [Datingscout, FmEnFQ5APLQ](https://unsplash.com/photos/a-city-in-the-mountains-FmEnFQ5APLQ) | Marca Repsol visible en la gasolinera. |
| Valira Valley | [Hc Digital, g0PcDhany4Y](https://unsplash.com/photos/a-recording-studio-with-microphones-headphones-and-microphones-g0PcDhany4Y) | Marca RØDE en la mesa de mezclas y rótulo "DISTRICT" en la mesa; ubicada en Perth. |
| Valira Valley | [Carlos Gil, AsxOJcsaR4g](https://unsplash.com/photos/speaker-presenting-on-stage-to-an-audience-AsxOJcsaR4g) | Pantallas con texto, logotipos y un retrato. |
| Valira Valley | [Vitaly Gariev, m76kVfIRS5U](https://unsplash.com/photos/people-listen-attentively-during-a-business-presentation-m76kVfIRS5U) | Pantalla con texto legible ("SALES VALUE") y gráficos. |
| Fifth Academy | [Giu Vicente, -ieXKEI1ivg](https://unsplash.com/photos/a-group-of-people-sitting-around-a-table-writing-on-a-piece-of-paper--ieXKEI1ivg) | Marca STAEDTLER legible en el rotulador, en el centro de la foto. |
| Fifth Foundry | [Vitaly Gariev, piULICqeV5Y](https://unsplash.com/photos/woman-presents-to-colleagues-at-a-whiteboard-meeting-piULICqeV5Y) | Texto legible en la pizarra y en la pared. |
| Fifth Foundry | [Vitaly Gariev, _BHlEskTT4c](https://unsplash.com/photos/four-professionals-in-a-business-meeting-around-a-table-_BHlEskTT4c) | Logotipo en la tapa del portátil, en el centro de la foto. |
