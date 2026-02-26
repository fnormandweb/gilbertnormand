import './style.css'
import { loadData } from './dataLoader.js'
;(async () => {
  const { galleryImages, textsData } = await loadData()
  const gal = textsData.galerie || {}
  const footer = textsData.footer || {}

  const galleryGridHTML = galleryImages
    .map(
      (img, i) => `
    <button type="button" class="gallery-card" data-index="${i}" aria-label="Voir ${img.alt}">
      <img src="${img.src}" alt="${img.alt}" class="gallery-card-image" loading="lazy" />
    </button>`,
    )
    .join('')

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
            <li><a href="famille.html" class="nav-link" title="Famille & Arbre généalogique"><span class="nav-link-short">Famille</span><span class="nav-link-long">Famille & Arbre généalogique</span></a></li>
            <li><a href="/#timeline" class="nav-link">Chronologie</a></li>
            <li><a href="/#references-externes" class="nav-link">Références externes</a></li>
            <li><a href="galerie.html" class="nav-link w--current">Galerie</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <main id="main-content">
    <section id="galerie" class="ej-gallery-section">
      <div class="ej-gallery-container">
        <div class="ej-gallery-header">
          <h1 class="ej-gallery-title ej-section-title-archival">
            <span class="ej-section-number">Chapitre 04</span>
            ${gal.title}
          </h1>
          <p class="ej-gallery-subtitle ej-military-subtitle">${gal.subtitle}</p>
        </div>
        <div class="ej-gallery-grid">
          ${galleryGridHTML}
        </div>
      </div>

      <div class="ej-gallery-lightbox" id="gallery-lightbox" aria-hidden="true" aria-modal="true" role="dialog" aria-label="Vue agrandie de l'image">
        <button type="button" class="ej-gallery-lightbox-close" aria-label="Fermer">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="ej-gallery-lightbox-counter" id="gallery-lightbox-counter">1 / ${galleryImages.length}</div>
        <button type="button" class="ej-gallery-lightbox-nav ej-gallery-lightbox-prev" aria-label="Image précédente">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
            <polyline points="15,18 9,12 15,6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="ej-gallery-lightbox-nav ej-gallery-lightbox-next" aria-label="Image suivante">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
            <polyline points="9,18 15,12 9,6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="ej-gallery-lightbox-content">
          <img src="" alt="" class="ej-gallery-lightbox-image" id="gallery-lightbox-image" />
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
  initGalleryLightbox(galleryImages)
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
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close))
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) close()
  })
}

function initGalleryLightbox(galleryImages) {
  const lightbox = document.getElementById('gallery-lightbox')
  const lightboxImg = document.getElementById('gallery-lightbox-image')
  const counterEl = document.getElementById('gallery-lightbox-counter')
  const closeBtn = lightbox?.querySelector('.ej-gallery-lightbox-close')
  const prevBtn = lightbox?.querySelector('.ej-gallery-lightbox-prev')
  const nextBtn = lightbox?.querySelector('.ej-gallery-lightbox-next')
  const cards = document.querySelectorAll('.gallery-card')

  if (!lightbox || !lightboxImg || !counterEl || !galleryImages?.length) return

  let currentIndex = 0

  function show(index) {
    currentIndex =
      ((index % galleryImages.length) + galleryImages.length) %
      galleryImages.length
    const item = galleryImages[currentIndex]
    lightboxImg.src = item.src
    lightboxImg.alt = item.alt
    counterEl.textContent = `${currentIndex + 1} / ${galleryImages.length}`
    lightbox.classList.add('is-open')
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.classList.add('gallery-lightbox-open')
    closeBtn?.focus()
  }

  function hide() {
    lightbox.classList.remove('is-open')
    lightbox.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('gallery-lightbox-open')
  }

  function goPrev() {
    show(currentIndex - 1)
  }
  function goNext() {
    show(currentIndex + 1)
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => show(i))
  })
  closeBtn?.addEventListener('click', hide)
  prevBtn?.addEventListener('click', goPrev)
  nextBtn?.addEventListener('click', goNext)

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hide()
  })
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return
    if (e.key === 'Escape') hide()
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'ArrowRight') goNext()
  })
}
