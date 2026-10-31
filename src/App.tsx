import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { SiteFooter, SiteHeader, type RoutePath } from "./components"
import { AboutPage, ContactPage, HomePage, SupportPage } from "./pages"

function getRoute(): RoutePath {
  const path = window.location.pathname.replace(/\/+$/, "") || "/"
  if (path === "/about" || path === "/support" || path === "/contact")
    return path
  return "/"
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(getRoute)
  const [displayedRoute, setDisplayedRoute] = useState<RoutePath>(getRoute)
  const [pageFading, setPageFading] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute())
    window.addEventListener("popstate", updateRoute)
    return () => window.removeEventListener("popstate", updateRoute)
  }, [])

  useEffect(() => {
    if (route === displayedRoute) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedRoute(route)
      setPageFading(false)
      return
    }

    setPageFading(true)
    const swapTimer = window.setTimeout(() => {
      setDisplayedRoute(route)
      window.requestAnimationFrame(() => setPageFading(false))
    }, 480)

    return () => window.clearTimeout(swapTimer)
  }, [displayedRoute, route])

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -112 },
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      overscroll: true,
      respectReducedMotion: true,
      stopInertiaOnNavigate: true,
    })
    lenisRef.current = lenis
    let nativeMomentumTimer: number | undefined

    const stopListeningForNativeMomentum = lenis.on("scroll", (scrollState) => {
      if (
        scrollState.isScrolling !== "native" ||
        scrollState.prefersReducedMotion
      ) {
        return
      }

      window.clearTimeout(nativeMomentumTimer)
      const releaseVelocity = scrollState.velocity
      if (Math.abs(releaseVelocity) < 1) return

      nativeMomentumTimer = window.setTimeout(() => {
        if (scrollState.isScrolling !== "native") return
        const momentumDistance = Math.max(
          -600,
          Math.min(600, releaseVelocity * 9),
        )
        scrollState.scrollTo(scrollState.actualScroll + momentumDistance, {
          lerp: 0.075,
        })
      }, 140)
    })

    const handleKeyboardScroll = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          Boolean(target.closest("input, textarea, select, button")))
      ) {
        return
      }

      const viewportStep = window.innerHeight * 0.82
      const keyTargets: Partial<Record<string, number>> = {
        ArrowDown: lenis.targetScroll + 110,
        ArrowUp: lenis.targetScroll - 110,
        PageDown: lenis.targetScroll + viewportStep,
        PageUp: lenis.targetScroll - viewportStep,
        Home: 0,
        End: lenis.limit,
        " ":
          lenis.targetScroll + (event.shiftKey ? -viewportStep : viewportStep),
      }
      const nextTarget = keyTargets[event.key]
      if (nextTarget === undefined) return

      event.preventDefault()
      lenis.scrollTo(nextTarget)
    }

    window.addEventListener("keydown", handleKeyboardScroll)

    return () => {
      window.removeEventListener("keydown", handleKeyboardScroll)
      window.clearTimeout(nativeMomentumTimer)
      stopListeningForNativeMomentum()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const titles: Record<RoutePath, string> = {
      "/": "Veterans Legal Aid Society | Meaningful Access to Justice",
      "/about": "About & Services | Veterans Legal Aid Society",
      "/support": "Support Our Mission | Veterans Legal Aid Society",
      "/contact": "Contact Us | Veterans Legal Aid Society",
    }
    document.title = titles[route]
  }, [route])

  useLayoutEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(
      [
        ".mission-grid > *",
        ".section-heading",
        ".service-card",
        ".impact-image",
        ".impact-copy",
        ".recognition-grid article",
        ".cta-grid > *",
        ".split-content > *",
        ".history-grid > *",
        ".trust-grid > *",
        ".ways-grid article",
        ".donation-callout > *",
        ".contact-grid > *",
        ".footer-grid > *",
      ].join(","),
    )

    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-item", `reveal-delay-${index % 4}`)
    })

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      revealTargets.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    )

    let observeFrame = 0
    const paintFrame = window.requestAnimationFrame(() => {
      observeFrame = window.requestAnimationFrame(() => {
        revealTargets.forEach((element) => observer.observe(element))
      })
    })

    return () => {
      window.cancelAnimationFrame(paintFrame)
      window.cancelAnimationFrame(observeFrame)
      observer.disconnect()
    }
  }, [displayedRoute])

  const pages: Record<RoutePath, React.ReactNode> = {
    "/": <HomePage />,
    "/about": <AboutPage />,
    "/support": <SupportPage />,
    "/contact": <ContactPage />,
  }

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1)
    const target = hash ? document.getElementById(hash) : null

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target ?? 0, {
        immediate: !target,
        offset: target ? -112 : 0,
      })
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "auto" })
    }
  }, [displayedRoute])

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader currentRoute={displayedRoute} />
      <main
        id="main-content"
        className={`page-content ${pageFading ? "is-fading" : ""}`}
        tabIndex={-1}
        aria-busy={pageFading}
      >
        {pages[displayedRoute]}
      </main>
      <SiteFooter />
    </div>
  )
}
