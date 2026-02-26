import './admin.css'
import {
  defaultTimeline,
  defaultGallery,
  defaultTexts,
  defaultFamille,
} from './seedData.js'
import { renderTextsForm, getTextsFromForm } from './textsForm.js'

let timeline = [...defaultTimeline]
let gallery = [...defaultGallery]
let texts = JSON.parse(JSON.stringify(defaultTexts))
let famille = defaultFamille
  ? JSON.parse(JSON.stringify(defaultFamille))
  : { generations: [], persons: [] }
let currentPanel = 'chrono'
let editTimelineIndex = null
let editGalleryIndex = null
let editFamillePersonIndex = null
let useApi = false
const API_BASE = '' // même origine quand l'admin est servi par l'API (/admin/)

const app = document.getElementById('app')
const fetchOpts = { credentials: 'include' }

let authChecked = false
let authenticated = false
let loginError = ''

async function checkAuth() {
  try {
    const r = await fetch(API_BASE + '/api/me', fetchOpts)
    authenticated = r.ok
  } catch (_) {
    authenticated = false
  }
  authChecked = true
}

async function doLogin(user, password) {
  loginError = ''
  try {
    const r = await fetch(API_BASE + '/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }),
    })
    if (!r.ok) {
      const d = await r.json().catch(() => ({}))
      loginError = d.error || 'Identifiants incorrects'
      return false
    }
    authenticated = true
    return true
  } catch (e) {
    loginError = e.message || 'Erreur de connexion'
    return false
  }
}

async function doLogout() {
  try {
    await fetch(API_BASE + '/api/logout', { method: 'POST', ...fetchOpts })
  } catch (_) {}
  authenticated = false
  authChecked = true
  render()
}

async function initApi() {
  try {
    const r = await fetch(API_BASE + '/api/health', fetchOpts)
    if (!r.ok) return
    const d = await r.json()
    if (!d.ok) return
    const [t, g, txt, fam] = await Promise.all([
      fetch(API_BASE + '/api/timeline', fetchOpts).then((res) => res.json()),
      fetch(API_BASE + '/api/gallery', fetchOpts).then((res) => res.json()),
      fetch(API_BASE + '/api/texts', fetchOpts).then((res) => res.json()),
      fetch(API_BASE + '/api/famille', fetchOpts)
        .then((res) => res.json())
        .catch(() => ({ generations: [], persons: [] })),
    ])
    if (Array.isArray(t)) timeline = t
    if (Array.isArray(g)) gallery = g
    if (txt && typeof txt === 'object') texts = txt
    if (fam && Array.isArray(fam.persons))
      famille = { generations: fam.generations || [], persons: fam.persons }
    useApi = true
  } catch (_) {
    useApi = false
  }
}

function emit() {
  render()
}

function downloadFile(filename, content) {
  const a = document.createElement('a')
  a.href =
    'data:application/javascript;charset=utf-8,' + encodeURIComponent(content)
  a.download = filename
  a.click()
}

async function exportTimeline() {
  if (useApi) {
    try {
      const r = await fetch(API_BASE + '/api/timeline', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timeline),
      })
      if (r.status === 401) {
        authenticated = false
        render()
        return
      }
      if (!r.ok) throw new Error(await r.text())
      alert('Chronologie publiée.')
    } catch (e) {
      alert('Erreur : ' + e.message)
    }
    return
  }
  const content =
    'export const timelineData = ' + JSON.stringify(timeline, null, 2) + '\n'
  downloadFile('timelineData.js', content)
}

async function exportGallery() {
  if (useApi) {
    try {
      const r = await fetch(API_BASE + '/api/gallery', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gallery),
      })
      if (r.status === 401) {
        authenticated = false
        render()
        return
      }
      if (!r.ok) throw new Error(await r.text())
      alert('Galerie publiée.')
    } catch (e) {
      alert('Erreur : ' + e.message)
    }
    return
  }
  const content =
    'export const galleryImages = ' + JSON.stringify(gallery, null, 2) + '\n'
  downloadFile('galleryData.js', content)
}

function exportTexts() {
  const form = document.getElementById('form-textes')
  const data = form ? getTextsFromForm(form) : texts
  if (data) texts = data
  if (useApi) {
    ;(async () => {
      try {
        const r = await fetch(API_BASE + '/api/texts', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(texts),
        })
        if (r.status === 401) {
          authenticated = false
          render()
          return
        }
        if (!r.ok) throw new Error(await r.text())
        alert('Textes publiés.')
      } catch (e) {
        alert('Erreur : ' + e.message)
      }
    })()
    return
  }
  const content =
    'export const textsData = ' + JSON.stringify(texts, null, 2) + '\n'
  downloadFile('textsData.js', content)
}

function resetTexts() {
  texts = JSON.parse(JSON.stringify(defaultTexts))
  emit()
}

function importTextsJSON(text) {
  try {
    const data = JSON.parse(text)
    if (
      data &&
      typeof data === 'object' &&
      (data.home || data.famille || data.footer)
    ) {
      texts = data
      emit()
    } else {
      throw new Error(
        'Structure invalide : attendu { home, famille, galerie?, footer }',
      )
    }
  } catch (e) {
    alert('JSON invalide : ' + e.message)
  }
}

function importJSON(type, text) {
  try {
    const data = JSON.parse(text)
    const arr = Array.isArray(data)
      ? data
      : data.timelineData || data.galleryImages || data
    if (!Array.isArray(arr)) throw new Error('Format invalide')
    if (type === 'chrono') timeline = arr
    else gallery = arr
    emit()
  } catch (e) {
    alert('JSON invalide : ' + e.message)
  }
}

function addTimelineEntry() {
  timeline.push({ dateLabel: '', title: '', summary: '', category: 'Médecine' })
  editTimelineIndex = timeline.length - 1
  emit()
  openTimelineModal()
}

function editTimelineEntry(i) {
  editTimelineIndex = i
  emit()
  openTimelineModal()
}

function openTimelineModal() {
  const modal = document.getElementById('modal-timeline')
  if (modal) modal.style.display = 'flex'
}

function saveTimelineEntry() {
  const form = document.getElementById('form-timeline')
  if (!form || editTimelineIndex == null) return
  const entry = timeline[editTimelineIndex]
  entry.dateLabel = form.dateLabel.value.trim()
  entry.title = form.title.value.trim()
  entry.summary = form.summary.value.trim()
  entry.category = form.category.value.trim() || 'Médecine'
  const imgUrl = form.imageUrl.value.trim()
  if (imgUrl) {
    entry.image = {
      url: imgUrl,
      alt: form.imageAlt.value.trim() || entry.title,
      width: parseInt(form.imageWidth.value, 10) || 800,
      height: parseInt(form.imageHeight.value, 10) || 600,
    }
    if (form.imagePositionTop.checked) entry.image.position = 'top'
    else delete entry.image.position
  } else {
    delete entry.image
  }
  const linksText = form.links.value.trim()
  if (linksText) {
    entry.links = linksText
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [url, ...rest] = line.split('|')
        return { url: (url || '').trim(), text: (rest.join('|') || url).trim() }
      })
      .filter((l) => l.url)
  } else {
    delete entry.links
  }
  editTimelineIndex = null
  document.getElementById('modal-timeline').style.display = 'none'
  emit()
}

function removeTimelineEntryImage() {
  if (editTimelineIndex == null) return
  const entry = timeline[editTimelineIndex]
  delete entry.image
  emit()
}

function deleteTimelineEntry(i) {
  if (confirm('Supprimer cette entrée ?')) {
    timeline.splice(i, 1)
    if (editTimelineIndex != null) {
      if (editTimelineIndex === i) editTimelineIndex = null
      else if (editTimelineIndex > i) editTimelineIndex--
    }
    emit()
  }
}

function moveTimelineEntry(i, dir) {
  const j = i + dir
  if (j < 0 || j >= timeline.length) return
  ;[timeline[i], timeline[j]] = [timeline[j], timeline[i]]
  if (editTimelineIndex != null) {
    if (editTimelineIndex === i) editTimelineIndex = j
    else if (editTimelineIndex === j) editTimelineIndex = i
  }
  emit()
}

function addGalleryImage() {
  gallery.push({ src: '', alt: '' })
  editGalleryIndex = gallery.length - 1
  emit()
  openGalleryModal()
}

function editGalleryImage(i) {
  editGalleryIndex = i
  emit()
  openGalleryModal()
}

function openGalleryModal() {
  const modal = document.getElementById('modal-gallery')
  if (modal) modal.style.display = 'flex'
}

function saveGalleryImage() {
  const form = document.getElementById('form-gallery')
  if (!form || editGalleryIndex == null) return
  gallery[editGalleryIndex] = {
    src: form.src.value.trim(),
    alt: form.alt.value.trim(),
  }
  editGalleryIndex = null
  document.getElementById('modal-gallery').style.display = 'none'
  emit()
}

function deleteGalleryImage(i) {
  if (confirm('Supprimer cette image ?')) {
    gallery.splice(i, 1)
    if (editGalleryIndex != null) {
      if (editGalleryIndex === i) editGalleryIndex = null
      else if (editGalleryIndex > i) editGalleryIndex--
    }
    emit()
  }
}

function moveGalleryImage(i, dir) {
  const j = i + dir
  if (j < 0 || j >= gallery.length) return
  ;[gallery[i], gallery[j]] = [gallery[j], gallery[i]]
  if (editGalleryIndex != null) {
    if (editGalleryIndex === i) editGalleryIndex = j
    else if (editGalleryIndex === j) editGalleryIndex = i
  }
  emit()
}

function reorderTimelineByDrag(fromIndex, toIndex) {
  if (fromIndex === toIndex) return
  const ref = editTimelineIndex != null ? timeline[editTimelineIndex] : null
  const item = timeline.splice(fromIndex, 1)[0]
  timeline.splice(toIndex, 0, item)
  if (ref != null) editTimelineIndex = timeline.indexOf(ref)
  emit()
}

function reorderGalleryByDrag(fromIndex, toIndex) {
  if (fromIndex === toIndex) return
  const ref = editGalleryIndex != null ? gallery[editGalleryIndex] : null
  const item = gallery.splice(fromIndex, 1)[0]
  gallery.splice(toIndex, 0, item)
  if (ref != null) editGalleryIndex = gallery.indexOf(ref)
  emit()
}

// --- Famille (arbre généalogique) ---
function getGenLabel(genId) {
  const g = (famille.generations || []).find((x) => x.id === genId)
  return g ? g.label : `Génération ${genId}`
}

function getPersonNameById(id) {
  const p = (famille.persons || []).find((x) => x.id === id)
  return p ? p.name : id
}

let familleViewMode = 'niveau' // 'niveau' = liste par niveau, 'arbre' = aperçu arbre

function switchFamilleView(mode) {
  familleViewMode = mode
  emit()
}

function renderFamillePanel() {
  const persons = famille.persons || []
  if (persons.length === 0)
    return `
        <div class="famille-empty-state">
          <p><strong>Aucune personne dans l'arbre.</strong></p>
          <p>Pour charger un arbre d'exemple (Gilbert Normand, Line Anctil, descendants, etc.), cliquez ci-dessous :</p>
          <button type="button" class="btn btn-primary" onclick="initFamilleWithDefault()">Initialiser avec l'arbre par défaut</button>
          <p class="famille-empty-or">Ou <button type="button" class="btn btn-secondary btn-inline" onclick="addFamillePerson()">Ajouter une personne</button> pour commencer à zéro.</p>
        </div>`

  const byGen = {}
  persons.forEach((p) => {
    const g = p.generation ?? 0
    if (!byGen[g]) byGen[g] = []
    byGen[g].push(p)
  })
  const genIds = [
    ...new Set(persons.map((p) => p.generation).filter(Boolean)),
  ].sort((a, b) => b - a)

  const renderPersonRow = (p, i) => {
    const parentNames = (p.parentIds || [])
      .map(getPersonNameById)
      .filter(Boolean)
    const childNames = (p.childIds || []).map(getPersonNameById).filter(Boolean)
    return `
            <div class="entry-row famille-person-row">
              <div class="entry-content">
                <div class="entry-title">${escapeAttr(p.name)}</div>
                <div class="entry-meta famille-meta">
                  <span class="famille-level">Niveau ${p.generation} — ${escapeAttr(getGenLabel(p.generation))}</span>
                </div>
                <div class="famille-links">
                  <span class="famille-link-label">Parents :</span> ${parentNames.length ? parentNames.map((n) => escapeAttr(n)).join(', ') : '—'}
                </div>
                <div class="famille-links">
                  <span class="famille-link-label">Enfants :</span> ${childNames.length ? childNames.map((n) => escapeAttr(n)).join(', ') : '—'}
                </div>
              </div>
              <div class="entry-actions">
                <button type="button" class="btn" onclick="editFamillePerson(${i})">Modifier</button>
                <button type="button" class="btn btn-danger" onclick="deleteFamillePerson(${i})">Supprimer</button>
              </div>
            </div>`
  }

  const parentIdsOf = (p) => (Array.isArray(p.parentIds) ? p.parentIds : [])
  const getDescendantIds = (pid) => {
    const kids = persons
      .filter((p) => parentIdsOf(p).includes(pid))
      .map((p) => p.id)
    return [pid, ...kids.flatMap((k) => getDescendantIds(k))]
  }
  const center = persons.find((p) => p.isCenter)
  const noParent = persons.filter((p) => parentIdsOf(p).length === 0)
  const roots = center
    ? [center]
    : noParent.length
      ? noParent
      : [persons[0]].filter(Boolean)
  const inTree = new Set(roots.flatMap((r) => getDescendantIds(r.id)))
  const others = persons.filter((p) => !inTree.has(p.id))

  const renderTreeLevel = (pid, depth) => {
    const children = persons.filter((p) => parentIdsOf(p).includes(pid))
    if (children.length === 0) return ''
    return children
      .map((c) => {
        const i = persons.indexOf(c)
        const indentPx = Math.min(depth * 20, 100)
        return `
            <div class="famille-tree-node" style="margin-left: ${indentPx}px;">
              <div class="famille-tree-item">
                <span class="famille-tree-name">${escapeAttr(c.name)}</span>
                <span class="famille-level-badge">niveau ${c.generation}</span>
                <button type="button" class="btn btn-small" onclick="editFamillePerson(${i})">Modifier</button>
              </div>
              ${renderTreeLevel(c.id, depth + 1)}
            </div>`
      })
      .join('')
  }

  const treeContent =
    roots.length > 0
      ? `
          <p class="famille-view-hint">La personne « mise en avant » en tête ; ses enfants en dessous avec indentation.</p>
          ${roots
            .map((r) => {
              const i = persons.indexOf(r)
              return `
            <div class="famille-tree-root">
              <div class="famille-tree-item famille-root-row">
                <span class="famille-tree-name">${escapeAttr(r.name)}</span>
                <span class="famille-level-badge">niveau ${r.generation}</span>
                <button type="button" class="btn btn-small" onclick="editFamillePerson(${i})">Modifier</button>
              </div>
              ${renderTreeLevel(r.id, 1)}
            </div>`
            })
            .join('')}
          ${
            others.length > 0
              ? `
          <div class="famille-others-title">Autres (conjoint·e, autres branches)</div>
          ${others
            .map((p) => {
              const i = persons.indexOf(p)
              return `<div class="famille-tree-item"><span class="famille-tree-name">${escapeAttr(p.name)}</span> <span class="famille-level-badge">niveau ${p.generation}</span> <button type="button" class="btn btn-small" onclick="editFamillePerson(${i})">Modifier</button></div>`
            })
            .join('')}`
              : ''
          }`
      : '<p class="famille-view-hint">Aucune personne « mise en avant ». Modifiez une personne et cochez « Mettre en avant (carte centrale) » pour voir l\'arbre.</p>'

  const toggleButtons = `
        <div class="famille-view-toggle">
          <button type="button" class="btn btn-secondary ${familleViewMode === 'niveau' ? 'active' : ''}" onclick="switchFamilleView('niveau')">Vue par niveau</button>
          <button type="button" class="btn btn-secondary ${familleViewMode === 'arbre' ? 'active' : ''}" onclick="switchFamilleView('arbre')">Vue arbre</button>
        </div>`

  if (familleViewMode === 'arbre') {
    return `
        ${toggleButtons}
        <div class="famille-arbre-preview">
          <h3 class="famille-arbre-title">Aperçu de l'arbre</h3>
          ${treeContent}
        </div>`
  }

  return `
        ${toggleButtons}
        <p class="famille-view-hint">Liste par <strong>niveau</strong> (génération). Modifiez une personne pour définir ses parents et enfants.</p>
        <div class="famille-section-block">
          <h3 class="famille-section-title">Liste par niveau</h3>
          ${genIds
            .map((genId) => {
              const list = byGen[genId] || []
              return `
        <div class="famille-generation-block">
          <div class="famille-generation-title">Niveau ${genId} — ${escapeAttr(getGenLabel(genId))}</div>
          ${list.map((p) => renderPersonRow(p, persons.indexOf(p))).join('')}
        </div>`
            })
            .join('')}
        </div>
  `
}

function addFamillePerson() {
  const newId = 'personne-' + Date.now()
  famille.persons.push({
    id: newId,
    name: '',
    dates: '',
    role: '',
    notes: '',
    parentIds: [],
    childIds: [],
    generation: 11,
  })
  editFamillePersonIndex = famille.persons.length - 1
  emit()
  openFamillePersonModal()
}

function editFamillePerson(i) {
  editFamillePersonIndex = i
  emit()
  openFamillePersonModal()
}

function openFamillePersonModal() {
  const modal = document.getElementById('modal-famille-person')
  if (modal) modal.style.display = 'flex'
}

function saveFamillePerson() {
  const form = document.getElementById('form-famille-person')
  if (!form || editFamillePersonIndex == null) return
  const p = famille.persons[editFamillePersonIndex]
  p.id = (form.personId?.value?.trim() || p.id)
    .replace(/\s+/g, '-')
    .toLowerCase()
  p.name = form.personName?.value?.trim() ?? ''
  p.dates = form.personDates?.value?.trim() ?? ''
  p.role = form.personRole?.value?.trim() ?? ''
  p.notes = form.personNotes?.value?.trim() ?? ''
  p.generation = parseInt(form.personGeneration?.value, 10) || 11
  p.avatarUrl = form.personAvatar?.value?.trim() || ''
  p.isCenter = form.personIsCenter?.checked ?? false
  const parentIds = []
  form
    .querySelectorAll('input[name="personParents"]:checked')
    .forEach((cb) => parentIds.push(cb.value))
  p.parentIds = parentIds
  const childIds = []
  form
    .querySelectorAll('input[name="personChildren"]:checked')
    .forEach((cb) => childIds.push(cb.value))
  p.childIds = childIds
  editFamillePersonIndex = null
  document.getElementById('modal-famille-person').style.display = 'none'
  emit()
}

function deleteFamillePerson(i) {
  if (!confirm("Supprimer cette personne de l'arbre ?")) return
  famille.persons.splice(i, 1)
  if (editFamillePersonIndex != null) {
    if (editFamillePersonIndex === i) editFamillePersonIndex = null
    else if (editFamillePersonIndex > i) editFamillePersonIndex--
  }
  emit()
}

async function exportFamille() {
  if (!useApi) return
  try {
    const r = await fetch(API_BASE + '/api/famille', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(famille),
    })
    if (r.status === 401) {
      authenticated = false
      render()
      return
    }
    if (!r.ok) throw new Error(await r.text())
    alert('Arbre généalogique publié.')
  } catch (e) {
    alert('Erreur : ' + e.message)
  }
}

async function initFamilleWithDefault() {
  try {
    if (!defaultFamille || !defaultFamille.persons?.length) {
      alert('Aucun arbre par défaut disponible.')
      return
    }
    if (
      !confirm(
        "Charger l'arbre par défaut (Gilbert Normand, Line Anctil, descendants, etc.) ? Les données actuelles seront remplacées.",
      )
    )
      return

    famille = JSON.parse(JSON.stringify(defaultFamille))
    const count = famille.persons.length

    if (useApi) {
      try {
        const r = await fetch(API_BASE + '/api/famille', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(famille),
        })
        if (r.status === 401) {
          authenticated = false
          render()
          alert(
            "Session expirée. Reconnectez-vous, puis recliquez sur « Initialiser avec l'arbre par défaut ».",
          )
          return
        }
        if (!r.ok) {
          const errText = await r.text()
          alert(
            'Erreur serveur : ' +
              (errText || r.status) +
              ". L'arbre est affiché ici ; reconnectez-vous et cliquez sur « Publier » pour enregistrer.",
          )
          emit()
          return
        }
      } catch (e) {
        alert(
          'Connexion impossible : ' +
            e.message +
            ". L'arbre est affiché ici ; vérifiez que le serveur tourne et cliquez sur « Publier » pour enregistrer.",
        )
        emit()
        return
      }
    }

    alert('Arbre initialisé avec ' + count + ' personnes.')
    emit()
  } catch (e) {
    alert('Erreur : ' + (e.message || String(e)))
  }
}

function renderTimelineModal() {
  const entry = editTimelineIndex != null ? timeline[editTimelineIndex] : null
  if (!entry) return ''
  const img = entry.image || {}
  const hasImage = !!(img && img.url)
  const linksStr = (entry.links || [])
    .map((l) => l.url + '|' + (l.text || ''))
    .join('\n')
  const imageSectionLabel = hasImage
    ? "Remplacer ou retirer l'image"
    : 'Ajouter une image (optionnel)'
  const previewHtml = hasImage
    ? `<div class="timeline-entry-image-preview"><img src="${escapeAttr(img.url)}" alt="Aperçu" /><button type="button" class="btn btn-secondary btn-small" onclick="removeTimelineEntryImage()">Retirer l\'image</button></div>`
    : ''
  return `
    <div id="modal-timeline" class="modal-overlay" style="display: none;">
      <div class="modal">
        <div class="modal-header">
          <h2>${entry.dateLabel || entry.title ? 'Modifier' : 'Ajouter'} l'entrée</h2>
          <button type="button" class="btn" onclick="document.getElementById('modal-timeline').style.display='none'">Fermer</button>
        </div>
        <form id="form-timeline" class="modal-body" onsubmit="saveTimelineEntry(); return false;">
          <div class="form-row">
            <div class="form-group">
              <label>Date / Période</label>
              <input type="text" name="dateLabel" value="${escapeAttr(entry.dateLabel)}" placeholder="ex. 1963 ou 1997–2004" />
            </div>
            <div class="form-group">
              <label>Catégorie</label>
              <input type="text" name="category" value="${escapeAttr(entry.category)}" placeholder="Médecine, Politique, Famille…" />
            </div>
          </div>
          <div class="form-group">
            <label>Titre</label>
            <input type="text" name="title" value="${escapeAttr(entry.title)}" required />
          </div>
          <div class="form-group">
            <label>Résumé</label>
            <textarea name="summary">${escapeAttr(entry.summary)}</textarea>
          </div>
          <div class="form-group timeline-image-group">
            <label>${imageSectionLabel}</label>
            ${previewHtml}
            <input type="text" name="imageUrl" value="${escapeAttr(img.url)}" placeholder="${hasImage ? 'Nouvelle URL pour remplacer' : '/images/...'}" />
            <div class="form-row form-row--tight">
              <div class="form-group">
                <label>Alt image</label>
                <input type="text" name="imageAlt" value="${escapeAttr(img.alt)}" placeholder="Description pour l'accessibilité" />
              </div>
              <div class="form-group">
                <label>Largeur / Hauteur</label>
                <input type="number" name="imageWidth" value="${img.width || 800}" style="width: 50%; display: inline-block;" />
                <input type="number" name="imageHeight" value="${img.height || 600}" style="width: 50%; display: inline-block;" />
              </div>
            </div>
            <div class="form-group">
              <label><input type="checkbox" name="imagePositionTop" ${img.position === 'top' ? 'checked' : ''} /> Cadrer image en haut (éviter de couper les visages)</label>
            </div>
          </div>
          <div class="form-group">
            <label>Liens (un par ligne : url|texte)</label>
            <textarea name="links" placeholder="https://...|Profil parlementaire">${escapeAttr(linksStr)}</textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" onclick="document.getElementById('modal-timeline').style.display='none'">Annuler</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  `
}

function renderGalleryModal() {
  const item = editGalleryIndex != null ? gallery[editGalleryIndex] : null
  if (!item) return ''
  return `
    <div id="modal-gallery" class="modal-overlay" style="display: none;">
      <div class="modal">
        <div class="modal-header">
          <h2>Modifier l'image</h2>
          <button type="button" class="btn" onclick="document.getElementById('modal-gallery').style.display='none'">Fermer</button>
        </div>
        <form id="form-gallery" class="modal-body" onsubmit="saveGalleryImage(); return false;">
          <div class="form-group">
            <label>Chemin image (src)</label>
            <input type="text" name="src" value="${escapeAttr(item.src)}" placeholder="/images/galerie/..." required />
          </div>
          <div class="form-group">
            <label>Texte alternatif (alt)</label>
            <input type="text" name="alt" value="${escapeAttr(item.alt)}" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" onclick="document.getElementById('modal-gallery').style.display='none'">Annuler</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  `
}

function escapeAttr(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderFamillePersonModal() {
  const p =
    editFamillePersonIndex != null
      ? famille.persons[editFamillePersonIndex]
      : null
  if (!p) return ''
  const gens = famille.generations || []
  const others = famille.persons.filter((x, i) => i !== editFamillePersonIndex)
  const parentIds = Array.isArray(p.parentIds) ? p.parentIds : []
  const childIds = Array.isArray(p.childIds) ? p.childIds : []
  return `
    <div id="modal-famille-person" class="modal-overlay" style="display: none;">
      <div class="modal">
        <div class="modal-header">
          <h2>${p.name ? 'Modifier' : 'Ajouter'} la personne</h2>
          <button type="button" class="btn" onclick="document.getElementById('modal-famille-person').style.display='none'">Fermer</button>
        </div>
        <form id="form-famille-person" class="modal-body" onsubmit="saveFamillePerson(); return false;">
          <div class="form-group">
            <label>Identifiant (sans espaces, pour les liens parent/enfant)</label>
            <input type="text" name="personId" value="${escapeAttr(p.id)}" placeholder="ex. gilbert" required />
          </div>
          <div class="form-group">
            <label>Nom complet</label>
            <input type="text" name="personName" value="${escapeAttr(p.name)}" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Dates</label>
              <input type="text" name="personDates" value="${escapeAttr(p.dates)}" placeholder="ex. 1943-03-31 — 2025-01-01" />
            </div>
            <div class="form-group">
              <label>Niveau (génération)</label>
              <select name="personGeneration">${(gens.length ? gens : Array.from({ length: 13 }, (_, i) => ({ id: 13 - i, label: `Génération ${13 - i}` }))).map((g) => `<option value="${g.id}" ${p.generation === g.id ? 'selected' : ''}>${escapeAttr(g.label)}</option>`).join('')}</select>
              <p class="form-hint">Plus le nombre est petit, plus la personne est ancêtre (ex. 9). Plus il est grand, plus elle est jeune (ex. 13). Les parents sont souvent au niveau au-dessus, les enfants au niveau en dessous.</p>
            </div>
          </div>
          <div class="form-group">
            <label>Rôle / titre</label>
            <input type="text" name="personRole" value="${escapeAttr(p.role)}" placeholder="ex. Fils de Gilbert Normand" />
          </div>
          <div class="form-group">
            <label>Notes</label>
            <textarea name="personNotes" rows="3">${escapeAttr(p.notes)}</textarea>
          </div>
          <div class="form-group">
            <label>Photo (URL)</label>
            <input type="text" name="personAvatar" value="${escapeAttr(p.avatarUrl || '')}" placeholder="/images/arbre/..." />
          </div>
          <div class="form-group">
            <label><input type="checkbox" name="personIsCenter" ${p.isCenter ? 'checked' : ''} /> Mettre en avant (carte centrale dans l'arbre)</label>
          </div>
          ${
            others.length
              ? `
          <div class="form-row">
            <div class="form-group">
              <label>Cette personne a pour <strong>parents</strong> :</label>
              <p class="form-hint">Cochez la case à gauche de chaque parent.</p>
              <div class="checkbox-group">${others.map((o) => `<label class="checkbox-label"><input type="checkbox" name="personParents" value="${escapeAttr(o.id)}" ${parentIds.includes(o.id) ? 'checked' : ''} /><span class="checkbox-text">${escapeAttr(o.name)} <span class="checkbox-meta">(niveau ${o.generation})</span></span></label>`).join('')}</div>
            </div>
            <div class="form-group">
              <label>Cette personne a pour <strong>enfants</strong> :</label>
              <p class="form-hint">Cochez la case à gauche de chaque enfant.</p>
              <div class="checkbox-group">${others.map((o) => `<label class="checkbox-label"><input type="checkbox" name="personChildren" value="${escapeAttr(o.id)}" ${childIds.includes(o.id) ? 'checked' : ''} /><span class="checkbox-text">${escapeAttr(o.name)} <span class="checkbox-meta">(niveau ${o.generation})</span></span></label>`).join('')}</div>
            </div>
          </div>
          `
              : ''
          }
          <div class="modal-footer">
            <button type="button" class="btn" onclick="document.getElementById('modal-famille-person').style.display='none'">Annuler</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  `
}

function renderLogin() {
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-box">
        <h1>Admin — Gilbert Normand</h1>
        <p class="login-subtitle">Connectez-vous pour gérer le contenu.</p>
        <form id="login-form" class="login-form">
          <div class="form-group">
            <label for="login-user">Utilisateur</label>
            <input type="text" id="login-user" name="user" required autocomplete="username" />
          </div>
          <div class="form-group">
            <label for="login-password">Mot de passe</label>
            <input type="password" id="login-password" name="password" required autocomplete="current-password" />
          </div>
          ${loginError ? `<p class="login-error">${escapeAttr(loginError)}</p>` : ''}
          <button type="submit" class="btn btn-primary btn-block">Connexion</button>
        </form>
      </div>
    </div>
  `
  const form = document.getElementById('login-form')
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault()
      const u = document.getElementById('login-user')?.value?.trim() ?? ''
      const p = (document.getElementById('login-password')?.value ?? '').trim()
      if (!u) return
      const ok = await doLogin(u, p)
      if (ok) {
        await initApi()
        render()
      } else {
        renderLogin()
      }
    }
  }
}

function render() {
  if (!authChecked) {
    app.innerHTML =
      '<div class="login-screen"><div class="login-box"><p>Chargement…</p></div></div>'
    return
  }
  if (!authenticated) {
    renderLogin()
    return
  }
  app.innerHTML = `
    <header class="admin-header">
      <h1>Admin — Gilbert Normand</h1>
      ${useApi ? '<span class="admin-badge">Connecté · Publier enregistre en ligne</span>' : ''}
      <nav class="admin-nav">
        <button type="button" class="${currentPanel === 'chrono' ? 'active' : ''}" data-panel="chrono">Chronologie</button>
        <button type="button" class="${currentPanel === 'galerie' ? 'active' : ''}" data-panel="galerie">Galerie</button>
        <button type="button" class="${currentPanel === 'textes' ? 'active' : ''}" data-panel="textes">Textes</button>
        <button type="button" class="${currentPanel === 'famille' ? 'active' : ''}" data-panel="famille">Famille</button>
        <button type="button" class="btn-logout" onclick="doLogout()">Déconnexion</button>
      </nav>
    </header>
    <main class="admin-main">
      <section id="panel-chrono" class="admin-panel ${currentPanel === 'chrono' ? 'active' : ''}">
        <div class="admin-toolbar">
          <button type="button" class="btn btn-primary" onclick="addTimelineEntry()">Ajouter une entrée</button>
          <button type="button" class="btn btn-primary" onclick="exportTimeline()">Publier la chronologie</button>
        </div>
        <p class="help-text">${useApi ? 'Cliquez sur <strong>Publier la chronologie</strong> pour enregistrer les modifications en ligne. Le site public affiche les données à jour.' : 'Cliquez sur <strong>Publier la chronologie</strong> pour télécharger le fichier à jour. Remplacez <code>site-web/src/timelineData.js</code> par ce fichier, puis lancez <code>pnpm run build</code> dans le dossier du site.'}</p>
        <details class="admin-other-actions">
          <summary>Autres actions</summary>
          <label class="btn btn-secondary">Importer des données <input type="file" accept=".json,application/json" style="display:none" id="import-chrono" /></label>
        </details>
        <div class="card">
          <div class="card-header">Chronologie (${timeline.length} entrées) — glisser une ligne pour réordonner</div>
          <div class="card-body">
            ${timeline
              .map(
                (e, i) => `
              <div class="entry-row draggable-row" draggable="true" data-drag-index="${i}" data-drag-type="timeline" title="Glisser pour réordonner">
                <div class="entry-order">
                  <span class="drag-handle" title="Glisser pour réordonner">⋮⋮</span>
                  <button type="button" class="btn btn-icon" title="Monter" ${i === 0 ? 'disabled' : ''} onclick="moveTimelineEntry(${i}, -1)">↑</button>
                  <button type="button" class="btn btn-icon" title="Descendre" ${i === timeline.length - 1 ? 'disabled' : ''} onclick="moveTimelineEntry(${i}, 1)">↓</button>
                  <span class="entry-num">${i + 1}</span>
                </div>
                <div class="entry-content">
                  <div class="entry-meta">${escapeAttr(e.dateLabel)} — ${escapeAttr(e.category)}</div>
                  <div class="entry-title">${escapeAttr(e.title)}</div>
                  <p class="entry-summary">${escapeAttr((e.summary || '').slice(0, 120))}${(e.summary || '').length > 120 ? '…' : ''}</p>
                </div>
                <div class="entry-actions">
                  <button type="button" class="btn" onclick="editTimelineEntry(${i})">Modifier</button>
                  <button type="button" class="btn btn-danger" onclick="deleteTimelineEntry(${i})">Supprimer</button>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </section>
      <section id="panel-galerie" class="admin-panel ${currentPanel === 'galerie' ? 'active' : ''}">
        <div class="admin-toolbar">
          <button type="button" class="btn btn-primary" onclick="addGalleryImage()">Ajouter une image</button>
          <button type="button" class="btn btn-primary" onclick="exportGallery()">Publier la galerie</button>
        </div>
        <p class="help-text">${useApi ? 'Cliquez sur <strong>Publier la galerie</strong> pour enregistrer les modifications en ligne. Le site public affiche les données à jour.' : 'Cliquez sur <strong>Publier la galerie</strong> pour télécharger le fichier à jour. Remplacez <code>site-web/src/galleryData.js</code> par ce fichier, puis lancez <code>pnpm run build</code> dans le dossier du site.'}</p>
        <details class="admin-other-actions">
          <summary>Autres actions</summary>
          <label class="btn btn-secondary">Importer des données <input type="file" accept=".json,application/json" style="display:none" id="import-gallery" /></label>
        </details>
        <div class="card">
          <div class="card-header">Galerie (${gallery.length} images) — glisser une ligne pour réordonner</div>
          <div class="card-body">
            ${gallery
              .map(
                (g, i) => `
              <div class="gallery-item draggable-row" draggable="true" data-drag-index="${i}" data-drag-type="gallery" title="Glisser pour réordonner">
                <div class="entry-order">
                  <span class="drag-handle" title="Glisser pour réordonner">⋮⋮</span>
                  <button type="button" class="btn btn-icon" title="Monter" ${i === 0 ? 'disabled' : ''} onclick="moveGalleryImage(${i}, -1)">↑</button>
                  <button type="button" class="btn btn-icon" title="Descendre" ${i === gallery.length - 1 ? 'disabled' : ''} onclick="moveGalleryImage(${i}, 1)">↓</button>
                  <span class="entry-num">${i + 1}</span>
                </div>
                <img src="${escapeAttr(g.src)}" alt="" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22><rect fill=%22%23eee%22 width=%2260%22 height=%2260%22/><text x=%2230%22 y=%2235%22 fill=%22%23999%22 font-size=%2212%22 text-anchor=%22middle%22>?</text></svg>'" />
                <div class="gallery-info">
                  <div class="entry-title">${escapeAttr(g.alt)}</div>
                  <div class="gallery-src">${escapeAttr(g.src)}</div>
                </div>
                <div class="entry-actions">
                  <button type="button" class="btn" onclick="editGalleryImage(${i})">Modifier</button>
                  <button type="button" class="btn btn-danger" onclick="deleteGalleryImage(${i})">Supprimer</button>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </section>
      <section id="panel-textes" class="admin-panel ${currentPanel === 'textes' ? 'active' : ''}">
        <div class="admin-toolbar">
          <button type="button" class="btn btn-primary" onclick="exportTexts()">Publier les textes</button>
          <button type="button" class="btn" onclick="resetTexts()">Réinitialiser</button>
        </div>
        <p class="help-text">${useApi ? 'Modifiez les champs ci-dessous, puis cliquez sur <strong>Publier les textes</strong> pour enregistrer en ligne. Le site public affiche les données à jour.' : 'Modifiez les champs ci-dessous, puis cliquez sur <strong>Publier les textes</strong> pour télécharger le fichier à jour. Remplacez <code>site-web/src/textsData.js</code> par ce fichier, puis lancez <code>pnpm run build</code> dans le dossier du site.'}</p>
        <details class="admin-other-actions">
          <summary>Autres actions</summary>
          <label class="btn btn-secondary">Importer des données <input type="file" accept=".json,application/json,.js" style="display:none" id="import-textes" /></label>
        </details>
        <div class="card texts-form-card">
          <div class="card-body">
            ${renderTextsForm(texts)}
          </div>
        </div>
      </section>
      <section id="panel-famille" class="admin-panel ${currentPanel === 'famille' ? 'active' : ''}">
        <div class="admin-toolbar">
          <button type="button" class="btn btn-primary" onclick="addFamillePerson()">Ajouter une personne</button>
          <button type="button" class="btn btn-primary" onclick="exportFamille()">Publier l'arbre généalogique</button>
          ${famille.persons.length === 0 ? '<button type="button" class="btn btn-secondary" onclick="initFamilleWithDefault()">Initialiser avec l\'arbre par défaut</button>' : ''}
        </div>
        <p class="help-text">${useApi ? "Modifiez les personnes et les générations ci-dessous, puis cliquez sur <strong>Publier l'arbre généalogique</strong> pour enregistrer. La page Famille du site affichera l'arbre à jour." : "L'arbre est enregistré via l'API. Connectez-vous pour publier."} ${famille.persons.length === 0 ? "Si l'arbre est vide, cliquez sur <strong>Initialiser avec l'arbre par défaut</strong> pour charger un exemple (Gilbert Normand, Line Anctil, etc.)." : ''}</p>
        <div class="card">
          <div class="card-header">Arbre généalogique — ${famille.persons.length} personnes</div>
          <div class="card-body">
            ${renderFamillePanel()}
          </div>
        </div>
      </section>
    </main>
    ${renderTimelineModal()}
    ${renderGalleryModal()}
    ${renderFamillePersonModal()}
  `

  app.querySelectorAll('.admin-nav button[data-panel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentPanel = btn.dataset.panel
      emit()
    })
  })

  const importChrono = document.getElementById('import-chrono')
  if (importChrono) {
    importChrono.onchange = (e) => {
      const f = e.target.files[0]
      if (!f) return
      const r = new FileReader()
      r.onload = () => importJSON('chrono', r.result)
      r.readAsText(f)
      e.target.value = ''
    }
  }
  const importGallery = document.getElementById('import-gallery')
  if (importGallery) {
    importGallery.onchange = (e) => {
      const f = e.target.files[0]
      if (!f) return
      const r = new FileReader()
      r.onload = () => importJSON('galerie', r.result)
      r.readAsText(f)
      e.target.value = ''
    }
  }

  const importTextes = document.getElementById('import-textes')
  if (importTextes) {
    importTextes.onchange = (e) => {
      const f = e.target.files[0]
      if (!f) return
      const r = new FileReader()
      r.onload = () => {
        let content = r.result
        if (f.name.endsWith('.js')) {
          const m = content.match(/export\s+const\s+textsData\s*=\s*([\s\S]+)/)
          if (m) content = m[1].trim()
        }
        importTextsJSON(content)
      }
      r.readAsText(f)
      e.target.value = ''
    }
  }

  if (editTimelineIndex != null) openTimelineModal()
  if (editGalleryIndex != null) openGalleryModal()
  if (editFamillePersonIndex != null) openFamillePersonModal()
}

let dragType = null

function removeDragOverClass() {
  app
    .querySelectorAll('.drag-over')
    .forEach((el) => el.classList.remove('drag-over'))
}

function handleDragStart(e) {
  const row = e.target.closest('.draggable-row')
  if (!row) return
  dragType = row.dataset.dragType
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('application/x-drag-index', row.dataset.dragIndex)
  e.dataTransfer.setData('application/x-drag-type', dragType)
  row.classList.add('dragging')
}

function handleDragOver(e) {
  const row = e.target.closest('.draggable-row')
  if (!row || row.dataset.dragType !== dragType) return
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  removeDragOverClass()
  row.classList.add('drag-over')
}

function handleDrop(e) {
  e.preventDefault()
  removeDragOverClass()
  const row = e.target.closest('.draggable-row')
  if (!row) return
  const fromIndex = parseInt(
    e.dataTransfer.getData('application/x-drag-index'),
    10,
  )
  const toIndex = parseInt(row.dataset.dragIndex, 10)
  const type = e.dataTransfer.getData('application/x-drag-type')
  if (type === 'timeline') reorderTimelineByDrag(fromIndex, toIndex)
  else if (type === 'gallery') reorderGalleryByDrag(fromIndex, toIndex)
}

function handleDragEnd() {
  removeDragOverClass()
  app
    .querySelectorAll('.dragging')
    .forEach((el) => el.classList.remove('dragging'))
  dragType = null
}

async function boot() {
  await checkAuth()
  if (authenticated) await initApi()
  render()
  app.addEventListener('dragstart', handleDragStart)
  app.addEventListener('dragover', handleDragOver)
  app.addEventListener('drop', handleDrop)
  app.addEventListener('dragend', handleDragEnd)
}

window.doLogout = doLogout
window.addFamillePerson = addFamillePerson
window.editFamillePerson = editFamillePerson
window.saveFamillePerson = saveFamillePerson
window.deleteFamillePerson = deleteFamillePerson
window.exportFamille = exportFamille
window.initFamilleWithDefault = initFamilleWithDefault
window.switchFamilleView = switchFamilleView
window.addTimelineEntry = addTimelineEntry
window.editTimelineEntry = editTimelineEntry
window.saveTimelineEntry = saveTimelineEntry
window.deleteTimelineEntry = deleteTimelineEntry
window.moveTimelineEntry = moveTimelineEntry
window.addGalleryImage = addGalleryImage
window.editGalleryImage = editGalleryImage
window.saveGalleryImage = saveGalleryImage
window.deleteGalleryImage = deleteGalleryImage
window.moveGalleryImage = moveGalleryImage
window.exportTexts = exportTexts
window.resetTexts = resetTexts

boot()
