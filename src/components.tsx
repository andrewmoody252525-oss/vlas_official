import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type Ref,
  type ReactNode,
} from "react"

export type RoutePath = "/" | "/about" | "/support" | "/contact"

type NavigationItem = {
  href: RoutePath
  label: string
}

const navigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About & Services" },
  { href: "/support", label: "Support Our Mission" },
  { href: "/contact", label: "Contact Us" },
]

export function AppLink({
  href,
  className,
  children,
  onNavigate,
  ariaCurrent,
  anchorRef,
}: {
  href: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
  ariaCurrent?: "page"
  anchorRef?: Ref<HTMLAnchorElement>
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return
    }

    event.preventDefault()
    const [path, hash] = href.split("#")
    const nextPath = path || window.location.pathname
    const isSamePath = nextPath === window.location.pathname
    window.history.pushState({}, "", href)
    window.dispatchEvent(new PopStateEvent("popstate"))
    onNavigate?.()

    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
      })
    } else if (isSamePath) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <a
      ref={anchorRef}
      className={className}
      href={href}
      onClick={handleClick}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

export function MobileNavigation({
  open,
  currentRoute,
  onClose,
}: {
  open: boolean
  currentRoute: RoutePath
  onClose: () => void
}) {
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return

    const focusFrame = window.requestAnimationFrame(() =>
      firstLink.current?.focus(),
    )
    return () => window.cancelAnimationFrame(focusFrame)
  }, [open])

  return (
    <div
      className={`mobile-navigation ${open ? "is-open" : ""}`}
      id="mobile-navigation"
      aria-hidden={!open}
      inert={!open}
    >
      <nav aria-label="Mobile navigation">
        {navigation.map((item, index) => (
          <AppLink
            key={item.href}
            href={item.href}
            onNavigate={onClose}
            ariaCurrent={currentRoute === item.href ? "page" : undefined}
            className={currentRoute === item.href ? "is-current" : undefined}
            anchorRef={index === 0 ? firstLink : undefined}
          >
            {item.label}
          </AppLink>
        ))}
        <AppLink
          className="button button-primary mobile-donate"
          href="/support#donate"
          onNavigate={onClose}
        >
          Donate
        </AppLink>
      </nav>
    </div>
  )
}

export function SiteHeader({ currentRoute }: { currentRoute: RoutePath }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [indicatorReady, setIndicatorReady] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const siteHeader = useRef<HTMLElement>(null)
  const desktopNavigation = useRef<HTMLElement>(null)

  useEffect(() => {
    setMenuOpen(false)
    setHeaderVisible(true)
  }, [currentRoute])

  useEffect(() => {
    let previousScrollY = window.scrollY
    let scrollFrame = 0

    if (menuOpen) setHeaderVisible(true)

    const updateHeader = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - previousScrollY
      const activeElement = document.activeElement
      const hasKeyboardFocus =
        activeElement instanceof HTMLElement &&
        Boolean(siteHeader.current?.contains(activeElement)) &&
        activeElement.matches(":focus-visible")

      if (currentScrollY <= 32 || menuOpen || hasKeyboardFocus) {
        setHeaderVisible(true)
      } else if (scrollDelta < -2) {
        setHeaderVisible(true)
      } else if (scrollDelta > 6 && currentScrollY > 120) {
        setHeaderVisible(false)
      }

      previousScrollY = currentScrollY
      scrollFrame = 0
    }

    const handleScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(updateHeader)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.cancelAnimationFrame(scrollFrame)
    }
  }, [menuOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  useLayoutEffect(() => {
    const navigationElement = desktopNavigation.current
    if (!navigationElement) return

    const updateIndicator = () => {
      const currentLink = navigationElement.querySelector<HTMLAnchorElement>(
        'a[aria-current="page"]',
      )
      if (!currentLink) return

      const navigationRect = navigationElement.getBoundingClientRect()
      const linkRect = currentLink.getBoundingClientRect()
      setIndicator({
        left: linkRect.left - navigationRect.left,
        width: linkRect.width,
      })
    }

    updateIndicator()
    const resizeObserver = new ResizeObserver(updateIndicator)
    resizeObserver.observe(navigationElement)
    const readyFrame = window.requestAnimationFrame(() =>
      setIndicatorReady(true),
    )

    return () => {
      resizeObserver.disconnect()
      window.cancelAnimationFrame(readyFrame)
    }
  }, [currentRoute])

  const indicatorStyle = {
    "--indicator-left": `${indicator.left}px`,
    "--indicator-width": `${indicator.width}px`,
  } as CSSProperties

  return (
    <header
      ref={siteHeader}
      className={`site-header ${
        headerVisible ? "is-header-visible" : "is-header-hidden"
      }`}
      onFocusCapture={() => setHeaderVisible(true)}
    >
      <div className="container header-inner">
        <AppLink
          href="/"
          className="logo-link"
          ariaCurrent={currentRoute === "/" ? "page" : undefined}
        >
          <img
            src="/assets/vlas-logo-new.svg"
            alt="Veterans’ Legal Aid Society"
          />
        </AppLink>

        <nav
          ref={desktopNavigation}
          className="desktop-navigation"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              ariaCurrent={currentRoute === item.href ? "page" : undefined}
              className={currentRoute === item.href ? "is-current" : undefined}
            >
              <span className="navigation-label">{item.label}</span>
            </AppLink>
          ))}
          <span
            className={`navigation-indicator ${
              indicatorReady ? "is-ready" : ""
            }`}
            style={indicatorStyle}
            aria-hidden="true"
          />
        </nav>

        <div className="header-actions">
          <AppLink
            className="button button-primary desktop-donate"
            href="/support#donate"
          >
            Donate
          </AppLink>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen((current) => !current)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
      <MobileNavigation
        open={menuOpen}
        currentRoute={currentRoute}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <AppLink href="/" className="footer-logo">
            <img
              src="/assets/vlas-logo-footer-transparent.png"
              alt="Veterans’ Legal Aid Society"
            />
          </AppLink>
          <p>
            An Illinois nonprofit focused on meaningful access to justice for
            veterans and their families.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <AppLink key={item.href} href={item.href}>
                {item.label}
              </AppLink>
            ))}
          </nav>
        </div>
        <div>
          <h2>Connect</h2>
          <p>Legal assistance for Illinois veterans: 1-888-751-4377</p>
          <AppLink
            href="mailto:info@veteranslegalaid.org"
            className="footer-text-link"
          >
            info@veteranslegalaid.org
          </AppLink>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} Veterans Legal Aid Society. All rights
          reserved.
        </p>
        <p>Draft website for client review.</p>
      </div>
    </footer>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string
  title: string
  intro?: ReactNode
  align?: "left" | "center"
}) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}

export function HeroSection({
  eyebrow,
  title,
  intro,
  children,
  image,
  imageAlt = "",
  compact = false,
  className,
}: {
  eyebrow: string
  title: string
  intro: ReactNode
  children?: ReactNode
  image?: string
  imageAlt?: string
  compact?: boolean
  className?: string
}) {
  return (
    <section
      className={`page-hero ${compact ? "page-hero-compact" : ""} ${
        className ?? ""
      }`}
    >
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-intro">{intro}</p>
          {children && <div className="hero-actions">{children}</div>}
        </div>
        {image && (
          <div className="hero-image-wrap">
            <img src={image} alt={imageAlt} />
          </div>
        )}
      </div>
    </section>
  )
}

export function CTASection({
  eyebrow,
  title,
  copy,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string
  title: string
  copy: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className="cta-section">
      <div className="container cta-grid">
        <div>
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{copy}</p>
          <div className="cta-actions">
            <AppLink href={primaryHref} className="button button-light">
              {primaryLabel}
            </AppLink>
            {secondaryHref && secondaryLabel && (
              <AppLink
                href={secondaryHref}
                className="text-link text-link-light"
              >
                {secondaryLabel} <span aria-hidden="true">→</span>
              </AppLink>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.8 19 5v6.2c0 4.5-2.8 8.2-7 10-4.2-1.8-7-5.5-7-10V5l7-2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m8.8 12 2 2 4.5-4.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}
