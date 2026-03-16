import { useRef, useEffect } from "react";
import { gsap } from "gsap";
const CASES = [
  {
    number: "01",
    client: "FinTrack Ltd.",
    title: "Dashboard Rebuild",
    category: "Web App",
    year: "2024",
    size: "large",
    description:
      "Rewrote a legacy jQuery dashboard into a fully componentised React application. Reduced bundle size by 62%, cut load time from 8s to 1.4s, and shipped a new design system used across three internal products.",
    outcome: "62% smaller bundle",
    stack: ["React", "TypeScript", "Recharts", "Vite"],
    link: "#",
  },
  {
    number: "02",
    client: "Sola Skincare",
    title: "E-Commerce Storefront",
    category: "Frontend",
    year: "2024",
    size: "small",
    description:
      "Built a headless Shopify storefront in Next.js with custom animations, a wishlist feature, and a mobile-first checkout flow that improved conversion by 28%.",
    outcome: "+28% conversion",
    stack: ["Next.js", "Shopify", "Framer Motion"],
    link: "#",
  },
  {
    number: "03",
    client: "Kode Agency",
    title: "Template System",
    category: "System Design",
    year: "2023",
    size: "small",
    description:
      "Designed and built a reusable Next.js project template system used to deliver 12+ client sites in under 3 months - cutting per-project setup from 2 days to 2 hours.",
    outcome: "12 sites shipped",
    stack: ["Next.js", "SCSS", "Sanity.io"],
    link: "#",
  },
  {
    number: "04",
    client: "Noval Health",
    title: "Patient Portal UI",
    category: "UI Engineering",
    year: "2023",
    size: "large",
    description:
      "Led frontend development for a HIPAA-conscious patient portal. Built accessible form flows, appointment scheduling, and a medication tracker - all with full keyboard and screen reader support.",
    outcome: "WCAG 2.1 AA",
    stack: ["React", "Tailwind CSS", "Supabase", "Jest"],
    link: "#",
  },
  {
    number: "05",
    client: "Vyne Studios",
    title: "Portfolio & CMS",
    category: "Frontend",
    year: "2022",
    size: "small",
    description:
      "Designed and built a Sanity-powered portfolio for a motion design studio. Full CMS control for the client, GSAP scroll animations, and a 98 Lighthouse performance score.",
    outcome: "98 Lighthouse score",
    stack: ["Next.js", "Sanity.io", "GSAP"],
    link: "#",
  },
  {
    number: "06",
    client: "BrightPath EdTech",
    title: "Learning Platform Launch",
    category: "EdTech",
    year: "2025",
    size: "large",
    description:
      "Architected and launched a scalable online learning platform for a startup. Integrated real-time progress tracking, gamified achievements, and responsive course modules, resulting in 4,000+ active users in the first quarter.",
    outcome: "4,000+ users Q1",
    stack: ["React", "Node.js", "MongoDB", "GSAP"],
    link: "#",
  },
];

const css = `
  .cs {
    background: var(--cream-light);
    font-family: var(--font-sans);
    overflow: hidden;
  }

  /* -- BANNER -- */
  .cs-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 48px;
    overflow: hidden;
    background: var(--brown);
    border-bottom: 0.5px solid rgba(242,234,211,0.12);
  }

  .cs-banner-word {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 14vw, 13rem);
    line-height: 0.85;
    color: var(--cream-light);
    letter-spacing: 0.01em;
    user-select: none;
    text-align: center;
  }

  .cs-banner-sub {
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
  .cs-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 64px 52px 52px;
  }

  .cs-index {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .cs-index-line {
    width: 32px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .cs-index-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .cs-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 0.9;
    color: var(--brown);
  }

  .cs-title em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--brown-soft);
  }

  .cs-header-right {
    text-align: right;
    padding-bottom: 8px;
  }

  .cs-count {
    font-family: var(--font-display);
    font-size: 3.5rem;
    line-height: 1;
    color: var(--brown);
  }

  .cs-count-label {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
    margin-top: 4px;
  }

  /* -- MASONRY GRID -- */
  .cs-grid {
    padding: 0 52px 80px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: auto;
    gap: 20px;
  }

  /* large card spans 7 cols */
  .cs-card.large {
    grid-column: span 7;
  }

  /* small card spans 5 cols */
  .cs-card.small {
    grid-column: span 5;
  }

  /* alternate large/small pairs so rows feel offset */
  .cs-card:nth-child(4) { grid-column: span 5; }
    .cs-card:nth-child(5), .cs-card:nth-child(6) { grid-column: span 6; }

  /* -- CARD -- */
  .cs-card {
    background: var(--cream);
    border: 0.5px solid var(--cream-dark);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  .cs-card:hover {
    border-color: var(--brown-muted);
    transform: translateY(-4px);
  }

  /* card image placeholder */
  .cs-card-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--cream-dark);
    position: relative;
    overflow: hidden;
    border-bottom: 0.5px solid rgba(160,112,80,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }

  .cs-card.large .cs-card-img {
    aspect-ratio: 16 / 8;
  }

  .cs-card-img::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 12px,
      rgba(28,15,7,0.03) 12px,
      rgba(28,15,7,0.03) 13px
    );
  }

  .cs-card-img-num {
    font-family: var(--font-display);
    font-size: 4rem;
    color: rgba(28,15,7,0.08);
    position: relative;
    z-index: 1;
    line-height: 1;
  }

  .cs-card.large .cs-card-img-num {
    font-size: 6rem;
  }

  .cs-outcome-pill {
    position: absolute;
    bottom: 14px;
    right: 14px;
    background: var(--brown);
    color: var(--cream-light);
    font-size: 0.55rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 5px 12px;
    z-index: 2;
  }

  /* card body */
  .cs-card-body {
    padding: 22px 24px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
  }

  .cs-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .cs-client {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .cs-meta-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .cs-category {
    font-size: 0.52rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--brown-soft);
    border: 0.5px solid var(--cream-dark);
    padding: 2px 8px;
    background: var(--cream-light);
  }

  .cs-year {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: var(--brown-muted);
    opacity: 0.6;
  }

  .cs-name {
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    letter-spacing: 0.03em;
    color: var(--brown);
    line-height: 0.95;
    transition: color 0.2s;
  }

  .cs-card.large .cs-name {
    font-size: clamp(1.8rem, 3vw, 2.6rem);
  }

  .cs-card:hover .cs-name {
    color: var(--brown-soft);
  }

  .cs-desc {
    font-size: 0.78rem;
    font-weight: 300;
    line-height: 1.8;
    color: var(--brown-muted);
    flex: 1;
  }

  .cs-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 4px;
  }

  .cs-tag {
    font-size: 0.55rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--brown-soft);
    border: 0.5px solid var(--cream-dark);
    padding: 3px 8px;
    background: var(--cream-light);
  }

  /* card footer */
  .cs-card-footer {
    padding: 12px 24px;
    border-top: 0.5px solid var(--cream-dark);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cs-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--brown);
    text-decoration: none;
    transition: gap 0.25s cubic-bezier(0.16,1,0.3,1);
  }

  .cs-link:hover { gap: 13px; }

  .cs-number {
    font-family: var(--font-display);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: rgba(28,15,7,0.15);
  }

  /* -- ANIMATE -- */
  .cv-up {
    opacity: 0;
    transform: translateY(28px);
    animation: cvUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes cvUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* -- RESPONSIVE -- */
  @media (max-width: 960px) {
    .cs-grid { grid-template-columns: repeat(2, 1fr); padding: 0 28px 60px; }
    .cs-card.large,
    .cs-card.small,
    .cs-card:nth-child(4),
    .cs-card:nth-child(5) { grid-column: span 1; }
    .cs-header { padding: 48px 28px 36px; }
  }

  @media (max-width: 600px) {
    .cs-grid { grid-template-columns: 1fr; padding: 0 24px 52px; }
    .cs-header { padding: 40px 24px 28px; flex-direction: column; align-items: flex-start; gap: 16px; }
  }
`;

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="var(--brown)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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

  useEffect(() => {
    cardRefs.current.forEach((ref, i) => {
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
      <section className="cs" id="casestudies" ref={sectionRef}>
        {/* BANNER */}
        <div className="cs-banner cv-up" style={{ animationDelay: "0.0s" }}>
          <h2 className="cs-banner-word">CASE STUDIES</h2>
          <span className="cs-banner-sub">CLIENT WORK</span>
        </div>
        {/* HEADER */}
        <div className="cs-header cv-up" style={{ animationDelay: "0.1s" }}>
          <div>
            <div className="cs-index">
              <div className="cs-index-line" />
              <span className="cs-index-label">07 &mdash; Case Studies</span>
            </div>
            <h3 className="cs-title">
              Real Work,<br /><em>Real Results</em>
            </h3>
          </div>
          <div className="cs-header-right">
            <div className="cs-count">{CASES.length}</div>
            <div className="cs-count-label">Client Projects</div>
          </div>
        </div>
        {/* MASONRY GRID */}
        <div className="cs-grid">
          {CASES.map((c, i) => (
            <div
              key={c.number}
              className={`cs-card ${c.size} cv-up`}
              ref={el => cardRefs.current[i] = el}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              {/* IMAGE */}
              <div className="cs-card-img">
                <span className="cs-card-img-num">{c.number}</span>
                <span className="cs-outcome-pill">{c.outcome}</span>
              </div>
              {/* BODY */}
              <div className="cs-card-body">
                <div className="cs-card-top">
                  <span className="cs-client">{c.client}</span>
                  <div className="cs-meta-right">
                    <span className="cs-category">{c.category}</span>
                    <span className="cs-year">{c.year}</span>
                  </div>
                </div>
                <h4 className="cs-name">{c.title}</h4>
                <p className="cs-desc">{c.description}</p>
                <div className="cs-stack">
                  {c.stack.map((s) => (
                    <span key={s} className="cs-tag">{s}</span>
                  ))}
                </div>
              </div>
              {/* FOOTER */}
              <div className="cs-card-footer">
                <span className="cs-number">{c.number}</span>
                <a
                  href={c.link}
                  className="cs-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Case Study
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}