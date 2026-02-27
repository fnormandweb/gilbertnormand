/**
 * Formulaire convivial pour éditer tous les textes du site (sans toucher au JSON).
 * Utilise des champs libellés et des sections repliables.
 */

function escapeAttr(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function getNested(obj, path) {
  let cur = obj
  for (const p of path) {
    if (cur == null) return ''
    cur = cur[p]
  }
  return cur != null ? cur : ''
}

function setByPath(obj, pathSegments, value) {
  const path = pathSegments.map((p) =>
    /^\d+$/.test(String(p)) ? parseInt(p, 10) : p,
  )
  let cur = obj
  let i = 0
  while (i < path.length - 1) {
    const seg = path[i]
    const nextSeg = path[i + 1]
    const nextIsNum = typeof nextSeg === 'number'
    if (cur[seg] === undefined) cur[seg] = nextIsNum ? [] : {}
    if (nextIsNum) {
      const idx = nextSeg
      if (i + 2 < path.length) {
        if (cur[seg][idx] == null || typeof cur[seg][idx] !== 'object')
          cur[seg][idx] = {}
        cur = cur[seg][idx]
        i += 2
        continue
      }
      cur = cur[seg]
    } else {
      cur = cur[seg]
    }
    i++
  }
  const last = path[path.length - 1]
  if (typeof last === 'number') {
    if (!Array.isArray(cur)) cur = []
    cur[last] = value
  } else {
    cur[last] = value
  }
}

/**
 * Génère le HTML du formulaire des textes (à insérer dans le panneau).
 * @param {object} texts - Objet textsData actuel
 */
export function renderTextsForm(texts) {
  const h = texts.home
  const f = texts.famille
  const g = texts.galerie
  const ft = texts.footer

  const field = (name, label, value, textarea = false) => {
    const v = escapeAttr(value)
    if (textarea) {
      return `<div class="form-group"><label for="t-${name}">${escapeAttr(label)}</label><textarea id="t-${name}" name="${name}" rows="3">${v}</textarea></div>`
    }
    return `<div class="form-group"><label for="t-${name}">${escapeAttr(label)}</label><input type="text" id="t-${name}" name="${name}" value="${v}" /></div>`
  }

  const section = (title, content) =>
    `<details class="texts-section" open><summary class="texts-section-title">${escapeAttr(title)}</summary><div class="texts-section-body">${content}</div></details>`

  const accueil = [
    section(
      'Bandeau (titre et boutons)',
      [
        field('texts_home_heroTitle', 'Titre principal', h.heroTitle),
        field('texts_home_heroSubtitle', 'Sous-titre', h.heroSubtitle),
        field(
          'texts_home_heroBtnChrono',
          'Texte du bouton « Chronologie »',
          h.heroBtnChrono,
        ),
        field(
          'texts_home_heroBtnParcours',
          'Texte du bouton « Parcours »',
          h.heroBtnParcours,
        ),
      ].join(''),
    ),
    section(
      'Section À propos',
      [
        field('texts_home_aboutTitle', 'Titre de la section', h.aboutTitle),
        field('texts_home_aboutSubtitle', 'Sous-titre', h.aboutSubtitle),
        (h.aboutParagraphs || [])
          .map((p, i) =>
            field(
              `texts_home_aboutParagraphs_${i}`,
              `Paragraphe ${i + 1}`,
              p,
              true,
            ),
          )
          .join(''),
      ].join(''),
    ),
    section(
      'Section Parcours (4 cartes)',
      [
        field(
          'texts_home_leitmotiveTitle',
          'Titre de la section',
          h.leitmotiveTitle,
        ),
        field(
          'texts_home_leitmotiveSubtitle',
          'Sous-titre',
          h.leitmotiveSubtitle,
        ),
        ...(h.leitmotiveCards || []).flatMap((c, i) => [
          field(
            `texts_home_leitmotiveCards_${i}_title`,
            `Carte ${i + 1} — Titre`,
            c.title,
          ),
          field(
            `texts_home_leitmotiveCards_${i}_description`,
            `Carte ${i + 1} — Description`,
            c.description,
            true,
          ),
        ]),
      ].join(''),
    ),
    section(
      'Section Chronologie',
      [
        field('texts_home_timelineTitle', 'Titre', h.timelineTitle),
        field('texts_home_timelineSubtitle', 'Sous-titre', h.timelineSubtitle),
        field(
          'texts_home_timelineIntro',
          "Paragraphe d'introduction",
          h.timelineIntro,
          true,
        ),
      ].join(''),
    ),
    section(
      'Références externes',
      [
        field('texts_home_referencesTitle', 'Titre', h.referencesTitle),
        field(
          'texts_home_referencesSubtitle',
          'Sous-titre',
          h.referencesSubtitle,
        ),
        ...(h.referenceCards || []).flatMap((card, i) => [
          field(
            `texts_home_referenceCards_${i}_title`,
            `Référence ${i + 1} — Titre`,
            card.title,
          ),
          field(
            `texts_home_referenceCards_${i}_description`,
            `Référence ${i + 1} — Description`,
            card.description,
            true,
          ),
          ...(card.links || []).flatMap((link, j) => [
            field(
              `texts_home_referenceCards_${i}_links_${j}_text`,
              `Référence ${i + 1} — Lien ${j + 1} — Texte`,
              link.text,
            ),
            field(
              `texts_home_referenceCards_${i}_links_${j}_url`,
              `Référence ${i + 1} — Lien ${j + 1} — Adresse URL`,
              link.url,
            ),
          ]),
        ]),
      ].join(''),
    ),
    section(
      'Citations',
      [
        field(
          'texts_home_citationsTitle',
          'Titre de la section',
          h.citationsTitle,
        ),
        ...(h.citations || []).flatMap((c, i) => [
          field(
            `texts_home_citations_${i}_text`,
            `Citation ${i + 1} — Texte`,
            c.text,
            true,
          ),
          field(
            `texts_home_citations_${i}_author`,
            `Citation ${i + 1} — Auteur`,
            c.author,
          ),
        ]),
      ].join(''),
    ),
  ].join('')

  const famille = [
    section(
      'Bandeau page Famille',
      [
        field('texts_famille_heroTitle', 'Titre', f.heroTitle),
        field('texts_famille_heroSubtitle', 'Sous-titre', f.heroSubtitle),
        field('texts_famille_heroBtnArbre', 'Bouton Arbre', f.heroBtnArbre),
        field(
          'texts_famille_heroBtnSources',
          'Bouton Méthodologie',
          f.heroBtnSources,
        ),
      ].join(''),
    ),
    section(
      'Introduction',
      [
        field(
          'texts_famille_introParagraphs_0',
          'Paragraphe 1',
          (f.introParagraphs || [])[0],
          true,
        ),
        field(
          'texts_famille_introParagraphs_1',
          'Paragraphe 2',
          (f.introParagraphs || [])[1],
          true,
        ),
      ].join(''),
    ),
    section(
      'Branches familiales',
      [
        field('texts_famille_branchesTitle', 'Titre', f.branchesTitle),
        field(
          'texts_famille_branchesSubtitle',
          'Sous-titre',
          f.branchesSubtitle,
        ),
        field(
          'texts_famille_branchPaternelleTitle',
          'Branche paternelle — Titre',
          f.branchPaternelleTitle,
        ),
        (f.branchPaternelleParagraphs || [])
          .map((p, i) =>
            field(
              `texts_famille_branchPaternelleParagraphs_${i}`,
              `Branche paternelle — Paragraphe ${i + 1}`,
              p,
              true,
            ),
          )
          .join(''),
        field(
          'texts_famille_branchMaternelleTitle',
          'Branche maternelle — Titre',
          f.branchMaternelleTitle,
        ),
        (f.branchMaternelleParagraphs || [])
          .map((p, i) =>
            field(
              `texts_famille_branchMaternelleParagraphs_${i}`,
              `Branche maternelle — Paragraphe ${i + 1}`,
              p,
              true,
            ),
          )
          .join(''),
        field(
          'texts_famille_vieConjugaleTitle',
          'Vie conjugale — Titre',
          f.vieConjugaleTitle,
        ),
        field(
          'texts_famille_vieConjugaleParagraph',
          'Vie conjugale — Paragraphe',
          f.vieConjugaleParagraph,
          true,
        ),
        field(
          'texts_famille_descendanceTitle',
          'Descendance — Titre',
          f.descendanceTitle,
        ),
        field(
          'texts_famille_descendanceParagraph',
          'Descendance — Paragraphe',
          f.descendanceParagraph,
          true,
        ),
      ].join(''),
    ),
    section(
      'Méthodologie & Sources',
      [
        field('texts_famille_methodologyTitle', 'Titre', f.methodologyTitle),
        field(
          'texts_famille_methodologySubtitle',
          'Sous-titre',
          f.methodologySubtitle,
        ),
        (f.methodologyParagraphs || [])
          .map((p, i) =>
            field(
              `texts_famille_methodologyParagraphs_${i}`,
              `Paragraphe ${i + 1}`,
              p,
              true,
            ),
          )
          .join(''),
      ].join(''),
    ),
  ].join('')

  const galerie = section(
    'Page Galerie',
    [
      field('texts_galerie_title', 'Titre de la page', g.title),
      field('texts_galerie_subtitle', 'Sous-titre', g.subtitle),
    ].join(''),
  )

  const footer = section(
    'Pied de page (toutes les pages)',
    [
      field(
        'texts_footer_description',
        'Courte description du site',
        ft.description,
        true,
      ),
      field(
        'texts_footer_rightsText',
        'Mention légale / copyright',
        ft.rightsText,
        true,
      ),
    ].join(''),
  )

  return `
    <form id="form-textes" class="texts-form">
      <div class="texts-form-block">
        <h2 class="texts-form-page-title">Accueil</h2>
        ${accueil}
      </div>
      <div class="texts-form-block">
        <h2 class="texts-form-page-title">Famille</h2>
        ${famille}
      </div>
      <div class="texts-form-block">
        <h2 class="texts-form-page-title">Galerie</h2>
        ${galerie}
      </div>
      <div class="texts-form-block">
        <h2 class="texts-form-page-title">Pied de page</h2>
        ${footer}
      </div>
    </form>
  `
}

/**
 * Lit le formulaire et retourne l'objet texts (même structure que textsData).
 */
export function getTextsFromForm(formEl) {
  if (!formEl) return null
  const texts = {}
  const inputs = formEl.querySelectorAll('[name^="texts_"]')
  for (const el of inputs) {
    const name = el.getAttribute('name')
    if (!name) continue
    const path = name.replace('texts_', '').split('_')
    const value = (el.value || '').trim()
    setByPath(texts, path, value)
  }
  return texts
}
