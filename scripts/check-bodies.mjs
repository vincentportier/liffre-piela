// Compare, pour chaque article, la taille du corps Markdown source et celle
// du texte reellement rendu dans dist/. Un article qui a du contenu en source
// mais rien a l'ecran est un bug de rendu.
import fs from "node:fs"
import path from "node:path"

const SRC = "content/blog"
const DIST = "dist/blog"

const stripFrontmatter = (raw) => {
  const m = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  return m ? raw.slice(m[0].length) : raw
}

const rows = []
for (const dir of fs.readdirSync(SRC, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  const md = path.join(SRC, dir.name, "index.md")
  if (!fs.existsSync(md)) continue

  const body = stripFrontmatter(fs.readFileSync(md, "utf8"))
  // Texte "utile" : on retire images, balises et espaces
  const srcText = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, "")
  const srcImgs = (body.match(/!\[/g) || []).length

  const html = path.join(DIST, dir.name, "index.html")
  let outText = null
  let outImgs = null
  if (fs.existsSync(html)) {
    const h = fs.readFileSync(html, "utf8")
    const m = h.match(/<div class="post-body[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/)
    const inner = m ? m[1] : ""
    outImgs = (inner.match(/<img/g) || []).length
    outText = inner
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z]+;/gi, "")
      .replace(/\s+/g, "").length
  }

  rows.push({ name: dir.name, srcText: srcText.length, srcImgs, outText, outImgs })
}

rows.sort((a, b) => a.srcText - b.srcText)

let problems = 0
console.log("article".padEnd(38) + "texte src  texte rendu   img src  img rendu")
console.log("-".repeat(78))
for (const r of rows) {
  // Perte suspecte : source non vide, rendu vide ou tres inferieur
  const lost = r.outText === null || (r.srcText > 20 && r.outText < r.srcText * 0.5)
  const lostImg = r.srcImgs > 0 && (r.outImgs ?? 0) < r.srcImgs
  if (lost || lostImg) problems++
  console.log(
    (lost || lostImg ? "!! " : "   ") +
      r.name.padEnd(35) +
      String(r.srcText).padStart(8) +
      String(r.outText).padStart(12) +
      String(r.srcImgs).padStart(10) +
      String(r.outImgs).padStart(10)
  )
}
console.log("-".repeat(78))
console.log(problems === 0 ? "OK - aucune perte de contenu au rendu" : `${problems} article(s) suspect(s)`)
if (problems) process.exitCode = 1
