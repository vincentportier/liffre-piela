// Planche-contact des photos de la galerie, pour choisir visuellement.
// Usage : node scripts/contact-sheet.mjs <dossier> <sortie.jpg>
import sharp from "sharp"
import fs from "node:fs"
import path from "node:path"

const dir = process.argv[2] || "src/images/gallery"
const out = process.argv[3] || "sheet.jpg"

const CELL_W = 260
const CELL_H = 195
const COLS = 7
const PAD = 6

const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort()

const rows = Math.ceil(files.length / COLS)
const width = COLS * (CELL_W + PAD) + PAD
const height = rows * (CELL_H + PAD) + PAD

const composites = []
for (let i = 0; i < files.length; i++) {
  const buf = await sharp(path.join(dir, files[i]))
    .resize(CELL_W, CELL_H, { fit: "cover" })
    .jpeg({ quality: 72 })
    .toBuffer()
  composites.push({
    input: buf,
    left: PAD + (i % COLS) * (CELL_W + PAD),
    top: PAD + Math.floor(i / COLS) * (CELL_H + PAD),
  })
}

await sharp({
  create: { width, height, channels: 3, background: { r: 24, g: 23, b: 28 } },
})
  .composite(composites)
  .jpeg({ quality: 78 })
  .toFile(out)

console.log(`${files.length} photos -> ${out} (${width}x${height})`)
files.forEach((f, i) => {
  if (i % COLS === 0) process.stdout.write(`\nligne ${Math.floor(i / COLS) + 1}: `)
  process.stdout.write(`${i + 1}=${f.replace(/\.(jpe?g|png)$/i, "")}  `)
})
console.log()
