// Verifie que chaque lien interne du site genere pointe vers une page existante.
// Usage : node scripts/check-links.mjs
import fs from "node:fs"
import path from "node:path"

const DIST = "dist"
const SEP = path.sep

const files = []
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else files.push(p)
  }
}
walk(DIST)

// Ensemble des chemins servables
const served = new Set()
for (const f of files) {
  const rel = "/" + f.slice(DIST.length + 1).split(SEP).join("/")
  served.add(rel)
  if (rel.endsWith("/index.html")) {
    const dirPath = rel.slice(0, -"/index.html".length)
    served.add(dirPath === "" ? "/" : dirPath)
    served.add((dirPath === "" ? "" : dirPath) + "/")
  }
}

const broken = new Map()
const htmlFiles = files.filter((f) => f.endsWith(".html"))

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8")
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    let href = m[1].split("#")[0].split("?")[0]
    if (!href) continue
    if (href.startsWith("/_astro") || href.startsWith("/_image")) continue
    href = decodeURIComponent(href)

    const candidates = [
      href,
      href.replace(/\/$/, ""),
      href.replace(/\/$/, "") + "/index.html",
      href === "/" ? "/index.html" : null,
    ].filter(Boolean)

    if (!candidates.some((c) => served.has(c))) {
      const key = href + "   <- " + "/" + f.slice(DIST.length + 1).split(SEP).join("/")
      broken.set(href, (broken.get(href) || 0) + 1)
    }
  }
}

console.log(`Pages HTML analysees : ${htmlFiles.length}`)
console.log(`Chemins servables    : ${served.size}`)
if (broken.size === 0) {
  console.log("OK - aucun lien interne casse")
} else {
  console.log("LIENS CASSES :")
  for (const [href, count] of [...broken].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${href}  (${count} occurrence(s))`)
  }
  process.exitCode = 1
}
