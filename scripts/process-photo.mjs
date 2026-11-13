// Tratamiento común de las fotografías de banco (especificación §7.1):
// recorte al formato del hueco y saturación al 85 %. El velo va en CSS.
// Uso: node scripts/process-photo.mjs <original> <salida.jpg> <ancho> <alto> [posición]
//   posición: centre (por defecto), north, south, east, west, attention…
import sharp from "sharp";

const [input, output, w, h, position = "centre"] = process.argv.slice(2);
if (!input || !output || !w || !h) {
  console.error("Uso: node scripts/process-photo.mjs <original> <salida.jpg> <ancho> <alto> [posición]");
  process.exit(1);
}

const meta = await sharp(input).metadata();
if (meta.width < +w || meta.height < +h) {
  console.warn(`Aviso: el original (${meta.width}×${meta.height}) es menor que ${w}×${h}; se amplía.`);
}

const info = await sharp(input)
  .rotate()
  .resize(+w, +h, { fit: "cover", position })
  .modulate({ saturation: 0.85 })
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toFile(output);

console.log(`${output}: ${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB (original ${meta.width}×${meta.height})`);
