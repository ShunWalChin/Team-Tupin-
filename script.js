const menuToggle = document.querySelector(".menu-toggle")
const siteNav = document.querySelector(".site-nav")
const siteHeader = document.querySelector(".site-header")
const revealItems = [...document.querySelectorAll(".reveal")]
const progressBars = [...document.querySelectorAll("[data-progress]")]
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

function setMenuState(isOpen) {
  if (!menuToggle || !siteNav) return

  siteNav.classList.toggle("is-open", isOpen)
  menuToggle.setAttribute("aria-expanded", String(isOpen))
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    setMenuState(!siteNav.classList.contains("is-open"))
  })

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false)
    })
  })

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false)
    }
  })
}

if (siteHeader) {
  let ticking = false

  const syncHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 16)
    ticking = false
  }

  syncHeaderState()

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(syncHeaderState)
      }
    },
    { passive: true }
  )
}

function setStaticProgressBars() {
  progressBars.forEach((bar) => {
    bar.style.width = `${bar.dataset.progress}%`
  })
}

function revealWithoutMotion() {
  revealItems.forEach((item) => item.classList.add("is-visible"))
  setStaticProgressBars()
}

const animeApi = window.anime
const motionEnabled = Boolean(animeApi && !prefersReducedMotion.matches)

if (!motionEnabled) {
  revealWithoutMotion()
} else {
  const { animate, createTimeline, stagger } = animeApi

  const groupConfigs = [
    [".stack-cards", ".dark-card"],
    [".pillar-grid", ".pillar-card"],
    [".timeline", ".timeline-card"],
    [".proof-grid", ".proof-card"],
    [".mini-stats", ".mini-stat"],
    [".legal-stack", ".legal-card"],
  ]

  const standaloneSelectors = [
    ".section-copy.reveal",
    ".final-card.reveal",
    ".legal-header.reveal",
  ]

  function animateCards(items, config = {}) {
    if (!items.length) return

    items.forEach((item) => item.classList.add("is-visible"))

    animate(items, {
      opacity: [0, 1],
      y: [32, 0],
      scale: [0.97, 1],
      filter: ["blur(12px)", "blur(0px)"],
      delay: stagger(120),
      duration: 900,
      ease: "out(4)",
      ...config,
    })
  }

  function observeMotionBlocks() {
    const groupObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const itemSelector = entry.target.dataset.motionItems
          const items = [...entry.target.querySelectorAll(itemSelector)]
          animateCards(items)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )

    groupConfigs.forEach(([groupSelector, itemSelector]) => {
      document.querySelectorAll(groupSelector).forEach((group) => {
        group.dataset.motionItems = itemSelector
        groupObserver.observe(group)
      })
    })

    const standaloneObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const target = entry.target
          target.classList.add("is-visible")

          animate(target, {
            opacity: [0, 1],
            y: [28, 0],
            scale: [0.98, 1],
            filter: ["blur(12px)", "blur(0px)"],
            duration: 920,
            ease: "out(4)",
          })

          observer.unobserve(target)
        })
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" }
    )

    standaloneSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((block) => {
        const insideAnimatedGroup = block.closest(".stack-cards, .pillar-grid, .timeline, .proof-grid, .mini-stats, .legal-stack")
        const insideHero = block.closest(".hero-section")

        if (!insideAnimatedGroup && !insideHero) {
          standaloneObserver.observe(block)
        }
      })
    })
  }

  function initAmbientMotion() {
    animate(".orb-a", {
      x: [-20, 20],
      y: [-16, 18],
      scale: [1, 1.08],
      duration: 6200,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animate(".orb-b", {
      x: [12, -16],
      y: [-10, 22],
      scale: [0.96, 1.05],
      duration: 7600,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animate(".orb-c", {
      x: [-12, 16],
      y: [18, -12],
      scale: [1.04, 0.98],
      duration: 7000,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animate(".ambient-grid", {
      opacity: [0.2, 0.36],
      duration: 4200,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })
  }

  function initHeroMotion() {
    const heroCopy = document.querySelector(".hero-copy-block")
    const heroVisual = document.querySelector(".hero-visual")
    const heroPanel = document.querySelector(".hero-clean-panel")
    const heroGlow = document.querySelector(".hero-panel-glow")

    if (!heroCopy || !heroVisual || !heroPanel) return

    heroCopy.classList.add("is-visible")
    heroVisual.classList.add("is-visible")

    const heroTimeline = createTimeline({
      autoplay: false,
      defaults: {
        duration: 900,
        ease: "out(4)",
      },
    })

    heroTimeline
      .add(heroCopy.querySelector(".eyebrow"), {
        opacity: [0, 1],
        y: [24, 0],
        filter: ["blur(10px)", "blur(0px)"],
      }, 0)
      .add(heroCopy.querySelector("h1"), {
        opacity: [0, 1],
        y: [42, 0],
        scale: [0.96, 1],
        filter: ["blur(18px)", "blur(0px)"],
      }, 120)
      .add(heroCopy.querySelector(".hero-text"), {
        opacity: [0, 1],
        y: [26, 0],
        filter: ["blur(12px)", "blur(0px)"],
      }, 230)
      .add(heroCopy.querySelectorAll(".hero-actions a"), {
        opacity: [0, 1],
        y: [22, 0],
        scale: [0.97, 1],
        delay: stagger(120),
      }, 320)
      .add(heroCopy.querySelectorAll(".hero-pills li"), {
        opacity: [0, 1],
        y: [18, 0],
        scale: [0.94, 1],
        delay: stagger(70),
      }, 430)
      .add(heroCopy.querySelectorAll(".hero-micro-stats article"), {
        opacity: [0, 1],
        y: [22, 0],
        scale: [0.96, 1],
        delay: stagger(110),
      }, 520)
      .add(heroPanel, {
        opacity: [0, 1],
        x: [40, 0],
        y: [24, 0],
        scale: [0.97, 1],
        rotate: [1.4, 0],
        filter: ["blur(18px)", "blur(0px)"],
      }, 180)
      .add(heroVisual.querySelectorAll(".hero-chip"), {
        opacity: [0, 1],
        y: [16, 0],
        delay: stagger(80),
      }, 480)
      .add(heroVisual.querySelectorAll(".dashboard-card"), {
        opacity: [0, 1],
        y: [24, 0],
        scale: [0.97, 1],
        delay: stagger(120),
      }, 560)

    heroTimeline.play()

    animate(progressBars, {
      width: (element) => `${element.dataset.progress}%`,
      delay: stagger(120, { start: 880 }),
      duration: 1100,
      ease: "out(4)",
    })

    if (heroGlow) {
      animate(heroGlow, {
        scale: [0.94, 1.08],
        opacity: [0.34, 0.6],
        duration: 2600,
        ease: "inOutSine",
        direction: "alternate",
        loop: true,
        delay: 1200,
      })
    }

    animate(".hero-chip", {
      y: [0, -6],
      delay: stagger(120, { start: 1400 }),
      duration: 2200,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })
  }

  initAmbientMotion()
  initHeroMotion()
  observeMotionBlocks()
}
