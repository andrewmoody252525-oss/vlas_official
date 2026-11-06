import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react"
import {
  AppLink,
  ArrowIcon,
  CTASection,
  HeroSection,
  SectionHeading,
  ShieldIcon,
} from "./components"

type ServiceItem = {
  number: string
  title: string
  copy: string
  bullets?: string[]
  category?: string
  icon?: "scales" | "document" | "coins"
}

const focusAreas: ServiceItem[] = [
  {
    number: "01",
    title: "Access to justice",
    copy: "Helping veterans and their families find clearer pathways through legal challenges and available resources.",
  },
  {
    number: "02",
    title: "Trusted connections",
    copy: "Bringing legal professionals, community organizations, and supporters into stronger service networks.",
  },
  {
    number: "03",
    title: "Practical understanding",
    copy: "Making legal information and next steps easier to understand, navigate, and act on.",
  },
]

const aboutServices: ServiceItem[] = [
  {
    number: "01",
    title: "Ask a Lawyer / Legal Advice Desk",
    category: "Legal Assistance",
    icon: "scales",
    copy: "Free in-person and virtual legal consultations are available to veterans and their families.",
    bullets: [
      "Identify legal issues",
      "Understand available options",
      "Obtain appropriate assistance or referrals",
    ],
  },
  {
    number: "02",
    title: "Healthcare Power of Attorney Workshops",
    category: "Education & Planning",
    icon: "document",
    copy: "Educational workshops support veterans and their families as they plan for healthcare decisions.",
    bullets: [
      "Understand healthcare decision-making",
      "Prepare important legal documents",
      "Avoid preventable complications",
    ],
  },
  {
    number: "03",
    title: "Patriot Pooled Income Trust",
    category: "Trust Administration",
    icon: "coins",
    copy: "Through its role as co-trustee, VLAS helps administer a specialized trust for eligible individuals with disabilities.",
    bullets: ["Preserve assets", "Maintain access to Medicaid benefits"],
  },
]

function ServiceIllustration({ type }: { type: ServiceItem["icon"] }) {
  if (type === "scales") {
    return (
      <svg
        className="service-illustration"
        viewBox="0 0 96 80"
        aria-hidden="true"
      >
        <path d="M48 12v55M28 20h40M48 12l-5 8h10l-5-8ZM35 68h26M40 62h16" />
        <path d="m28 20-14 28h28L28 20Zm40 0L54 48h28L68 20ZM14 48c2 9 24 9 28 0M54 48c2 9 24 9 28 0" />
      </svg>
    )
  }

  if (type === "document") {
    return (
      <svg
        className="service-illustration"
        viewBox="0 0 96 80"
        aria-hidden="true"
      >
        <path d="M20 10h42l14 14v45H20V10Z" />
        <path d="M62 10v15h14M30 35h32M30 45h24M30 55h20" />
        <path d="m56 61 23-29 8 6-23 29-12 4 4-10Z" />
      </svg>
    )
  }

  return (
    <svg
      className="service-illustration"
      viewBox="0 0 96 80"
      aria-hidden="true"
    >
      <ellipse cx="35" cy="58" rx="22" ry="8" />
      <path d="M13 48v10M57 48v10M13 48c0 4 10 8 22 8s22-4 22-8M13 38v10c0 4 10 8 22 8" />
      <ellipse cx="35" cy="38" rx="22" ry="8" />
      <ellipse cx="65" cy="27" rx="20" ry="8" />
      <path d="M45 27v20c0 4 9 8 20 8s20-4 20-8V27M45 37c0 4 9 8 20 8s20-4 20-8" />
    </svg>
  )
}

export function ServiceOverview({
  items = focusAreas,
  interactive = false,
}: {
  items?: ServiceItem[]
  interactive?: boolean
}) {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  return (
    <div className={interactive ? "service-architecture" : undefined}>
      {interactive && (
        <div className="service-banner">
          <div className="service-banner-copy">
            <p>Our Services</p>
            <h3>Legal Support for Veterans and Their Families</h3>
          </div>
        </div>
      )}
      <div
        className={`service-grid ${
          interactive ? "service-grid-disclosure" : ""
        }`}
      >
        {items.map((item) => {
          const isExpanded = expandedService === item.number

          return (
            <article
              className={`service-card ${
                interactive ? "service-card-disclosure" : ""
              } ${isExpanded ? "is-expanded" : ""}`}
              key={item.number}
            >
              {interactive ? (
                <div className="service-card-meta">
                  <span className="service-category">{item.category}</span>
                </div>
              ) : (
                <p className="card-number">{item.number}</p>
              )}
              <h3>{item.title}</h3>
              {interactive ? (
                <>
                  <button
                    className="service-card-toggle"
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`service-details-${item.number}`}
                    aria-label={`${
                      isExpanded ? "Hide" : "Show"
                    } details for ${item.title}`}
                    onClick={() =>
                      setExpandedService(isExpanded ? null : item.number)
                    }
                  >
                    <span className="service-toggle-mobile">
                      Tap to learn more
                    </span>
                    <span className="service-toggle-icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div
                    className="service-card-details"
                    id={`service-details-${item.number}`}
                  >
                    <p>{item.copy}</p>
                    {item.bullets && (
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ServiceIllustration type={item.icon} />
                </>
              ) : (
                <p>{item.copy}</p>
              )}
              <div className="card-rule" aria-hidden="true" />
            </article>
          )
        })}
      </div>
    </div>
  )
}

export function ImpactHighlight() {
  return (
    <div className="impact-panel">
      <div className="impact-image">
        <img
          src="/assets/veterans-community.jpg"
          alt="Veterans walking together during a community gathering"
        />
      </div>
      <div className="impact-copy">
        <p className="eyebrow eyebrow-light">Accountability in action</p>
        <h3>Impact should be specific, verified, and human.</h3>
        <p>
          VLAS will use this space for client-approved milestones, outcomes, and
          stories. No statistics or individual success stories are presented
          until they can be verified.
        </p>
        <div className="editorial-note editorial-note-dark">
          <strong>Editorial requirement</strong>
          <span>
            Verified impact information and approved imagery are needed for
            publication.
          </span>
        </div>
      </div>
    </div>
  )
}

export function RecognitionGrid({ compact = false }: { compact?: boolean }) {
  const groups = [
    [
      "Attorneys",
      "Legal professionals who contribute time, experience, or resources.",
    ],
    ["Sponsors", "Organizations that help sustain VLAS and its mission."],
    [
      "Community supporters",
      "Partners and individuals who strengthen the circle of support.",
    ],
  ]

  return (
    <div
      className={`recognition-grid ${
        compact ? "recognition-grid-compact" : ""
      }`}
    >
      {groups.map(([title, copy]) => (
        <article key={title}>
          <ShieldIcon />
          <h3>{title}</h3>
          <p>{copy}</p>
          <span>Recognition roster pending approval</span>
        </article>
      ))}
    </div>
  )
}

export function DonationCallout() {
  return (
    <section
      className="donation-callout"
      id="donate"
      aria-labelledby="donate-heading"
    >
      <div>
        <p className="eyebrow">Donate</p>
        <h2 id="donate-heading">
          Help make access to justice more meaningful.
        </h2>
      </div>
      <div>
        <p>
          A secure giving destination has not yet been approved or connected.
          This area is ready for the organization’s selected donation provider.
        </p>
        <button className="button button-primary" type="button" disabled>
          Donation link awaiting configuration
        </button>
        <p className="configuration-note">
          No payment information is collected on this website.
        </p>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <HeroSection
        eyebrow="Veterans Legal Aid Society"
        title="Justice should remain within reach."
        intro={
          <>
            VLAS is an Illinois nonprofit focused on{" "}
            <strong className="copy-emphasis">
              veterans and their families
            </strong>{" "}
            having meaningful access to{" "}
            <strong className="copy-emphasis">justice</strong>.
          </>
        }
        image="/assets/american-flag-sunset.jpg"
        imageAlt="American flag illuminated by the setting sun"
      >
        <AppLink className="button button-primary" href="/support">
          Support our mission
        </AppLink>
        <AppLink className="button button-secondary" href="/about">
          Learn about VLAS
        </AppLink>
      </HeroSection>

      <section className="mission-band">
        <div className="container mission-grid">
          <p className="eyebrow">Our mission</p>
          <div>
            <h2>Meaningful access to justice for those who served.</h2>
            <p>
              VLAS exists to help build clearer, more connected pathways to
              justice for veterans and their families, grounded in dignity,
              practical support, and institutional trust.
            </p>
            <AppLink href="/about" className="text-link">
              About our mission <ArrowIcon />
            </AppLink>
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Focused on access. Built through partnership."
            intro={
              <em>
                [These draft focus areas express the organization’s stated
                purpose without making unverified service claims. Final program
                language remains subject to client approval.]
              </em>
            }
          />
          <ServiceOverview />
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <SectionHeading
            eyebrow="Our impact"
            title="Credibility begins with evidence."
            intro="VLAS is committed to communicating its work responsibly, using approved outcomes and authentic stories."
          />
          <ImpactHighlight />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Those who make it possible"
            title="A mission strengthened by people who step forward."
            intro="VLAS recognizes the legal professionals, sponsors, and community supporters who help move this work forward."
            align="center"
          />
          <RecognitionGrid compact />
        </div>
      </section>

      <CTASection
        eyebrow="Stand with veterans"
        title="Your support can strengthen the path to justice."
        copy="Learn how donations, professional support, and community partnership can advance the VLAS mission."
        primaryHref="/support"
        primaryLabel="Support our mission"
        secondaryHref="/contact"
        secondaryLabel="Start a conversation"
      />
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <HeroSection
        eyebrow="About & Services"
        title="A principled commitment to access and dignity."
        intro="VLAS is focused on a simple but consequential idea: veterans and their families should have meaningful access to justice."
        image="/assets/veterans-community.jpg"
        imageAlt="Veterans walking together in a community gathering"
        compact
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Work organized around meaningful access."
            intro={
              <>
                Veterans’ Legal Aid Society (VLAS) provides{" "}
                <strong className="copy-emphasis">free legal assistance</strong>{" "}
                to veterans and their families, helping them navigate challenges
                that can threaten their homes, livelihoods, financial security,
                and well-being.
              </>
            }
          />
          <p className="section-supporting-copy">
            Through direct legal services, in-person and virtual consultations,
            educational outreach, and partnerships with attorneys and veterans’
            organizations, VLAS works to make meaningful access to justice a
            reality for those who served.
          </p>
          <ServiceOverview items={aboutServices} interactive />
        </div>
      </section>

      <section className="section section-warm">
        <div className="container history-grid">
          <div className="history-label">
            <p className="eyebrow">Our history</p>
            <span aria-hidden="true">VLAS</span>
          </div>
          <div>
            <h2>Serving Veterans Since 2010</h2>
            <p>
              Founded in 2010, Veterans’ Legal Aid Society has spent more than
              15 years working to improve access to legal assistance for
              veterans and their families.
            </p>
            <p>
              From its earliest years, VLAS has focused on addressing legal
              challenges that can profoundly affect the lives and well-being of
              those who served. Its work has included specialized legal
              services, coordination with veterans’ organizations, and
              administration of the Patriot Pooled Income Trust, which helps
              eligible individuals with disabilities preserve assets while
              accessing important benefits.
            </p>
            <p>
              Our history is rooted in service. Our future is focused on making
              justice more accessible to every veteran and family we can reach.
            </p>
            <div className="editorial-note">
              <strong>2010–TODAY | A Continuing Commitment to Veterans</strong>
              <span>
                From specialized legal services and trust administration to
                expanded legal consultations and educational outreach, VLAS
                continues to evolve to meet the needs of Illinois veterans and
                their families.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-content">
          <SectionHeading
            eyebrow="Who we are"
            title="Service deserves lasting support."
          />
          <div className="prose">
            <p className="prose-lead">
              Veterans Legal Aid Society is an Illinois nonprofit serving a
              public-interest mission at the intersection of veterans, families,
              legal professionals, and community support.
            </p>
            <p>
              VLAS helps veterans and their families understand the legal
              system, find support, and get the legal help they need.
            </p>
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container trust-grid">
          <div>
            <p className="eyebrow eyebrow-light">Patriot Pooled Income Trust</p>
            <h2>Preserving assets while protecting access to benefits.</h2>
          </div>
          <div>
            <p className="trust-lead">
              Through its role as co-trustee, VLAS helps administer a
              specialized trust designed to assist eligible individuals with
              disabilities in preserving assets while accessing Medicaid
              benefits.
            </p>
            <p>
              Administration of the Patriot Pooled Income Trust has been part of
              VLAS’s longstanding work to address legal and financial challenges
              that can profoundly affect the lives and well-being of those it
              serves.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Get involved"
        title="There is a place for principled support."
        copy="Explore ways to support the mission or contact VLAS to begin a professional or community conversation."
        primaryHref="/support"
        primaryLabel="Ways to support"
        secondaryHref="/contact"
        secondaryLabel="Contact VLAS"
      />
    </>
  )
}

export function SupportPage() {
  const ways = [
    {
      title: "Give",
      copy: "Support the mission through the organization’s approved donation channel once configured.",
    },
    {
      title: "Offer professional support",
      copy: "Attorneys and other professionals can contact VLAS to discuss appropriate ways to contribute.",
    },
    {
      title: "Build a partnership",
      copy: "Organizations and community groups can begin a conversation about mission-aligned support.",
    },
    {
      title: "Share the mission",
      copy: "Help more people understand why meaningful access to justice for veterans and families matters.",
    },
  ]

  return (
    <>
      <HeroSection
        eyebrow="Support Our Mission"
        title="Strong institutions are built by people who care."
        intro="VLAS welcomes thoughtful support from donors, legal professionals, organizations, and community partners."
        compact
      >
        <AppLink className="button button-primary" href="/support#donate">
          Donation information
        </AppLink>
        <AppLink className="button button-secondary" href="/contact">
          Discuss a partnership
        </AppLink>
      </HeroSection>

      <section className="section">
        <div className="container split-content support-intro">
          <SectionHeading
            eyebrow="Why support matters"
            title="Access is strengthened through shared commitment."
          />
          <div className="prose">
            <p className="prose-lead">
              Legal challenges can be difficult to understand and navigate.
              Mission-aligned support helps VLAS build stronger pathways,
              clearer information, and more durable community connections.
            </p>
            <p>
              Final fundraising language, use-of-funds statements, and giving
              disclosures should be reviewed and approved before the donation
              integration is published.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="container">
          <SectionHeading
            eyebrow="Ways to support VLAS"
            title="Choose the role that fits."
            intro="Every path begins with clear expectations and an appropriate conversation."
          />
          <div className="ways-grid">
            {ways.map((way, index) => (
              <article key={way.title}>
                <span>0{index + 1}</span>
                <h3>{way.title}</h3>
                <p>{way.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container donation-wrap">
        <DonationCallout />
      </div>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Recognition"
            title="Support deserves thoughtful acknowledgment."
            intro="Recognition will be published only with approved names, attribution levels, and permissions."
          />
          <RecognitionGrid />
        </div>
      </section>

      <CTASection
        eyebrow="Start a conversation"
        title="Interested in standing with VLAS?"
        copy="Contact the organization to discuss professional support, sponsorship, or a community partnership."
        primaryHref="/contact"
        primaryLabel="Contact VLAS"
        secondaryHref="/about"
        secondaryLabel="Learn about the mission"
      />
    </>
  )
}

type Fields = {
  name: string
  email: string
  inquiry: string
  message: string
}

const initialFields: Fields = { name: "", email: "", inquiry: "", message: "" }

const inquiryOptions = [
  {
    value: "legal-assistance",
    label: "I am a veteran or family member seeking legal assistance",
  },
  {
    value: "attorney",
    label: "I am an attorney interested in volunteering",
  },
  {
    value: "partnership",
    label: "My firm or organization is interested in partnering",
  },
  {
    value: "donation",
    label: "I would like to make a donation or sponsor VLAS",
  },
  { value: "general", label: "General inquiry" },
]

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (!fields.name.trim()) errors.name = "Enter your full name."
  if (!fields.email.trim()) {
    errors.email = "Enter your email address."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address, such as name@example.org."
  }
  if (!fields.inquiry) errors.inquiry = "Choose an inquiry type."
  if (!fields.message.trim()) errors.message = "Enter a message."
  return errors
}

function InquirySelect({
  value,
  onChange,
  invalid,
  describedBy,
}: {
  value: string
  onChange: (value: string) => void
  invalid: boolean
  describedBy?: string
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const container = useRef<HTMLDivElement>(null)
  const selectedOption = inquiryOptions.find((option) => option.value === value)

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener("pointerdown", closeOnOutsideClick)
    return () => window.removeEventListener("pointerdown", closeOnOutsideClick)
  }, [])

  function openMenu() {
    const selectedIndex = inquiryOptions.findIndex(
      (option) => option.value === value,
    )
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setOpen(true)
  }

  function selectOption(index: number) {
    const option = inquiryOptions[index]
    if (!option) return
    onChange(option.value)
    setOpen(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault()
        openMenu()
      }
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((current) =>
        Math.min(current + 1, inquiryOptions.length - 1),
      )
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
    } else if (event.key === "Home") {
      event.preventDefault()
      setActiveIndex(0)
    } else if (event.key === "End") {
      event.preventDefault()
      setActiveIndex(inquiryOptions.length - 1)
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      selectOption(activeIndex)
    } else if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === "Tab") {
      setOpen(false)
    }
  }

  return (
    <div className={`select-control ${open ? "is-open" : ""}`} ref={container}>
      <button
        id="inquiry-type"
        className="inquiry-select-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="inquiry-options"
        aria-activedescendant={
          open ? `inquiry-option-${activeIndex}` : undefined
        }
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-required="true"
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
      >
        <span
          className={`select-value ${selectedOption ? "" : "is-placeholder"}`}
          key={value || "placeholder"}
        >
          {selectedOption?.label ?? "Select an inquiry type"}
        </span>
        <span className="select-caret" aria-hidden="true" />
      </button>
      <ul
        className="inquiry-options"
        id="inquiry-options"
        role="listbox"
        aria-label="Inquiry type"
        aria-hidden={!open}
      >
        {inquiryOptions.map((option, index) => (
          <li
            id={`inquiry-option-${index}`}
            className={`${index === activeIndex ? "is-active" : ""} ${
              option.value === value ? "is-selected" : ""
            }`}
            key={option.value}
            role="option"
            aria-selected={option.value === value}
            onClick={() => selectOption(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <input type="hidden" name="inquiryType" value={value} />
    </div>
  )
}

export function ContactForm() {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  )
  const [status, setStatus] = useState("")

  function updateField(field: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
    setStatus("")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please correct the highlighted fields and try again.")
      return
    }

    setStatus(
      "This form is not yet connected to an approved delivery service. Your message has not been sent.",
    )
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="form-instructions"
    >
      <p id="form-instructions" className="form-instructions">
        Fields marked <span aria-hidden="true">*</span> are required.
      </p>

      <div className="field-row">
        <div className="field">
          <label htmlFor="full-name">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="full-name"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="inquiry-type">
          Inquiry type <span aria-hidden="true">*</span>
        </label>
        <InquirySelect
          value={fields.inquiry}
          onChange={(value) => updateField("inquiry", value)}
          invalid={Boolean(errors.inquiry)}
          describedBy={errors.inquiry ? "inquiry-error" : undefined}
        />
        {errors.inquiry && (
          <span className="field-error" id="inquiry-error">
            {errors.inquiry}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={7}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          required
        />
        <span className="field-help" id="message-help">
          Do not include sensitive personal, financial, or legal information.
        </span>
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>

      <button className="button button-primary" type="submit">
        Send inquiry
      </button>
      {status && (
        <div className="form-status" role="status" aria-live="polite">
          <ShieldIcon />
          <p>{status}</p>
        </div>
      )}
    </form>
  )
}

export function ContactPage() {
  return (
    <>
      <section
        className="page-hero page-hero-compact contact-page-hero"
        aria-labelledby="contact-details-heading"
      >
        <div className="container">
          <div className="contact-hero-overview">
            <div className="contact-hero-intro">
              <p className="eyebrow eyebrow-light">Contact Us</p>
              <h1 id="contact-details-heading">We’re Here to Help</h1>
              <p>
                Whether you need legal assistance or want to help expand access
                to justice for Illinois veterans, Veterans’ Legal Aid Society
                welcomes your inquiry.
              </p>
            </div>
            <div className="contact-hero-pathways">
              <div className="contact-detail-card">
                <span>Legal Assistance for Veterans</span>
                <AppLink href="tel:18887514377">Call: 1-888-751-4377</AppLink>
              </div>
              <div className="contact-detail-card">
                <span>Partnerships, Donations & General Inquiries</span>
                <AppLink href="mailto:info@veteranslegalaid.org">
                  Email: info@veteranslegalaid.org
                </AppLink>
              </div>
            </div>
            <div className="contact-hero-support">
              <p>
                Attorneys, law firms, corporate legal departments, and community
                organizations interested in supporting our mission are
                encouraged to reach out.
              </p>
              <p>
                <strong>Serving Illinois Veterans and Their Families.</strong>{" "}
                Together, we can help build stronger futures for those who
                served.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-grid">
          <SectionHeading
            eyebrow="Send an inquiry"
            title="How can we direct your message?"
            intro="Whether you’re a veteran seeking legal assistance, an attorney interested in providing pro bono services, or an organization looking to support our mission, we welcome the opportunity to connect."
          />
          <div className="contact-guidance">
            <p>
              Please select the type of inquiry below and share a brief
              description of how we can help. Our team will review your message
              and follow up as appropriate.
            </p>
            <p>
              Illinois veterans seeking legal assistance may also call{" "}
              <AppLink href="tel:18887514377">1-888-751-4377</AppLink>.
            </p>
            <p className="contact-configuration-note">
              <strong>Online form status:</strong> Message delivery is still
              being configured. Until it is connected, please use the phone
              number or email address provided on this page.
            </p>
          </div>
          <div className="form-entry-heading">
            <h2>Begin with a clear conversation.</h2>
            <p>
              Use the form below for general, professional, sponsorship,
              partnership, or media inquiries.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <CTASection
        eyebrow="Support the work"
        title="Looking for another way to connect?"
        copy="Learn about the mission and the ways donors, professionals, and community partners can participate."
        primaryHref="/support"
        primaryLabel="Support our mission"
        secondaryHref="/about"
        secondaryLabel="About VLAS"
      />
    </>
  )
}
