const root = document.documentElement
const body = document.body
const menuToggle = document.querySelector(".menu-toggle")
const siteNav = document.querySelector(".site-nav")
const siteHeader = document.querySelector(".site-header")
const siteNavLinks = siteNav ? [...siteNav.querySelectorAll("a")] : []
const revealItems = [...document.querySelectorAll(".reveal")]
const progressBars = [...document.querySelectorAll("[data-progress]")]
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const animeApi = window.anime
const motionEnabled = Boolean(animeApi && !prefersReducedMotion.matches)

let animateMotion = null
let createTimeline = null
let stagger = null

if (motionEnabled) {
  root.classList.add("motion-enhanced")
  ;({ animate: animateMotion, createTimeline, stagger } = animeApi)
}

function toArray(targets) {
  if (!targets) return []
  if (typeof targets === "string") return [...document.querySelectorAll(targets)]
  if (targets instanceof Element) return [targets]
  return [...targets].filter(Boolean)
}

function markVisible(targets) {
  toArray(targets).forEach((target) => {
    if (target.classList?.contains("reveal")) {
      target.classList.add("is-visible")
    }
  })
}

function setStaticProgressBars() {
  progressBars.forEach((bar) => {
    bar.style.width = `${bar.dataset.progress}%`
  })
}

function revealWithoutMotion() {
  markVisible(revealItems)
  setStaticProgressBars()
}

function setMenuState(isOpen) {
  if (!menuToggle || !siteNav) return

  siteNav.classList.toggle("is-open", isOpen)
  menuToggle.setAttribute("aria-expanded", String(isOpen))

  if (motionEnabled && isOpen && window.innerWidth <= 820 && siteNavLinks.length) {
    animateMotion(siteNavLinks, {
      opacity: [0, 1],
      y: [-12, 0],
      filter: ["blur(8px)", "blur(0px)"],
      delay: stagger(55),
      duration: 420,
      ease: "out(3)",
    })
  }
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    if (motionEnabled) {
      animateMotion(menuToggle, {
        scale: [0.92, 1.06, 1],
        duration: 360,
        ease: "out(4)",
      })
    }

    setMenuState(!siteNav.classList.contains("is-open"))
  })

  siteNavLinks.forEach((link) => {
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

if (!motionEnabled) {
  revealWithoutMotion()
} else {
  const groupConfigs = [
    {
      container: ".stack-cards",
      items: ".dark-card",
      motion: {
        y: [34, 0],
        rotate: [0.8, 0],
        delay: stagger(110),
      },
    },
    {
      container: ".pillar-grid",
      items: ".pillar-card",
      motion: {
        y: [36, 0],
        scale: [0.95, 1],
        delay: stagger(100),
      },
      afterEnter(container) {
        animateElements(container.querySelectorAll(".pillar-icon"), {
          opacity: [0, 1],
          scale: [0.72, 1],
          rotate: [-10, 0],
          y: [12, 0],
          delay: stagger(90, { start: 140 }),
          duration: 720,
          ease: "out(4)",
        }, false)
      },
    },
    {
      container: ".timeline",
      items: ".timeline-card",
      motion: {
        x: [18, 0],
        y: [32, 0],
        delay: stagger(120),
      },
    },
    {
      container: ".proof-grid",
      items: ".proof-card",
      motion: {
        y: [34, 0],
        scale: [0.95, 1],
        delay: stagger(120),
      },
      afterEnter(container) {
        animateElements(container.querySelectorAll(".proof-visual"), {
          opacity: [0, 1],
          scale: [1.1, 1],
          filter: ["blur(14px)", "blur(0px)"],
          delay: stagger(120, { start: 120 }),
          duration: 1000,
          ease: "out(4)",
        }, false)

        animateElements(container.querySelectorAll(".proof-copy > *"), {
          opacity: [0, 1],
          y: [18, 0],
          delay: stagger(70, { start: 240 }),
          duration: 760,
          ease: "out(3)",
        }, false)
      },
    },
    {
      container: ".mini-stats",
      items: ".mini-stat",
      motion: {
        y: [26, 0],
        scale: [0.97, 1],
        delay: stagger(100),
      },
    },
    {
      container: ".legal-stack",
      items: ".legal-card",
      motion: {
        y: [28, 0],
        scale: [0.97, 1],
        delay: stagger(90),
      },
    },
  ]

  const standaloneConfigs = [
    {
      selector: ".section-copy.reveal",
      items: ".eyebrow, h2, p",
      motion: {
        opacity: [0, 1],
        y: [24, 0],
        filter: ["blur(10px)", "blur(0px)"],
        delay: stagger(120),
        duration: 820,
        ease: "out(4)",
      },
    },
    {
      selector: ".legal-header.reveal",
      items: ".legal-brand, .eyebrow, h1, p",
      motion: {
        opacity: [0, 1],
        y: [22, 0],
        scale: [0.97, 1],
        filter: ["blur(10px)", "blur(0px)"],
        delay: stagger(110),
        duration: 860,
        ease: "out(4)",
      },
    },
    {
      selector: ".final-card.reveal",
      items: ".section-copy .eyebrow, .section-copy h2, .section-copy p, .final-actions > *",
      motion: {
        opacity: [0, 1],
        y: [24, 0],
        scale: [0.98, 1],
        filter: ["blur(12px)", "blur(0px)"],
        delay: stagger(100),
        duration: 860,
        ease: "out(4)",
      },
    },
    {
      selector: ".footer-brand.reveal",
      items: "img, .footer-title, .footer-text",
      motion: {
        opacity: [0, 1],
        y: [18, 0],
        filter: ["blur(8px)", "blur(0px)"],
        delay: stagger(90),
        duration: 700,
        ease: "out(3)",
      },
    },
    {
      selector: ".footer-links.reveal",
      items: "a",
      motion: {
        opacity: [0, 1],
        y: [14, 0],
        scale: [0.96, 1],
        delay: stagger(70),
        duration: 640,
        ease: "out(3)",
      },
    },
  ]

  function animateElements(targets, config = {}, autoReveal = true) {
    const items = toArray(targets)
    if (!items.length) return

    if (autoReveal) markVisible(items)

    animateMotion(items, {
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

  function observeGroupedSections() {
    const groupedObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const config = groupConfigs[Number(entry.target.dataset.motionGroup)]
          if (!config) return

          const items = entry.target.querySelectorAll(config.items)
          animateElements(items, config.motion)

          if (config.afterEnter) {
            config.afterEnter(entry.target, items)
          }

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )

    groupConfigs.forEach((config, index) => {
      document.querySelectorAll(config.container).forEach((container) => {
        container.dataset.motionGroup = String(index)
        groupedObserver.observe(container)
      })
    })
  }

  function observeStandaloneBlocks() {
    const standaloneObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const config = standaloneConfigs[Number(entry.target.dataset.motionStandalone)]
          if (!config) return

          markVisible(entry.target)
          animateElements(entry.target.querySelectorAll(config.items), config.motion, false)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" }
    )

    standaloneConfigs.forEach((config, index) => {
      document.querySelectorAll(config.selector).forEach((block) => {
        block.dataset.motionStandalone = String(index)
        standaloneObserver.observe(block)
      })
    })
  }

  function initHeaderIntro() {
    if (!siteHeader) return

    animateMotion(siteHeader, {
      opacity: [0, 1],
      y: [-18, 0],
      duration: 720,
      ease: "out(4)",
    })

    animateMotion(".brand-badge", {
      opacity: [0, 1],
      scale: [0.84, 1],
      rotate: [-8, 0],
      duration: 760,
      ease: "out(4)",
    })

    animateElements(document.querySelectorAll(".brand-copy > *"), {
      opacity: [0, 1],
      x: [-18, 0],
      y: [0, 0],
      scale: [1, 1],
      filter: ["blur(8px)", "blur(0px)"],
      delay: stagger(80, { start: 90 }),
      duration: 620,
      ease: "out(4)",
    }, false)

    if (siteNavLinks.length) {
      animateElements(siteNavLinks, {
        opacity: [0, 1],
        y: [-14, 0],
        scale: [0.97, 1],
        filter: ["blur(8px)", "blur(0px)"],
        delay: stagger(70, { start: 180 }),
        duration: 540,
        ease: "out(3)",
      }, false)
    }

    if (menuToggle) {
      animateMotion(menuToggle, {
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 520,
        delay: 220,
        ease: "out(3)",
      })
    }
  }

  function initAmbientMotion() {
    animateMotion(".orb-a", {
      x: [-20, 20],
      y: [-16, 18],
      scale: [1, 1.08],
      duration: 6200,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animateMotion(".orb-b", {
      x: [12, -16],
      y: [-10, 22],
      scale: [0.96, 1.05],
      duration: 7600,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animateMotion(".orb-c", {
      x: [-12, 16],
      y: [18, -12],
      scale: [1.04, 0.98],
      duration: 7000,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animateMotion(".ambient-grid", {
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
    const heroBackground = document.querySelector(".hero-background")

    if (!heroCopy || !heroVisual || !heroPanel) return

    markVisible([heroCopy, heroVisual])

    if (heroBackground) {
      animateMotion(heroBackground, {
        opacity: [0, 1],
        scale: [1.06, 1],
        duration: 1500,
        ease: "out(4)",
      })
    }

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
      .add(heroVisual.querySelector(".hero-panel-brand img"), {
        opacity: [0, 1],
        scale: [0.82, 1],
        rotate: [-10, 0],
      }, 340)
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
      .add(heroVisual.querySelectorAll(".hero-checklist li"), {
        opacity: [0, 1],
        x: [16, 0],
        delay: stagger(70),
      }, 700)

    heroTimeline.play()

    animateMotion(progressBars, {
      width: (element) => `${element.dataset.progress}%`,
      delay: stagger(120, { start: 880 }),
      duration: 1100,
      ease: "out(4)",
    })

    if (heroGlow) {
      animateMotion(heroGlow, {
        scale: [0.94, 1.08],
        opacity: [0.34, 0.6],
        duration: 2600,
        ease: "inOutSine",
        direction: "alternate",
        loop: true,
        delay: 1200,
      })
    }

    animateMotion(".hero-chip", {
      y: [0, -6],
      delay: stagger(120, { start: 1400 }),
      duration: 2200,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })
  }

  function initDecorativeLoops() {
    animateMotion(".pillar-icon", {
      y: [0, -6],
      scale: [1, 1.05],
      delay: stagger(120, { start: 900 }),
      duration: 2400,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animateMotion(".proof-visual", {
      scale: [1, 1.045],
      rotate: [0, -0.5],
      delay: stagger(220, { start: 1400 }),
      duration: 3400,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
    })

    animateMotion(".footer-brand img, .legal-brand", {
      y: [0, -4],
      duration: 2600,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
      delay: 1400,
    })

    animateMotion(".btn-primary", {
      scale: [1, 1.028],
      duration: 1800,
      ease: "inOutSine",
      direction: "alternate",
      loop: true,
      delay: stagger(260, { start: 1800 }),
    })
  }

  function initInteractiveMotion() {
    const surfaceTargets = toArray(".hero-pills li, .hero-micro-stats article, .dashboard-card, .dark-card, .pillar-card, .timeline-card, .proof-card, .mini-stat, .final-card, .legal-card")
    const actionTargets = toArray(".brand-lockup, .site-nav a, .footer-links a, .menu-toggle, .cta-mini, .btn-primary, .btn-secondary, .hero-chip")

    surfaceTargets.forEach((target) => {
      const visual = target.querySelector(".proof-visual")

      target.addEventListener("pointerenter", () => {
        animateMotion(target, {
          y: -8,
          scale: 1.018,
          duration: 320,
          ease: "out(3)",
        })

        if (visual) {
          animateMotion(visual, {
            scale: 1.06,
            duration: 360,
            ease: "out(3)",
          })
        }
      })

      target.addEventListener("pointerleave", () => {
        animateMotion(target, {
          y: 0,
          scale: 1,
          duration: 340,
          ease: "out(4)",
        })

        if (visual) {
          animateMotion(visual, {
            scale: 1,
            duration: 360,
            ease: "out(4)",
          })
        }
      })
    })

    actionTargets.forEach((target) => {
      target.addEventListener("pointerenter", () => {
        animateMotion(target, {
          y: -3,
          scale: 1.03,
          duration: 220,
          ease: "out(3)",
        })
      })

      target.addEventListener("pointerleave", () => {
        animateMotion(target, {
          y: 0,
          scale: 1,
          duration: 240,
          ease: "out(4)",
        })
      })
    })
  }

  initHeaderIntro()
  initAmbientMotion()
  initHeroMotion()
  initDecorativeLoops()
  observeGroupedSections()
  observeStandaloneBlocks()
  initInteractiveMotion()
}
