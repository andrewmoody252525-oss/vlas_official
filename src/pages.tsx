import { useState, type FormEvent } from "react"
import {
  AppLink,
  ArrowIcon,
  CTASection,
  HeroSection,
  SectionHeading,
  ShieldIcon,
} from "./components"

const focusAreas = [
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

export function ServiceOverview() {
  return (
    <div className="service-grid">
      {focusAreas.map((item) => (
        <article className="service-card" key={item.number}>
          <p className="card-number">{item.number}</p>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <div className="card-rule" aria-hidden="true" />
        </article>
      ))}
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
        intro="VLAS is an Illinois nonprofit focused on veterans and their families having meaningful access to justice."
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
              justice for veterans and their families—grounded in dignity,
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
            intro="These draft focus areas express the organization’s stated purpose without making unverified service claims. Final program language remains subject to client approval."
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
              VLAS seeks to make legal systems and support pathways easier to
              understand and navigate while building the relationships needed
              for durable, practical access to justice.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="container history-grid">
          <div className="history-label">
            <p className="eyebrow">Our history</p>
            <span aria-hidden="true">VLAS</span>
          </div>
          <div>
            <h2>A history that should be told with precision.</h2>
            <p>
              The organization’s founding story and verified milestones were not
              included in the supplied materials. This section is intentionally
              reserved for an approved organizational history rather than
              inferred dates or accomplishments.
            </p>
            <div className="editorial-note">
              <strong>Client content required</strong>
              <span>
                Founding date, key milestones, leadership history, and approved
                source language.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Work organized around meaningful access."
            intro="Final service and program descriptions should be confirmed before publication."
          />
          <ServiceOverview />
        </div>
      </section>

      <section className="section trust-section">
        <div className="container trust-grid">
          <div>
            <p className="eyebrow eyebrow-light">Patriot Pooled Trust</p>
            <h2>A dedicated place for an important relationship.</h2>
          </div>
          <div>
            <p className="trust-lead">
              Client-approved information describing the Patriot Pooled Trust
              and its verified relationship with VLAS is required for this
              section.
            </p>
            <p>
              No operational, legal, financial, or organizational details have
              been inferred from the name alone. Once approved source material
              is supplied, this section can clearly explain the relationship and
              direct visitors to the appropriate next step.
            </p>
            <div className="editorial-note editorial-note-dark">
              <strong>Editorial placeholder</strong>
              <span>
                Relationship description, approved terminology, and destination
                link are needed.
              </span>
            </div>
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
        <select
          id="inquiry-type"
          value={fields.inquiry}
          onChange={(event) => updateField("inquiry", event.target.value)}
          aria-invalid={Boolean(errors.inquiry)}
          aria-describedby={errors.inquiry ? "inquiry-error" : undefined}
          required
        >
          <option value="">Select an inquiry type</option>
          <option value="general">General inquiry</option>
          <option value="professional">Professional support</option>
          <option value="sponsorship">Sponsorship or partnership</option>
          <option value="media">Media inquiry</option>
        </select>
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
      <HeroSection
        eyebrow="Contact Us"
        title="Begin with a clear conversation."
        intro="Use the form below for general, professional, sponsorship, partnership, or media inquiries."
        compact
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <SectionHeading
              eyebrow="Send an inquiry"
              title="How can we direct your message?"
              intro="The form is prepared for an approved delivery integration. Until one is connected, it will not transmit or store submissions."
            />
            <ContactForm />
          </div>
          <aside
            className="contact-aside"
            aria-labelledby="contact-details-heading"
          >
            <p className="eyebrow eyebrow-light">Contact details</p>
            <h2 id="contact-details-heading">
              Approved details are still needed.
            </h2>
            <p>
              A verified email address, telephone number, mailing address,
              office hours, and response-time expectations were not included in
              the supplied materials.
            </p>
            <div className="contact-detail-card">
              <span>Publication status</span>
              <strong>Pending client approval</strong>
            </div>
            <p className="aside-note">
              Any public-facing legal notices or relationship disclaimers
              require client and legal approval before publication.
            </p>
          </aside>
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
