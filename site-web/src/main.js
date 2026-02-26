import './style.css'
import { loadData } from './dataLoader.js'

const LEITMOTIVE_ICONS = [
  '/images/icons/icon_medical.svg',
  '/images/icons/icon_punlique.svg',
  '/images/icons/icon_Passport.svg',
  '/images/icons/icon_marine.svg',
]

let timelineData = []
let textsData = { home: {}, famille: {}, galerie: {}, footer: {} }

function render() {
  const t = textsData.home
  const footer = textsData.footer
  const refCardsHTML = t.referenceCards
    .map((card, i) => {
      const linksHTML =
        card.links.length === 1
          ? `<a href="${card.links[0].url}" target="_blank" rel="noopener noreferrer" class="ej-reference-button">${card.links[0].text} <span class="sr-only">(ouvre dans un nouvel onglet)</span> <svg class="ej-reference-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></a>`
          : '<div class="ej-reference-links">' +
            card.links
              .map(
                (l) =>
                  `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="ej-reference-button">${l.text} <span class="sr-only">(ouvre dans un nouvel onglet)</span> <svg class="ej-reference-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></a>`,
              )
              .join('') +
            '</div>'
      const iconD =
        i === 0
          ? '<path d="M4 6h16M4 12h16M4 18h16"/>'
          : '<path d="M3 21h18M3 7h18M7 3v4M17 3v4M5 11h14M5 15h14"/>'
      return `<div class="ej-reference-card"><div class="ej-reference-header"><svg class="ej-reference-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${iconD}</svg><h3 class="ej-reference-title">${card.title}</h3></div><p class="ej-reference-description">${card.description}</p>${linksHTML}</div>`
    })
    .join('')
  const leitmotiveCardsHTML = t.leitmotiveCards
    .map(
      (card, i) =>
        `<div class="ej-leitmotive-card"><h3 class="ej-leitmotive-card-title"><img src="${LEITMOTIVE_ICONS[i]}" alt="" width="28" height="28" /> ${card.title}</h3><p class="ej-leitmotive-card-desc">${card.description}</p></div>`,
    )
    .join('')
  const aboutCol1 = t.aboutParagraphs
    .slice(0, 3)
    .map((p) => `<p class="ej-about-text">${p}</p>`)
    .join('')
  const aboutCol2 = t.aboutParagraphs
    .slice(3)
    .map((p) => `<p class="ej-about-text">${p}</p>`)
    .join('')
  const app = document.querySelector('#app')
  app.innerHTML = `
    <header role="banner" class="navbar">
      <div class="main-container navbar-container">
        <div class="navbar-row">
          <a href="/" class="nav-logo-link" aria-current="page">
            <img src="/images/logo_gilbert_normand.svg" alt="Gilbert Normand Logo" class="nav-logo" />
          </a>
          <button type="button" class="nav-menu-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-menu">
            <img src="/images/interface-icon-menu.svg" alt="" class="nav-menu-icon" />
            <img src="/images/interface-icon-cross.svg" alt="" class="nav-menu-icon nav-menu-icon-close" />
          </button>
          <div class="nav-overlay" id="nav-overlay" aria-hidden="true"></div>
          <nav class="navigation-wrap" id="nav-menu" aria-label="Navigation principale">
            <ul class="nav-links navbar-menu">
              <li><a href="/" class="nav-link w--current">Accueil</a></li>
              <li><a href="#leitmotive" class="nav-link">Parcours</a></li>
              <li><a href="famille.html" class="nav-link" title="Famille & Arbre généalogique"><span class="nav-link-short">Famille</span><span class="nav-link-long">Famille & Arbre généalogique</span></a></li>
              <li><a href="#timeline" class="nav-link">Chronologie</a></li>
              <li><a href="#references-externes" class="nav-link">Références externes</a></li>
              <li>
                <div class="nav-dropdown">
                  <button type="button" class="dropdown-toggle" aria-expanded="false" aria-haspopup="true">
                    <span class="text-block-7">Médias</span>
                    <img src="/images/icon-caret-down.svg" alt="" class="dropdown-caret" />
                  </button>
                  <div class="dropdown-wrap" hidden>
                    <a href="galerie.html" class="dropdown-link">Galerie</a>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main id="main-content">
    <section class="hero-section hero-slider" role="region" aria-roledescription="carousel" aria-label="Portraits de Gilbert Normand">
      <div class="hero-mobile-image">
        <img class="hero-bg" src="/images/header_Gilbert_Normand_assermentation.jpg" alt="Gilbert Normand - Assermentation" />
        <div class="hero-smoke-overlay"></div>
      </div>
        <div class="hero-slider-container">
        <div class="hero-slide active" data-slide="0" aria-current="true" aria-hidden="false">
          <img class="hero-bg" src="/images/header_gilbert1.jpg" alt="Gilbert Normand - Portrait officiel" />
          <div class="hero-smoke-overlay"></div>
        </div>
        <div class="hero-slide" data-slide="1" aria-current="false" aria-hidden="true">
          <img class="hero-bg" src="/images/header_Line_Anctil_Gilbert_Normand.jpg" alt="Line Anctil et Gilbert Normand" />
          <div class="hero-smoke-overlay"></div>
        </div>
        <div class="hero-slide" data-slide="2" aria-current="false" aria-hidden="true">
          <img class="hero-bg" src="/images/header_jean_paul_riopelle_gilbert_normand.jpg" alt="Gilbert Normand avec Jean-Paul Riopelle" />
          <div class="hero-smoke-overlay"></div>
        </div>
      </div>
      <div class="hero-slider-indicators" role="tablist" aria-label="Choisir une image du carrousel">
        <button type="button" class="hero-slider-indicator active" role="tab" aria-selected="true" aria-label="Image 1 sur 3 : Portrait officiel" data-slide="0"></button>
        <button type="button" class="hero-slider-indicator" role="tab" aria-selected="false" aria-label="Image 2 sur 3 : Line Anctil et Gilbert Normand" data-slide="1"></button>
        <button type="button" class="hero-slider-indicator" role="tab" aria-selected="false" aria-label="Image 3 sur 3 : Gilbert Normand et Jean-Paul Riopelle" data-slide="2"></button>
      </div>
      <div class="hero-1-content">
        <div class="title hero-1-title">
          <h1 class="heading---h2"><strong class="bold-text">${t.heroTitle}</strong></h1>
          <div>${t.heroSubtitle}</div>
        </div>
        <div class="buttons">
          <a href="#timeline" class="button">${t.heroBtnChrono}</a>
          <a href="#leitmotive" class="button bg-brand">${t.heroBtnParcours}</a>
        </div>
      </div>
    </section>

    <section id="a-propos" class="ej-about-section">
      <div class="ej-container">
        <div class="ej-header">
          <h2 class="ej-title ej-section-title-archival">
            <span class="ej-section-number">Chapitre 00</span>
            ${t.aboutTitle}
          </h2>
          <div class="ej-subtitle ej-military-subtitle">${t.aboutSubtitle}</div>
        </div>
        <div class="ej-about-grid">
          <div class="ej-about-column">${aboutCol1}</div>
          <div class="ej-about-column">${aboutCol2}</div>
        </div>
      </div>
    </section>

    <section id="leitmotive" class="ej-leitmotive-section">
      <div class="ej-container">
        <div class="ej-leitmotive-header">
          <h2 class="ej-section-title-archival"><span class="ej-section-number">Chapitre 01</span> ${t.leitmotiveTitle}</h2>
          <p class="ej-military-subtitle">${t.leitmotiveSubtitle}</p>
        </div>
        <div class="ej-leitmotive-grid">${leitmotiveCardsHTML}</div>
      </div>
    </section>

    <section id="timeline" class="ej-timeline-section">
      <div class="ej-container">
        <div class="ej-header">
          <h2 class="ej-title ej-section-title-archival"><span class="ej-section-number">Chapitre 02</span> ${t.timelineTitle}</h2>
          <div class="ej-subtitle ej-military-subtitle">${t.timelineSubtitle}</div>
        </div>
        <div class="ej-timeline-intro">
          <p>${t.timelineIntro}</p>
        </div>
        <div class="timeline-container" role="region" aria-label="Chronologie de Gilbert Normand"></div>
      </div>
    </section>

    <section id="references-externes" class="ej-references-section">
      <div class="ej-container">
        <div class="ej-header">
          <h2 class="ej-title ej-section-title-archival"><span class="ej-section-number">Chapitre 05</span> ${t.referencesTitle}</h2>
          <div class="ej-subtitle ej-military-subtitle">${t.referencesSubtitle}</div>
        </div>
        <div class="ej-references-grid">${refCardsHTML}</div>
      </div>
    </section>

    <section id="citations-humanistes" class="citations-section" aria-labelledby="citations-title" aria-live="polite" aria-atomic="true">
      <div class="citations-inner">
        <h2 id="citations-title" class="citations-title">${t.citationsTitle}</h2>
        <figure class="citation-active">
          <blockquote id="citation-texte"></blockquote>
          <figcaption id="citation-auteur"></figcaption>
        </figure>
      </div>
    </section>

    </main>

    <footer class="ej-footer" role="contentinfo">
      <div class="ej-footer-container">
        <div class="ej-footer-grid">
          <div>
            <img src="/images/logo_gilbert_normand.svg" alt="Gilbert Normand" class="ej-footer-logo" />
            <p class="ej-footer-description">${footer.description}</p>
          </div>
          <nav class="ej-footer-section" aria-label="Navigation">
            <h3 class="ej-footer-section-title">Navigation</h3>
            <ul class="ej-footer-links">
              <li class="ej-footer-link"><a href="/">Accueil</a></li>
              <li class="ej-footer-link"><a href="#leitmotive">Parcours</a></li>
              <li class="ej-footer-link"><a href="#timeline">Chronologie</a></li>
              <li class="ej-footer-link"><a href="galerie.html">Galerie</a></li>
              <li class="ej-footer-link"><a href="famille.html">Famille & Arbre généalogique</a></li>
              <li class="ej-footer-link"><a href="#references-externes">Références externes</a></li>
            </ul>
          </nav>
          <nav class="ej-footer-section" aria-label="Plan du site">
            <h3 class="ej-footer-section-title">Plan du site</h3>
            <ul class="ej-footer-links">
              <li class="ej-footer-link"><a href="/">Toutes les pages</a></li>
            </ul>
          </nav>
        </div>
        <div class="ej-footer-bottom">
          <p class="ej-footer-rights-text">${footer.rightsText}</p>
        </div>
      </div>
    </footer>
  `
}

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide')
  const indicators = document.querySelectorAll('.hero-slider-indicator')
  if (!slides.length) return
  let current = 0
  let sliderTimer = null

  function goTo(i) {
    current = (i + slides.length) % slides.length
    slides.forEach((s, k) => {
      s.classList.toggle('active', k === current)
      s.setAttribute('aria-current', k === current ? 'true' : 'false')
      s.setAttribute('aria-hidden', k !== current ? 'true' : 'false')
    })
    indicators.forEach((ind, k) => {
      ind.classList.toggle('active', k === current)
      ind.setAttribute('aria-selected', k === current ? 'true' : 'false')
    })
  }

  function startTimer() {
    if (sliderTimer) clearInterval(sliderTimer)
    sliderTimer = setInterval(() => goTo(current + 1), 6000)
  }

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => goTo(i))
    ind.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') goTo(current + 1)
      else if (e.key === 'ArrowLeft') goTo(current - 1)
    })
  })

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startTimer()
  }
}

function createTimelineItem(item, index) {
  const isEven = index % 2 === 0
  const sideClass = isEven ? 'timeline-item--left' : 'timeline-item--right'
  let imageHTML = ''
  if (item.image) {
    const w = item.image.width || 800
    const h = item.image.height || 450
    const isPortrait = h > w
    const alignTop = item.image.position === 'top' || isPortrait
    const imgClass =
      'timeline-item-img' + (alignTop ? ' timeline-item-img--top' : '')
    imageHTML = `<div class="timeline-item-image"><img src="${item.image.url}" alt="${item.image.alt || item.title}" class="${imgClass}" loading="lazy" width="${w}" height="${h}" /></div>`
  }
  let categoryHTML = item.category
    ? `<span class="timeline-item-category">${item.category}</span>`
    : ''
  let linksHTML = ''
  if (item.links && item.links.length) {
    linksHTML =
      '<div class="timeline-item-links">' +
      item.links
        .map(
          (l) =>
            `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="timeline-item-link">${l.text}<span class="sr-only"> (ouvre dans un nouvel onglet)</span></a>`,
        )
        .join('') +
      '</div>'
  }
  const year = (item.dateLabel.match(/\d{4}/) || [])[0] || ''
  return `
    <article class="timeline-item ${sideClass}" data-index="${index}">
      <div class="timeline-item-marker" aria-hidden="true"></div>
      <div class="timeline-item-content">
        ${imageHTML}
        <time class="timeline-item-date" datetime="${year}">${item.dateLabel}</time>
        <h3 class="timeline-item-title">${item.title}</h3>
        ${categoryHTML}
        <p class="timeline-item-summary">${item.summary}</p>
        ${linksHTML}
      </div>
    </article>
  `
}

function initTimeline() {
  const container = document.querySelector('.timeline-container')
  if (!container) return
  let html = '<div class="timeline-axis"></div><div class="timeline-items">'
  timelineData.forEach((item, i) => {
    html += createTimelineItem(item, i)
  })
  html += '</div>'
  container.innerHTML = html

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  const items = container.querySelectorAll('.timeline-item')
  if (prefersReduced) {
    items.forEach((el) => el.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 },
  )
  items.forEach((el) => observer.observe(el))
}

function initCitations() {
  const texte = document.getElementById('citation-texte')
  const auteur = document.getElementById('citation-auteur')
  const block = document.querySelector('.citation-active')
  if (!texte || !auteur || !block) return
  let idx = -1
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  const citations = textsData.home.citations
  function show() {
    if (citations.length > 1) {
      let n
      do {
        n = Math.floor(Math.random() * citations.length)
      } while (n === idx)
      idx = n
    } else {
      idx = 0
    }
    block.classList.remove('is-visible')
    requestAnimationFrame(() => {
      texte.textContent = citations[idx].text
      auteur.textContent = '— ' + citations[idx].author
      requestAnimationFrame(() => block.classList.add('is-visible'))
    })
  }
  show()
  if (!prefersReducedMotion) {
    setInterval(show, 9000)
  }
}

function initDropdown() {
  document.querySelectorAll('.nav-dropdown').forEach((wrap) => {
    const toggle = wrap.querySelector('.dropdown-toggle')
    const list = wrap.querySelector('.dropdown-wrap')
    if (!toggle || !list) return
    const close = () => {
      list.hidden = true
      toggle.setAttribute('aria-expanded', 'false')
    }
    const open = () => {
      list.hidden = false
      toggle.setAttribute('aria-expanded', 'true')
    }
    toggle.addEventListener('click', (e) => {
      e.stopPropagation()
      if (list.hidden) open()
      else close()
    })
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close()
    })
    document.addEventListener('click', () => close())
    wrap.addEventListener('click', (e) => e.stopPropagation())
  })
}

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
  const toggle = () => (menu.classList.contains('is-open') ? close() : open())

  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    toggle()
  })
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
  if (overlay) overlay.addEventListener('click', close)

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => close())
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) close()
  })
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href')
    if (id === '#') return
    const el = document.querySelector(id)
    if (el) {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href')
        if (href.startsWith('#')) {
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  })
}

;(async () => {
  const data = await loadData()
  timelineData = data.timelineData
  textsData = data.textsData
  render()
  initHeroSlider()
  initTimeline()
  initCitations()
  initDropdown()
  initMobileMenu()
  initSmoothScroll()
})()
