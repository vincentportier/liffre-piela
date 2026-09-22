/**
 * Reproduit _.kebabCase de lodash, utilise par l'ancien site Gatsby pour
 * construire les URLs de categories. Il retire les accents : "fête" -> "fete".
 * Indispensable pour ne pas casser les URLs existantes.
 */
export function kebabCase(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .join("-")
}

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
]

/** Format d'affichage des dates, en francais. */
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date)
  return `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** Tri decroissant par date (le plus recent d'abord). */
export function byDateDesc(a, b) {
  return b.data.date.getTime() - a.data.date.getTime()
}

export const POSTS_PER_PAGE = 9

const BACKSLASH = String.fromCharCode(92)

/**
 * Extrait de secours quand un article n'a pas de description :
 * on degrossit le Markdown et on coupe.
 */
export function excerpt(body, length = 160) {
  const text = String(body || "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .split(BACKSLASH)
    .join(" ")
    .replace(/[#>*_`~\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return text.length > length ? text.slice(0, length).trimEnd() + "..." : text
}
