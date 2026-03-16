import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const EXPERIENCE = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "TechNova Studio",
    type: "Full-time",
    period: "2023 - Present",
    location: "Remote",
    summary: "Leading frontend development for client-facing SaaS products, owning the component architecture and design system.",
    bullets: [
      "Built and maintained a React component library used across 4 products.",
      "Reduced page load times by 38% through code splitting and lazy loading.",
      "Collaborated directly with designers in Figma to ship pixel-perfect UIs.",
      "Introduced TypeScript across the codebase, cutting runtime errors by 60%.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: 2,
    role: "UI Engineer",
    company: "Kode Agency",
    type: "Contract",
    period: "2022 - 2023",
    location: "Lagos, NG",
    summary: "Contracted to rebuild the agency's client delivery workflow, converting static mockups into fully responsive Next.js sites.",
    bullets: [
      "Delivered 12+ client websites from design handoff to deployment.",
      "Built a reusable template system that cut project setup time by 50%.",
      "Integrated headless CMS solutions (Sanity, Contentful) for non-technical clients.",
      "Mentored 2 junior developers on React best practices.",
    ],
    stack: ["Next.js", "Sanity.io", "SCSS", "Framer Motion"],
  },
  {
    id: 3,
    role: "Frontend Intern",
    company: "Pixel & Co.",
    type: "Internship",
    period: "2021 - 2022",
    location: "Lagos, NG",
    summary: "First professional role - worked across the full frontend stack, learning production standards and agile workflows.",
    bullets: [
      "Contributed to a React dashboard used by 200+ internal users.",
      "Wrote unit tests with Jest, achieving 80% coverage on assigned modules.",
      "Participated in daily standups and bi-weekly sprint planning.",
      "Rebuilt legacy jQuery components into modern React functional components.",
    ],
    stack: ["React", "JavaScript", "CSS", "Jest"],
  },
];

const css = `
  .exp {
    background: var(--cream-light);
    font-family: var(--font-sans);
    overflow: hidden;
  }

  /* -- BANNER -- */
  .exp-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 48px;
    overflow: hidden;
    border-bottom: 0.5px solid var(--cream-dark);
  }

  .exp-banner-word {
    font-family: var(--font-display);
    font-size: clamp(5rem, 18vw, 16rem);
    line-height: 0.85;
    color: var(--brown);
    letter-spacing: 0.01em;
    user-select: none;
    text-align: center;
  }

  .exp-banner-sub {
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

  /* -- SECTION HEADER -- */
  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 64px 52px 52px;
  }

  .exp-index {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .exp-index-line {
    width: 32px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .exp-index-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .exp-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 0.9;
    color: var(--brown);
  }

  .exp-title em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--brown-soft);
  }

  .exp-header-right {
    padding-bottom: 8px;
    text-align: right;
  }

  .exp-count {
    font-family: var(--font-display);
    font-size: 3.5rem;
    line-height: 1;
    color: var(--brown);
  }

  .exp-count-label {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
    margin-top: 4px;
  }

  /* -- ACCORDION LIST -- */
  .exp-list {
    padding: 0 52px 80px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* -- ACCORDION ITEM -- */
  .exp-item {
    border-top: 0.5px solid var(--cream-dark);
    overflow: hidden;
  }

  .exp-item:last-child {
    border-bottom: 0.5px solid var(--cream-dark);
  }

  /* -- TRIGGER -- */
  .exp-trigger {
    width: 100%;
    display: grid;
    grid-template-columns: 52px 1fr auto;
    align-items: center;
    gap: 20px;
    padding: 28px 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.25s;
  }

  .exp-trigger:hover {
    background: rgba(28,15,7,0.02);
  }

  .exp-num {
    font-family: var(--font-display);
    font-size: 1rem;
    letter-spacing: 0.12em;
    color: var(--brown-muted);
    flex-shrink: 0;
  }

  .exp-trigger-main {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .exp-role {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3.5vw, 2.6rem);
    letter-spacing: 0.03em;
    color: var(--brown);
    line-height: 1;
    transition: color 0.2s;
  }

  .exp-trigger:hover .exp-role {
    color: var(--brown-soft);
  }

  .exp-company-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .exp-company {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    color: var(--brown-muted);
    font-weight: 400;
  }

  .exp-type-badge {
    font-size: 0.52rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--brown-soft);
    border: 0.5px solid var(--cream-dark);
    padding: 2px 8px;
    background: var(--cream);
  }

  .exp-trigger-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;
  }

  .exp-period {
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    color: var(--brown-muted);
    text-transform: uppercase;
  }

  .exp-location {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    color: var(--brown-muted);
    opacity: 0.7;
  }

  /* plus/minus icon */
  .exp-icon {
    width: 20px;
    height: 20px;
    position: relative;
    flex-shrink: 0;
    margin-top: 6px;
  }

  .exp-icon::before,
  .exp-icon::after {
    content: '';
    position: absolute;
    background: var(--brown-muted);
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
  }

  .exp-icon::before {
    width: 14px; height: 1px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .exp-icon::after {
    width: 1px; height: 14px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .exp-item.open .exp-icon::after {
    transform: translate(-50%, -50%) rotate(90deg);
    opacity: 0;
  }

  /* -- BODY -- */
  .exp-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s cubic-bezier(0.16,1,0.3,1);
  }

  .exp-item.open .exp-body {
    grid-template-rows: 1fr;
  }

  .exp-body-inner {
    overflow: hidden;
  }

  .exp-body-content {
    display: grid;
    grid-template-columns: 52px 1fr 280px;
    gap: 20px;
    padding-bottom: 36px;
  }

  .exp-body-spacer {
    /* aligns with the number column */
  }

  .exp-summary {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 1.05rem;
    line-height: 1.65;
    color: var(--brown-mid);
    margin-bottom: 20px;
  }

  .exp-bullets {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .exp-bullet {
    display: flex;
    gap: 12px;
    font-size: 0.82rem;
    font-weight: 300;
    line-height: 1.7;
    color: var(--brown-muted);
  }

  .exp-bullet::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--brown-muted);
    flex-shrink: 0;
    margin-top: 9px;
  }

  /* right col - stack */
  .exp-stack-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 4px;
  }

  .exp-stack-label {
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
    margin-bottom: 4px;
  }

  .exp-stack-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .exp-tag {
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--brown-soft);
    border: 0.5px solid var(--cream-dark);
    padding: 4px 10px;
    background: var(--cream);
  }

  /* -- ANIMATE -- */
  .ex-up {
    opacity: 0;
    transform: translateY(28px);
    animation: exUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes exUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* -- RESPONSIVE -- */
  @media (max-width: 860px) {
    .exp-header { padding: 48px 28px 36px; }
    .exp-list { padding: 0 28px 60px; }
    .exp-trigger { grid-template-columns: 36px 1fr auto; }
    .exp-body-content { grid-template-columns: 36px 1fr; }
    .exp-stack-col { grid-column: 2; }
  }

  @media (max-width: 600px) {
    .exp-banner-word { font-size: clamp(4rem, 22vw, 7rem); }
    .exp-trigger { grid-template-columns: 1fr auto; padding: 22px 0; }
    .exp-num { display: none; }
    .exp-body-content { grid-template-columns: 1fr; }
    .exp-body-spacer { display: none; }
  }
`;

export default function Experience() {
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

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

  return (
    <>
      <style>{css}</style>
      <section className="exp" id="experience" ref={sectionRef}>
        {/* BANNER */}
        <div className="exp-banner ex-up" style={{ animationDelay: "0.05s" }}>
          <h2 className="exp-banner-word">EXPERIENCE</h2>
          <span className="exp-banner-sub">MY JOURNEY</span>
        </div>
        {/* HEADER */}
        <div className="exp-header ex-up" style={{ animationDelay: "0.15s" }}>
          <div>
            <div className="exp-index">
              <div className="exp-index-line" />
              <span className="exp-index-label">05 &mdash; Experience</span>
            </div>
            <h3 className="exp-title">
              Where I've<br /><em>Been</em>
            </h3>
          </div>
          <div className="exp-header-right">
            <div className="exp-count">{EXPERIENCE.length}</div>
            <div className="exp-count-label">Roles</div>
          </div>
        </div>

        {/* ACCORDION */}
        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <div
              key={e.id}
              className={`exp-item ex-up${openId === e.id ? " open" : ""}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              {/* TRIGGER */}
              <button
                className="exp-trigger"
                onClick={() => toggle(e.id)}
                aria-expanded={openId === e.id}
              >
                <span className="exp-num">0{i + 1}</span>

                <div className="exp-trigger-main">
                  <span className="exp-role">{e.role}</span>
                  <div className="exp-company-row">
                    <span className="exp-company">{e.company}</span>
                    <span className="exp-type-badge">{e.type}</span>
                  </div>
                </div>

                <div className="exp-trigger-right">
                  <span className="exp-period">{e.period}</span>
                  <span className="exp-location">{e.location}</span>
                  <div className="exp-icon" aria-hidden="true" />
                </div>
              </button>

              {/* BODY */}
              <div className="exp-body" aria-hidden={openId !== e.id}>
                <div className="exp-body-inner">
                  <div className="exp-body-content">
                    <div className="exp-body-spacer" />

                    <div>
                      <p className="exp-summary">{e.summary}</p>
                      <ul className="exp-bullets">
                        {e.bullets.map((b, j) => (
                          <li key={j} className="exp-bullet">{b}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="exp-stack-col">
                      <p className="exp-stack-label">Stack</p>
                      <div className="exp-stack-tags">
                        {e.stack.map((s) => (
                          <span key={s} className="exp-tag">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}