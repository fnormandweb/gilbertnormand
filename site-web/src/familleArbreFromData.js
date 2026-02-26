/**
 * Génère le HTML de la section « Arbre par générations » à partir des données JSON (API).
 */

function escapeHtml(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildFamilleArbreHTML(data) {
  if (!data || !Array.isArray(data.persons) || data.persons.length === 0)
    return ''
  const generations = (data.generations || [])
    .slice()
    .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
  const personsByGen = {}
  for (const p of data.persons) {
    const g = p.generation ?? 0
    if (!personsByGen[g]) personsByGen[g] = []
    personsByGen[g].push(p)
  }

  const renderCard = (p) => {
    const parentStr =
      Array.isArray(p.parentIds) && p.parentIds.length
        ? p.parentIds.join(',')
        : ''
    const childStr =
      Array.isArray(p.childIds) && p.childIds.length ? p.childIds.join(',') : ''
    const attrs = [
      `data-id="${escapeHtml(p.id)}"`,
      parentStr ? `data-parent="${escapeHtml(parentStr)}"` : '',
      childStr ? `data-children="${escapeHtml(childStr)}"` : '',
    ]
      .filter(Boolean)
      .join(' ')
    const cardClass = ['ej-stammbaum-person-card', 'ej-tree-node']
    if (p.isCenter)
      cardClass.push('ej-stammbaum-person-card-center', 'ej-tree-node-center')
    const avatarBlock = p.avatarUrl
      ? `<div class="ej-stammbaum-person-avatar"><img src="${escapeHtml(p.avatarUrl)}" alt="" class="ej-stammbaum-avatar-img"></div>`
      : ''
    const contentClass = p.avatarUrl ? 'ej-stammbaum-person-content' : ''
    const wrapper = p.avatarUrl
      ? `<div class="ej-stammbaum-person-content-wrapper">${avatarBlock}<div class="${contentClass}">`
      : ''
    const wrapperEnd = p.avatarUrl ? '</div></div>' : ''
    return `
            <div class="${cardClass.join(' ')}" ${attrs}>
              ${wrapper}
              <div class="ej-stammbaum-person-name">${escapeHtml(p.name)}</div>
              ${p.dates ? `<div class="ej-stammbaum-person-dates">${escapeHtml(p.dates)}</div>` : ''}
              ${p.role ? `<div class="ej-stammbaum-person-role">${escapeHtml(p.role)}</div>` : ''}
              ${p.notes ? `<div class="ej-stammbaum-person-notes">${escapeHtml(p.notes)}</div>` : ''}
              ${wrapperEnd}
            </div>`
  }

  let html = `
  <section id="arbre-generations" class="ej-timeline-section ej-stammbaum-section">
    <div class="ej-container">
      <div class="ej-header">
        <h2 class="ej-title ej-section-title-archival">
          <span class="ej-section-number">Chapitre 02</span>
          <span class="ej-hud-mark"></span>
          ARBRE PAR GÉNÉRATIONS
        </h2>
        <div class="ej-subtitle ej-military-subtitle">Une représentation simplifiée des générations</div>
      </div>

      <div class="ej-stammbaum-grid ej-tree-container">`

  let prevGenId = null
  for (const gen of generations) {
    const persons = personsByGen[gen.id] || []
    if (persons.length === 0) continue
    if (prevGenId != null) {
      html += `
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="${prevGenId}" data-to="${gen.id}"></div>`
    }
    prevGenId = gen.id
    const isCenter = persons.some((p) => p.isCenter)
    const sectionClass = isCenter
      ? 'ej-stammbaum-generation ej-stammbaum-generation-center ej-tree-generation'
      : 'ej-stammbaum-generation ej-tree-generation'
    const wrapperClass =
      gen.id >= 12
        ? 'ej-stammbaum-descendants-wrapper ej-stammbaum-petits-enfants-3cols'
        : 'ej-stammbaum-parents-wrapper'
    html += `
        <div class="${sectionClass}" data-generation="${gen.id}">
          <div class="ej-stammbaum-generation-label">${escapeHtml(gen.label)}</div>
          <div class="${wrapperClass}">
            ${persons.map(renderCard).join('\n            ')}
          </div>
        </div>`
  }

  html += `
      </div>
    </div>
  </section>`
  return html
}
