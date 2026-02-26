import './style.css'
import { familleArbreHTML } from './familleArbreContent.js'
import { buildFamilleArbreHTML } from './familleArbreFromData.js'
import { loadData } from './dataLoader.js'
;(async () => {
  const { textsData, familleData } = await loadData()
  const f = textsData.famille || {}
  const footer = textsData.footer || {}
  const safe = (arr, i) => (Array.isArray(arr) ? arr[i] : '') || ''
  const safeMap = (arr, fn) => (Array.isArray(arr) ? arr.map(fn).join('') : '')
  const treeSectionHTML = familleData
    ? buildFamilleArbreHTML(familleData)
    : familleArbreHTML

  document.querySelector('#app').innerHTML = `
  <header role="banner" class="navbar">
    <div class="main-container navbar-container">
      <div class="navbar-row">
        <a href="/" class="nav-logo-link"><img src="/images/logo_gilbert_normand.svg" alt="Gilbert Normand Logo" class="nav-logo" /></a>
        <button type="button" class="nav-menu-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-menu">
          <img src="/images/interface-icon-menu.svg" alt="" class="nav-menu-icon" />
          <img src="/images/interface-icon-cross.svg" alt="" class="nav-menu-icon nav-menu-icon-close" />
        </button>
        <div class="nav-overlay" id="nav-overlay" aria-hidden="true"></div>
        <nav class="navigation-wrap" id="nav-menu" aria-label="Navigation principale">
          <ul class="nav-links navbar-menu">
            <li><a href="/" class="nav-link">Accueil</a></li>
            <li><a href="/#leitmotive" class="nav-link">Parcours</a></li>
            <li><a href="famille.html" class="nav-link w--current" title="Famille & Arbre généalogique"><span class="nav-link-short">Famille</span><span class="nav-link-long">Famille & Arbre généalogique</span></a></li>
            <li><a href="/#timeline" class="nav-link">Chronologie</a></li>
            <li><a href="/#references-externes" class="nav-link">Références externes</a></li>
            <li><a href="galerie.html" class="nav-link">Galerie</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <main id="main-content">
  <section class="hero-section hero-famille-memoire" style="min-height: 50vh; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden;">
    <img src="/images/Gilbert_jeune_01.jpg" alt="" class="hero-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;" />
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(0deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.5) 50%, transparent 100%); z-index: 1;"></div>
    <div class="hero-1-content" style="position: relative; z-index: 2; padding: 60px 24px; text-align: center;">
      <h1 class="heading---h2" style="margin: 0;">${f.heroTitle}</h1>
      <p style="margin: 12px 0 24px; opacity: 0.95; max-width: 560px; margin-left: auto; margin-right: auto;">${f.heroSubtitle}</p>
      <div class="buttons" style="justify-content: center; flex-wrap: wrap; gap: 12px;">
        <a href="#arbre-generations" class="button">${f.heroBtnArbre}</a>
        <a href="#sources" class="button bg-brand">${f.heroBtnSources}</a>
      </div>
    </div>
  </section>

  <section id="intro-famille" class="ej-about-section">
    <div class="ej-container">
      <div class="ej-about-grid">
        <div class="ej-about-column">
          <p class="ej-about-text">${safe(f.introParagraphs, 0)}</p>
        </div>
        <div class="ej-about-column">
          <p class="ej-about-text">${safe(f.introParagraphs, 1)}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="ej-famille-image-section">
    <div class="ej-container">
      <div class="ej-famille-image-wrapper">
        <img src="/images/Clapperton_Normand.jpg" alt="Clapperton Normand - Photo de famille" class="ej-famille-image">
      </div>
    </div>
  </section>

  ${treeSectionHTML}

  <section id="branches-familiales" class="ej-about-section ej-branches-section">
    <div class="ej-container">
      <div class="ej-header">
        <h2 class="ej-title ej-section-title-archival">
          <span class="ej-section-number">Chapitre 03</span>
          <span class="ej-hud-mark"></span>
          ${f.branchesTitle}
        </h2>
        <div class="ej-subtitle ej-military-subtitle">${f.branchesSubtitle}</div>
      </div>
      <div class="ej-about-grid">
        <div class="ej-about-column">
          <h3 class="ej-branches-title">${f.branchPaternelleTitle}</h3>
          ${safeMap(f.branchPaternelleParagraphs, (p) => `<p class="ej-about-text">${p}</p>`)}
        </div>
        <div class="ej-about-column">
          <h3 class="ej-branches-title">${f.branchMaternelleTitle}</h3>
          ${safeMap(f.branchMaternelleParagraphs, (p) => `<p class="ej-about-text">${p}</p>`)}
        </div>
      </div>
      <div class="ej-about-grid ej-branches-grid-secondary">
        <div class="ej-about-column">
          <h3 class="ej-branches-title">${f.vieConjugaleTitle}</h3>
          <p class="ej-about-text">${f.vieConjugaleParagraph}</p>
        </div>
        <div class="ej-about-column">
          <h3 class="ej-branches-title">${f.descendanceTitle}</h3>
          <p class="ej-about-text">${f.descendanceParagraph}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="sources" class="ej-about-section ej-sources-section">
    <div class="ej-container">
      <div class="ej-header">
        <h2 class="ej-title ej-section-title-archival">
          <span class="ej-section-number">Chapitre 04</span>
          <span class="ej-hud-mark"></span>
          ${f.methodologyTitle}
        </h2>
        <div class="ej-subtitle ej-military-subtitle">${f.methodologySubtitle}</div>
      </div>
      <div class="ej-about-grid">
        <div class="ej-about-column">
          <p class="ej-about-text">${safe(f.methodologyParagraphs, 0)}</p>
        </div>
        <div class="ej-about-column">
          <p class="ej-about-text">${safe(f.methodologyParagraphs, 1)}</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="ej-footer">
    <div class="ej-footer-container">
      <div class="ej-footer-grid">
        <div>
          <img src="/images/logo_gilbert_normand.svg" alt="Gilbert Normand" class="ej-footer-logo" />
          <p class="ej-footer-description">${footer.description}</p>
        </div>
        <nav class="ej-footer-section">
          <h3 class="ej-footer-section-title">Navigation</h3>
          <ul class="ej-footer-links">
            <li class="ej-footer-link"><a href="/">Accueil</a></li>
            <li class="ej-footer-link"><a href="/#timeline">Chronologie</a></li>
            <li class="ej-footer-link"><a href="galerie.html">Galerie</a></li>
            <li class="ej-footer-link"><a href="famille.html">Famille & Arbre généalogique</a></li>
          </ul>
        </nav>
      </div>
      <div class="ej-footer-bottom">
        <p class="ej-footer-rights-text">${footer.rightsText}</p>
      </div>
    </div>
  </footer>
  </main>
`
  initMobileMenu()
  addNormandNameClass()
})()

function initMobileMenu() {
  const btn = document.querySelector('.nav-menu-btn')
  const menu = document.getElementById('nav-menu')
  const overlay = document.getElementById('nav-overlay')
  const body = document.body
  if (!btn || !menu) return
  const open = () => {
    menu.classList.add('is-open')
    if (overlay) {
      overlay.classList.add('is-open')
      overlay.setAttribute('aria-hidden', 'false')
    }
    btn.setAttribute('aria-expanded', 'true')
    btn.setAttribute('aria-label', 'Fermer le menu')
    body.classList.add('nav-menu-open')
  }
  const close = () => {
    menu.classList.remove('is-open')
    if (overlay) {
      overlay.classList.remove('is-open')
      overlay.setAttribute('aria-hidden', 'true')
    }
    btn.setAttribute('aria-expanded', 'false')
    btn.setAttribute('aria-label', 'Ouvrir le menu')
    body.classList.remove('nav-menu-open')
  }
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    menu.classList.contains('is-open') ? close() : open()
  })
  if (overlay) overlay.addEventListener('click', close)
  document
    .querySelectorAll('#nav-menu a')
    .forEach((a) => a.addEventListener('click', close))
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) close()
  })
}

function addNormandNameClass() {
  document.querySelectorAll('.ej-stammbaum-person-card').forEach((card) => {
    const nameEl = card.querySelector('.ej-stammbaum-person-name')
    if (nameEl && nameEl.textContent.trim().endsWith('Normand')) {
      card.classList.add('has-normand-name')
    }
  })
}
