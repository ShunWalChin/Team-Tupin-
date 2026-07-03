const root = document.documentElement
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const animeRuntime = window.anime || {}
const animateApi = typeof animeRuntime.animate === "function" ? animeRuntime.animate : null
const timelineApi = typeof animeRuntime.createTimeline === "function" ? animeRuntime.createTimeline : null
const staggerApi = typeof animeRuntime.stagger === "function" ? animeRuntime.stagger : null
const legacyAnime = typeof window.anime === "function" ? window.anime : null
const motionSetting = new URLSearchParams(window.location.search).get("motion")
const motionForced = motionSetting === "on"
const motionDisabled = motionSetting === "off"
const motionEnabled = Boolean((animateApi || legacyAnime) && !motionDisabled && (!prefersReducedMotion.matches || motionForced))

const INSTAGRAM_INDEX_URL = "./instagram-posts.json"
const INSTAGRAM_POST_URLS = []
const MOBILE_NAV_BREAKPOINT = 1180

const qs = (selector, scope = document) => scope.querySelector(selector)
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)]
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

root.classList.toggle("motion-enhanced", motionEnabled)
root.dataset.motionEngine = animateApi || legacyAnime
  ? motionDisabled
    ? "animejs-off"
    : prefersReducedMotion.matches && !motionForced
    ? "animejs-reduced"
    : "animejs"
  : "fallback"

function toElements(targets) {
  if (!targets) return []
  if (typeof targets === "string") return qsa(targets)
  if (targets instanceof Element) return [targets]
  return [...targets].filter((item) => item instanceof Element)
}

function setVisible(targets) {
  toElements(targets).forEach((element) => element.classList.add("is-visible"))
}

function motion(targets, params = {}, options = {}) {
  const elements = toElements(targets)
  if (!elements.length) return

  if (!motionEnabled) {
    setVisible(elements)
    return
  }

  const baseDelay = options.delay || 0
  const stepDelay = options.stagger || 0
  const duration = options.duration || 620
  const ease = options.ease || options.easing || "out(3)"
  const legacyEasing = options.legacyEasing || "easeOutCubic"

  elements.forEach((element, index) => {
    const delay = baseDelay + index * stepDelay

    if (animateApi) {
      const { easing, ...cleanParams } = params
      animateApi(element, { ...cleanParams, duration, ease: params.ease || easing || ease, delay })
      return
    }

    legacyAnime({
      targets: element,
      ...params,
      duration,
      easing: legacyEasing,
      delay,
    })
  })
}

function loopMotion(targets, params = {}) {
  const elements = toElements(targets)
  if (!elements.length || !motionEnabled) return

  if (animateApi) {
    animateApi(elements, params)
    return
  }

  legacyAnime({
    targets: elements,
    easing: "linear",
    ...params,
  })
}

function setStaticProgressBars() {
  qsa("[data-progress]").forEach((bar) => {
    bar.style.width = `${bar.dataset.progress}%`
  })
}

function syncHeader() {
  const header = qs(".site-header")
  const progress = qs(".scroll-progress span")
  if (!header && !progress) return

  const update = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    const percent = clamp(window.scrollY / maxScroll, 0, 1)
    header?.classList.toggle("is-scrolled", window.scrollY > 12)
    if (progress) progress.style.transform = `scaleX(${percent})`
  }

  update()
  window.addEventListener("scroll", update, { passive: true })
  window.addEventListener("resize", update)
}

function setupMenu() {
  const toggle = qs(".menu-toggle")
  const nav = qs(".site-nav")
  if (!toggle || !nav) return

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open)
    toggle.setAttribute("aria-expanded", String(open))
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu")
  }

  toggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"))
  })

  qsa("a[href^='#']", nav).forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= MOBILE_NAV_BREAKPOINT) setMenu(false)
    })
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_NAV_BREAKPOINT) setMenu(false)
  })
}

function setupActiveNavigation() {
  const links = qsa(".site-nav a[href^='#']")
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")
      const target = id && id !== "#" ? qs(id) : null
      return target ? { link, target } : null
    })
    .filter(Boolean)

  if (!sections.length || !("IntersectionObserver" in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (!visible) return

      sections.forEach(({ link, target }) => {
        link.classList.toggle("is-active", target === visible.target)
      })
    },
    {
      rootMargin: "-28% 0px -58% 0px",
      threshold: [0.12, 0.22, 0.36],
    },
  )

  sections.forEach(({ target }) => observer.observe(target))
}

function setupRevealMotion() {
  const revealItems = qsa(".reveal")
  if (!revealItems.length) return

  if (!motionEnabled) {
    setVisible(revealItems)
    return
  }

  if (!("IntersectionObserver" in window)) {
    setVisible(revealItems)
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const element = entry.target
        observer.unobserve(element)
        element.classList.add("is-visible")
        motion(element, { opacity: [0, 1], translateY: [26, 0], filter: ["blur(8px)", "blur(0px)"] }, { duration: 720 })
      })
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16,
    },
  )

  revealItems.forEach((item) => observer.observe(item))
}

function setupHeroMotion() {
  const hero = qs(".hero-section")
  if (!hero) return

  const titleLines = qsa(".hero-copy-block h1 span", hero)
  const introItems = [
    qs(".hero-copy-block .eyebrow", hero),
    qs(".hero-text", hero),
    ...qsa(".hero-actions a", hero),
    qs(".hero-value-band", hero),
    ...qsa(".hero-pill", hero),
  ].filter(Boolean)

  const visualItems = [
    qs(".hero-clean-panel", hero),
    qs(".hero-panel-status", hero),
    qs(".hero-photo-card", hero),
    ...qsa(".hero-chip", hero),
    ...qsa(".dashboard-card", hero),
  ].filter(Boolean)

  if (!motionEnabled) {
    setVisible([hero, ...titleLines, ...introItems, ...visualItems])
    return
  }

  motion(titleLines, { opacity: [0, 1], translateY: [42, 0], scale: [0.96, 1] }, { delay: 60, stagger: 86, duration: 820, ease: "out(4)" })
  motion(introItems, { opacity: [0, 1], translateY: [24, 0] }, { delay: 300, stagger: 58, duration: 720, ease: "out(3)" })
  motion(visualItems, { opacity: [0, 1], scale: [0.94, 1], translateY: [34, 0] }, { delay: 380, stagger: 72, duration: 820, ease: "out(4)" })

  motion(qs(".hero-line-accent", hero), {
    textShadow: ["0 0 0 rgba(102,255,137,0)", "0 0 30px rgba(102,255,137,0.28)"],
  }, { delay: 900, duration: 900, ease: "out(3)" })

  loopMotion(qs(".hero-photo-scan", hero), {
    translateY: ["-36px", "430px"],
    opacity: [0, 0.86, 0],
    duration: 4200,
    delay: 1200,
    loop: true,
    ease: "linear",
  })

  loopMotion(qs(".hero-motion-aura", hero), {
    scale: [0.94, 1.18, 0.94],
    opacity: [0.22, 0.46, 0.22],
    duration: 5200,
    delay: 800,
    loop: true,
    ease: "inOut(2)",
  })

  loopMotion(qs(".hero-status-dot", hero), {
    scale: [1, 1.55, 1],
    opacity: [0.72, 1, 0.72],
    duration: 2200,
    loop: true,
    ease: "inOut(2)",
  })
}

function setupHeroInteraction() {
  const hero = qs(".hero-section")
  if (!hero) return

  const pills = qsa(".hero-pill", hero)
  const chips = qsa(".hero-chip", hero)
  const panel = qs(".hero-clean-panel", hero)
  const photo = qs(".hero-photo-card", hero)
  let pillIndex = 0
  let chipIndex = 0
  let pillTimer = null
  let chipTimer = null
  let isPaused = false

  const activateGroup = (items, index, animate = true) => {
    if (!items.length) return 0
    const normalizedIndex = ((index % items.length) + items.length) % items.length

    items.forEach((item, itemIndex) => {
      const active = itemIndex === normalizedIndex
      item.classList.toggle("is-active", active)
      item.setAttribute("aria-pressed", String(active))
    })

    if (animate && motionEnabled) {
      motion(items[normalizedIndex], {
        scale: [0.96, 1.04, 1],
      }, { duration: 420, ease: "out(4)" })
    }

    return normalizedIndex
  }

  const pauseAuto = () => {
    isPaused = true
  }

  const resumeAuto = () => {
    isPaused = false
  }

  const bindGroup = (items, setIndex) => {
    items.forEach((item, itemIndex) => {
      item.addEventListener("click", () => {
        pauseAuto()
        setIndex(activateGroup(items, itemIndex))
      })
      item.addEventListener("focus", pauseAuto)
      item.addEventListener("blur", resumeAuto)
    })
  }

  bindGroup(pills, (index) => {
    pillIndex = index
  })

  bindGroup(chips, (index) => {
    chipIndex = index
  })

  if (motionEnabled && pills.length) {
    pillTimer = window.setInterval(() => {
      if (!isPaused && !document.hidden) pillIndex = activateGroup(pills, pillIndex + 1)
    }, 3600)
  }

  if (motionEnabled && chips.length) {
    chipTimer = window.setInterval(() => {
      if (!isPaused && !document.hidden) chipIndex = activateGroup(chips, chipIndex + 1)
    }, 2600)
  }

  hero.addEventListener("pointerenter", pauseAuto)
  hero.addEventListener("pointerleave", resumeAuto)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (pillTimer) window.clearInterval(pillTimer)
      if (chipTimer) window.clearInterval(chipTimer)
      pillTimer = null
      chipTimer = null
      return
    }

    if (motionEnabled && pills.length && !pillTimer) {
      pillTimer = window.setInterval(() => {
        if (!isPaused) pillIndex = activateGroup(pills, pillIndex + 1)
      }, 3600)
    }

    if (motionEnabled && chips.length && !chipTimer) {
      chipTimer = window.setInterval(() => {
        if (!isPaused) chipIndex = activateGroup(chips, chipIndex + 1)
      }, 2600)
    }
  })

  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches
  if (!panel || !photo || !motionEnabled || !supportsFinePointer) return

  panel.addEventListener("pointermove", (event) => {
    const rect = panel.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    panel.classList.add("is-interacting")
    panel.style.setProperty("--hero-tilt-x", `${clamp(-y * 5.2, -5.2, 5.2)}deg`)
    panel.style.setProperty("--hero-tilt-y", `${clamp(x * 5.2, -5.2, 5.2)}deg`)
    photo.style.setProperty("--hero-photo-x", `${clamp(x * 8, -8, 8)}px`)
    photo.style.setProperty("--hero-photo-y", `${clamp(y * 8, -8, 8)}px`)
  }, { passive: true })

  panel.addEventListener("pointerleave", () => {
    panel.classList.remove("is-interacting")
    panel.style.setProperty("--hero-tilt-x", "0deg")
    panel.style.setProperty("--hero-tilt-y", "0deg")
    photo.style.setProperty("--hero-photo-x", "0px")
    photo.style.setProperty("--hero-photo-y", "0px")
  }, { passive: true })
}

function setupTouchFeedback() {
  qsa("a, button, .instagram-post").forEach((element) => {
    element.addEventListener("pointerdown", () => element.classList.add("is-pressing"), { passive: true })
    element.addEventListener("pointerup", () => element.classList.remove("is-pressing"), { passive: true })
    element.addEventListener("pointercancel", () => element.classList.remove("is-pressing"), { passive: true })
    element.addEventListener("pointerleave", () => element.classList.remove("is-pressing"), { passive: true })
  })
}

function normalizeInstagramPostUrl(url) {
  try {
    const parsedUrl = new URL(url)
    const isInstagram = /(^|\.)instagram\.com$/i.test(parsedUrl.hostname)
    const [, type, code] = parsedUrl.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?/) || []
    if (!isInstagram || !type || !code) return null
    return `https://www.instagram.com/${type}/${code}/`
  } catch {
    return null
  }
}

async function loadInstagramPostUrls() {
  const inlineUrls = Array.isArray(INSTAGRAM_POST_URLS) ? INSTAGRAM_POST_URLS : []

  try {
    const response = await fetch(INSTAGRAM_INDEX_URL, { cache: "no-store" })
    if (!response.ok) return inlineUrls
    const index = await response.json()
    const indexedUrls = Array.isArray(index) ? index : index.posts
    return Array.isArray(indexedUrls) ? [...inlineUrls, ...indexedUrls] : inlineUrls
  } catch {
    return inlineUrls
  }
}

function loadInstagramEmbedScript() {
  return new Promise((resolve) => {
    if (window.instgrm?.Embeds?.process) {
      resolve()
      return
    }

    const existingScript = qs("script[src='https://www.instagram.com/embed.js']")
    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true })
      existingScript.addEventListener("error", resolve, { once: true })
      window.setTimeout(resolve, 3200)
      return
    }

    const script = document.createElement("script")
    script.src = "https://www.instagram.com/embed.js"
    script.async = true
    script.onload = resolve
    script.onerror = resolve
    window.setTimeout(resolve, 3200)
    document.body.append(script)
  })
}

function normalizeInstagramEmbedFrames(scope = document) {
  qsa(".instagram-post iframe, .instagram-modal-frame iframe", scope).forEach((frame) => {
    const holder = frame.closest(".instagram-post, .instagram-modal-frame")
    const holderStyles = holder ? window.getComputedStyle(holder) : null
    const verticalPadding = holderStyles
      ? Number.parseFloat(holderStyles.paddingTop) + Number.parseFloat(holderStyles.paddingBottom)
      : 0
    const targetHeight = holder ? Math.max(360, holder.clientHeight - verticalPadding) : 460

    frame.setAttribute("height", String(Math.round(targetHeight)))
    frame.style.setProperty("width", "100%", "important")
    frame.style.setProperty("height", `${Math.round(targetHeight)}px`, "important")
    frame.style.setProperty("max-width", "100%", "important")
    frame.style.setProperty("margin", "0", "important")
  })
}

function createInstagramBlockquote(postUrl) {
  const embed = document.createElement("blockquote")
  embed.className = "instagram-media"
  embed.dataset.instgrmPermalink = postUrl
  embed.dataset.instgrmVersion = "14"

  const fallback = document.createElement("a")
  fallback.href = postUrl
  fallback.target = "_blank"
  fallback.rel = "noopener noreferrer"
  fallback.textContent = "Ver publicação no Instagram"

  embed.append(fallback)
  return embed
}

function ensureInstagramModal() {
  let modal = qs("[data-instagram-modal]")
  if (modal) return modal

  modal = document.createElement("div")
  modal.className = "instagram-modal"
  modal.dataset.instagramModal = ""
  modal.setAttribute("role", "dialog")
  modal.setAttribute("aria-modal", "true")
  modal.setAttribute("aria-label", "Visualização ampliada do post do Instagram")
  modal.innerHTML = `
    <button class="instagram-modal-backdrop" type="button" data-instagram-close aria-label="Fechar visualização"></button>
    <div class="instagram-modal-panel">
      <div class="instagram-modal-top">
        <strong>Post do Instagram</strong>
        <button class="instagram-modal-close" type="button" data-instagram-close aria-label="Fechar">×</button>
      </div>
      <div class="instagram-modal-frame" data-instagram-modal-frame></div>
      <a class="instagram-modal-link" href="#" target="_blank" rel="noopener noreferrer" data-instagram-modal-link>Ver no Instagram</a>
    </div>
  `

  document.body.append(modal)

  qsa("[data-instagram-close]", modal).forEach((button) => {
    button.addEventListener("click", closeInstagramModal)
  })

  return modal
}

function openInstagramModal(postUrl) {
  const modal = ensureInstagramModal()
  const frame = qs("[data-instagram-modal-frame]", modal)
  const link = qs("[data-instagram-modal-link]", modal)

  frame.replaceChildren(createInstagramBlockquote(postUrl))
  link.href = postUrl
  document.body.classList.add("modal-open")
  modal.classList.add("is-open")
  qs(".instagram-modal-close", modal)?.focus({ preventScroll: true })

  loadInstagramEmbedScript().then(() => {
    window.instgrm?.Embeds?.process?.()
    window.setTimeout(() => normalizeInstagramEmbedFrames(modal), 900)
    window.setTimeout(() => normalizeInstagramEmbedFrames(modal), 2200)
  })

  motion(qs(".instagram-modal-panel", modal), { opacity: [0, 1], scale: [0.88, 1], translateY: [26, 0] }, { duration: 420 })
}

function closeInstagramModal() {
  const modal = qs("[data-instagram-modal]")
  if (!modal) return

  const finish = () => {
    modal.classList.remove("is-open")
    document.body.classList.remove("modal-open")
    qs("[data-instagram-modal-frame]", modal)?.replaceChildren()
  }

  if (!motionEnabled) {
    finish()
    return
  }

  const panel = qs(".instagram-modal-panel", modal)
  motion(panel, { opacity: [1, 0], scale: [1, 0.94], translateY: [0, 20] }, { duration: 220 })
  window.setTimeout(finish, 210)
}

async function renderInstagramFeed() {
  const feed = qs("[data-instagram-feed]")
  if (!feed) return

  const sourceUrls = await loadInstagramPostUrls()
  const limit = Number.parseInt(feed.dataset.instagramLimit || "", 10)
  const normalizedUrls = [...new Set(sourceUrls.map(normalizeInstagramPostUrl).filter(Boolean))]
  const postUrls = Number.isFinite(limit) && limit > 0 ? normalizedUrls.slice(0, limit) : normalizedUrls

  if (!postUrls.length) return

  qs("[data-instagram-empty]", feed)?.remove()

  const fragment = document.createDocumentFragment()
  postUrls.forEach((postUrl, index) => {
    const article = document.createElement("article")
    article.className = "instagram-post reveal"
    article.dataset.instagramPost = postUrl
    article.style.setProperty("--post-index", index)

    const embedWrap = document.createElement("div")
    embedWrap.className = "instagram-embed-shell"
    embedWrap.append(createInstagramBlockquote(postUrl))

    const zoomButton = document.createElement("button")
    zoomButton.className = "instagram-zoom"
    zoomButton.type = "button"
    zoomButton.dataset.instagramOpen = postUrl
    zoomButton.setAttribute("aria-label", "Ampliar post do Instagram")
    zoomButton.textContent = "Ampliar"

    article.append(embedWrap, zoomButton)
    fragment.append(article)
  })

  feed.append(fragment)

  qsa("[data-instagram-open]", feed).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()
      openInstagramModal(button.dataset.instagramOpen)
    })
  })

  loadInstagramEmbedScript().then(() => {
    window.instgrm?.Embeds?.process?.()
    window.setTimeout(() => normalizeInstagramEmbedFrames(feed), 1000)
    window.setTimeout(() => normalizeInstagramEmbedFrames(feed), 2600)
  })

  if (!motionEnabled) {
    setVisible(qsa(".reveal", feed))
    return
  }

  window.setTimeout(() => {
    qsa(".instagram-post", feed).forEach((post, index) => {
      post.classList.add("is-visible")
      motion(post, { opacity: [0, 1], translateY: [24, 0], scale: [0.96, 1] }, { delay: index * 55, duration: 620 })
    })
  }, 120)
}

function setupModalKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeInstagramModal()
  })
}

function setupResponsiveMotionLayer() {
  if (!motionEnabled) return

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const section = entry.target
        sectionObserver.unobserve(section)
        motion(qsa(".dark-card, .pillar-card, .timeline-card, .testimonial-card, .reset-shelf-media, .reset-shelf-points div, .legal-card", section), {
          opacity: [0, 1],
          translateY: [18, 0],
          scale: [0.98, 1],
        }, { stagger: 55, duration: 540 })
      })
    },
    { rootMargin: "0px 0px -18% 0px", threshold: 0.16 },
  )

  qsa("main > section, .legal-main").forEach((section) => sectionObserver.observe(section))
}

function init() {
  setStaticProgressBars()
  syncHeader()
  setupMenu()
  setupActiveNavigation()
  setupRevealMotion()
  setupHeroMotion()
  setupHeroInteraction()
  setupTouchFeedback()
  setupModalKeyboard()
  setupResponsiveMotionLayer()
  renderInstagramFeed()
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true })
} else {
  init()
}
