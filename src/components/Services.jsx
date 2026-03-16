import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const SERVICES = [
  {
    number: "01",
    title: "UI Development",
    subtitle: "Pixel-perfect interfaces",
    description:
      "Translating Figma designs into fully responsive, accessible React components. Every spacing decision, every hover state, every breakpoint - deliberate.",
    deliverables: ["Component Library", "Responsive Layouts", "Design Handoff", "Accessibility Audit"],
    duration: "1 - 3 weeks",
    badge: "Most Requested",
  },
  {
    number: "02",
    title: "Web App Build",
    subtitle: "Full frontend, start to finish",
    description:
      "From blank repo to deployed product. Architecture planning, routing, state management, API integration, and performance optimisation - all handled.",
    deliverables: ["Next.js / React App", "State Management", "API Integration", "Vercel Deployment"],
    duration: "3 - 8 weeks",
    badge: null,
  },
  {
    number: "03",
    title: "Performance Audit",
    subtitle: "Speed is a feature",
    description:
      "Deep-dive into your existing site. Bundle analysis, Core Web Vitals, lazy loading strategy, image optimisation, and a prioritised fix roadmap.",
    deliverables: ["Lighthouse Report", "Bundle Analysis", "Fix Roadmap", "Before / After Metrics"],
    duration: "3 - 5 days",
    badge: "Quick Win",
  },
  {
    number: "04",
    title: "Design System",
    subtitle: "Build once, use everywhere",
    description:
      "A documented, scalable token-based design system. Colour, typography, spacing, and components - all consistent, all reusable across your product.",
    deliverables: ["Token Architecture", "Component Docs", "Storybook Setup", "Style Guide"],
    duration: "2 - 4 weeks",
    badge: null,
  },
  {
    number: "05",
    title: "Code Review & Mentorship",
    subtitle: "Level up your team",
    description:
      "Structured code review sessions, pair programming, and frontend best-practice workshops tailored to your team's stack and current gaps.",
    deliverables: ["PR Reviews", "Pair Sessions", "Team Workshop", "Written Feedback"],
    duration: "Ongoing",
    badge: null,
  },
];

const css = `
  .srv {
    background: var(--brown);
    font-family: var(--font-sans);
    overflow: hidden;
    position: relative;
  }

  /* subtle grain on dark bg */
  .srv::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  .srv > * { position: relative; z-index: 1; }

  /* -- BANNER -- */
  .srv-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 48px;
    overflow: hidden;
    border-bottom: 0.5px solid rgba(242,234,211,0.12);
  }

  .srv-banner-word {
    font-family: var(--font-display);
    font-size: clamp(5rem, 18vw, 16rem);
    line-height: 0.85;
    color: var(--cream-light);
    letter-spacing: 0.01em;
    user-select: none;
    text-align: center;
  }

  .srv-banner-sub {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--brown-muted);
    white-space: nowrap;
    pointer-events: none;
  }

  /* -- HEADER -- */
  .srv-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 64px 52px 52px;
    border-bottom: 0.5px solid rgba(242,234,211,0.12);
  }

  .srv-index {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .srv-index-line {
    width: 32px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .srv-index-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .srv-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 0.9;
    color: var(--cream-light);
  }

  .srv-title em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--cream-dark);
  }

  .srv-header-right {
    text-align: right;
    padding-bottom: 8px;
    max-width: 300px;
  }

  .srv-tagline {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 1.05rem;
    line-height: 1.65;
    color: var(--brown-muted);
  }

  /* -- ROADMAP TRACK -- */
  .srv-track {
    padding: 0 52px 80px;
    position: relative;
  }

  /* vertical spine line */
  .srv-track::before {
    content: '';
    position: absolute;
    left: calc(52px + 28px);
    top: 0;
    bottom: 0;
    width: 0.5px;
    background: rgba(242,234,211,0.12);
  }

  /* -- ROADMAP STEP -- */
  .srv-step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 0 36px;
    padding: 52px 0;
    border-bottom: 0.5px solid rgba(242,234,211,0.08);
    position: relative;
    transition: background 0.3s;
  }

  .srv-step:last-child {
    border-bottom: none;
  }

  /* -- NODE -- */
  .srv-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding-top: 6px;
    position: relative;
  }

  .srv-node-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1.5px solid var(--brown-muted);
    background: var(--brown);
    flex-shrink: 0;
    transition: background 0.3s, border-color 0.3s, transform 0.3s;
    position: relative;
    z-index: 2;
  }

  .srv-step:hover .srv-node-dot {
    background: var(--cream-light);
    border-color: var(--cream-light);
    transform: scale(1.4);
  }

  .srv-node-num {
    font-family: var(--font-display);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: rgba(160,112,80,0.5);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    margin-top: 4px;
  }

  /* -- CONTENT -- */
  .srv-content {
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: 32px;
    align-items: start;
  }

  .srv-left {}

  /* top row */
  .srv-top-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 16px;
  }

  .srv-name {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.2rem);
    letter-spacing: 0.02em;
    color: var(--cream-light);
    line-height: 0.95;
    transition: color 0.2s;
  }

  .srv-step:hover .srv-name {
    color: var(--cream-dark);
  }

  .srv-badge {
    font-size: 0.52rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown);
    background: var(--cream-dark);
    padding: 4px 10px;
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 6px;
  }

  .srv-subtitle {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 0.95rem;
    color: var(--brown-muted);
    margin-bottom: 18px;
    letter-spacing: 0.02em;
  }

  .srv-desc {
    font-size: 0.83rem;
    font-weight: 300;
    line-height: 1.85;
    color: rgba(160,112,80,0.8);
    max-width: 520px;
  }

  /* -- RIGHT COL -- */
  .srv-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 6px;
  }

  /* duration pill */
  .srv-duration {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 14px 18px;
    border: 0.5px solid rgba(242,234,211,0.12);
    background: rgba(242,234,211,0.03);
  }

  .srv-duration-label {
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .srv-duration-val {
    font-family: var(--font-display);
    font-size: 1.2rem;
    letter-spacing: 0.06em;
    color: var(--cream-light);
    line-height: 1;
  }

  /* deliverables */
  .srv-deliverables {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .srv-del-label {
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
    margin-bottom: 10px;
  }

  .srv-del-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 0;
    border-top: 0.5px solid rgba(242,234,211,0.08);
    font-size: 0.75rem;
    font-weight: 300;
    color: rgba(242,234,211,0.65);
    letter-spacing: 0.04em;
  }

  .srv-del-tick {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  /* CTA at bottom */
  .srv-cta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 48px 52px;
    border-top: 0.5px solid rgba(242,234,211,0.12);
  }

  .srv-cta-left {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    color: var(--cream-dark);
    line-height: 1.4;
    max-width: 420px;
  }

  .srv-cta-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown);
    background: var(--cream-light);
    border: none;
    padding: 16px 32px;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.25s, gap 0.3s cubic-bezier(0.16,1,0.3,1);
    flex-shrink: 0;
  }

  .srv-cta-btn:hover {
    background: var(--cream-dark);
    gap: 18px;
  }

  /* -- ANIMATE -- */
  .sv-up {
    opacity: 0;
    transform: translateY(28px);
    animation: svUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes svUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* -- RESPONSIVE -- */
  @media (max-width: 900px) {
    .srv-header { padding: 48px 28px 36px; }
    .srv-track { padding: 0 28px 60px; }
    .srv-track::before { left: calc(28px + 28px); }
    .srv-content { grid-template-columns: 1fr; gap: 20px; }
    .srv-right { flex-direction: row; flex-wrap: wrap; }
    .srv-duration { flex: 1; min-width: 120px; }
    .srv-cta-row { padding: 36px 28px; flex-direction: column; gap: 24px; align-items: flex-start; }
  }

  @media (max-width: 600px) {
    .srv-step { grid-template-columns: 36px 1fr; gap: 0 20px; padding: 36px 0; }
    .srv-track::before { left: calc(28px + 18px); }
  }
`;

const CheckIcon = () => (
  <svg className="srv-del-tick" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.25" stroke="rgba(160,112,80,0.4)" strokeWidth="0.5"/>
    <path d="M4.5 7L6.2 8.8L9.5 5.5" stroke="var(--brown-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="var(--brown)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Services() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    gsap.set(el, { opacity: 0, y: 40 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate each service step
  const stepRefs = useRef([]);
  useEffect(() => {
    stepRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(ref, { opacity: 1, y: 0, duration: 0.7, delay: 0.1 * i, ease: "power2.out" });
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      gsap.set(ref, { opacity: 0, y: 32 });
      obs.observe(ref);
    });
  }, []);

  return (
    <>
      <style>{css}</style>
      <section className="srv" id="services" ref={sectionRef}>
        {/* BANNER */}
        <div className="srv-banner sv-up" style={{ animationDelay: "0.0s" }}>
          <h2 className="srv-banner-word">SERVICES</h2>
          <span className="srv-banner-sub">WHAT I OFFER</span>
        </div>
        {/* HEADER */}
        <div className="srv-header sv-up" style={{ animationDelay: "0.1s" }}>
          <div>
            <div className="srv-index">
              <div className="srv-index-line" />
              <span className="srv-index-label">06 &mdash; Services</span>
            </div>
            <h3 className="srv-title">
              How I Can<br /><em>Help You</em>
            </h3>
          </div>
          <div className="srv-header-right">
            <p className="srv-tagline">
              Every engagement starts with understanding the problem.
              Here is what that usually looks like.
            </p>
          </div>
        </div>
        {/* ROADMAP */}
        <div className="srv-track">
          {SERVICES.map((s, i) => (
            <div
              key={s.number}
              className="srv-step sv-up"
              ref={el => stepRefs.current[i] = el}
            >
              {/* NODE */}
              <div className="srv-node">
                <div className="srv-node-dot" />
                <span className="srv-node-num">{s.number}</span>
              </div>
              {/* CONTENT */}
              <div className="srv-content">
                <div className="srv-left">
                  <div className="srv-top-row">
                    <h4 className="srv-name">{s.title}</h4>
                    {s.badge && <span className="srv-badge">{s.badge}</span>}
                  </div>
                  <p className="srv-subtitle">{s.subtitle}</p>
                  <p className="srv-desc">{s.description}</p>
                </div>
                <div className="srv-right">
                  <div className="srv-duration">
                    <span className="srv-duration-label">Timeline</span>
                    <span className="srv-duration-val">{s.duration}</span>
                  </div>
                  <div className="srv-deliverables">
                    <p className="srv-del-label">Deliverables</p>
                    {s.deliverables.map((d) => (
                      <div key={d} className="srv-del-item">
                        <CheckIcon />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="srv-cta-row sv-up" style={{ animationDelay: "0.7s" }}>
          <p className="srv-cta-left">
            Have something in mind that does not fit neatly above?
            Let us talk about it.
          </p>
          <a
            href="mailto:okwumabua25@gmail.com"
            className="srv-cta-btn"
          >
            Start a Conversation
          </a>
        </div>

      </section>
    </>
  );
}