import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    number: "01",
    skills: [
      { name: "React.js",      level: "Expert",     pct: 95 },
      { name: "Next.js",       level: "Expert",     pct: 90 },
      { name: "Framer Motion", level: "Mid",        pct: 72 },
      { name: "Redux",         level: "Mid",        pct: 68 },
    ],
  },
  {
    id: "styling",
    label: "Styling",
    number: "02",
    skills: [
      { name: "Tailwind CSS",  level: "Expert",     pct: 95 },
      { name: "CSS / SCSS",    level: "Expert",     pct: 92 },
      { name: "Styled Comp.",  level: "Mid",        pct: 75 },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    number: "03",
    skills: [
      { name: "JavaScript",    level: "Expert",     pct: 93 },
      { name: "TypeScript",    level: "Mid",        pct: 78 },
      { name: "HTML5",         level: "Expert",     pct: 98 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    number: "04",
    skills: [
      { name: "Git / GitHub",  level: "Expert",     pct: 90 },
      { name: "Figma",         level: "Mid",        pct: 70 },
      { name: "VS Code",       level: "Expert",     pct: 96 },
      { name: "Vite",          level: "Mid",        pct: 74 },
    ],
  },
  {
    id: "devops",
    label: "Testing & DevOps",
    number: "05",
    skills: [
      { name: "Jest",          level: "Mid",        pct: 65 },
      { name: "Vitest",        level: "Beginner",   pct: 45 },
      { name: "Vercel / CI",   level: "Mid",        pct: 72 },
      { name: "Docker",        level: "Beginner",   pct: 38 },
    ],
  },
];

const LEVEL_DOTS = { Expert: 3, Mid: 2, Beginner: 1 };

const css = `
  .skills {
    background: var(--cream-light);
    padding: 100px 0;
    font-family: var(--font-sans);
  }

  /* -- HEADER -- */
  .skills-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 0 52px;
    margin-bottom: 72px;
    position: relative;
  }

  .skills-header-right {
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
    padding-bottom: 8px;
  }
  }

  .skills-index {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .skills-index-line {
    width: 32px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .skills-index-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .skills-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 0.9;
    color: var(--brown);
  }

  .skills-title em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--brown-soft);
  }

  .skills-header-right {
    text-align: right;
    padding-bottom: 8px;
  }

  .skills-total {
    font-family: var(--font-display);
    font-size: 3.5rem;
    line-height: 1;
    color: var(--brown);
    letter-spacing: 0.04em;
  }

  .skills-total-label {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
    margin-top: 4px;
  }

  /* -- GRID -- */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 0.5px solid var(--cream-dark);
    border-left: 0.5px solid var(--cream-dark);
  }

  /* last row: 2 cols centred - handled via nth-child */
  .skills-category {
    padding: 40px 44px;
    border-right: 0.5px solid var(--cream-dark);
    border-bottom: 0.5px solid var(--cream-dark);
    transition: background 0.3s;
  }

  .skills-category:hover {
    background: var(--cream);
  }

  /* -- CATEGORY HEADER -- */
  .cat-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .cat-number {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .cat-label {
    font-family: var(--font-display);
    font-size: 1.5rem;
    letter-spacing: 0.06em;
    color: var(--brown);
    line-height: 1;
  }

  /* -- SKILL ROW -- */
  .skill-row {
    margin-bottom: 20px;
  }

  .skill-row:last-child {
    margin-bottom: 0;
  }

  .skill-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .skill-name {
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--brown-mid);
    letter-spacing: 0.04em;
  }

  .skill-level {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .skill-level-text {
    font-size: 0.55rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .skill-dots {
    display: flex;
    gap: 3px;
  }

  .skill-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 0.5px solid var(--brown-muted);
    background: transparent;
    transition: background 0.3s;
  }

  .skill-dot.filled {
    background: var(--brown);
    border-color: var(--brown);
  }

  /* -- PROGRESS BAR -- */
  .skill-bar-track {
    width: 100%;
    height: 2px;
    background: var(--cream-dark);
    position: relative;
    overflow: hidden;
  }

  .skill-bar-fill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    background: var(--brown);
    width: 0%;
    transition: width 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* -- LEGEND -- */
  .skills-legend {
    display: flex;
    align-items: center;
    gap: 28px;
    padding: 32px 52px 0;
    margin-top: 8px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .legend-dots {
    display: flex;
    gap: 3px;
  }

  .legend-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 0.5px solid var(--brown-muted);
  }

  .legend-dot.filled {
    background: var(--brown);
    border-color: var(--brown);
  }

  .legend-label {
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }


  /* -- BANNER -- */
  .skills-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 48px;
    overflow: hidden;
    background: var(--brown);
    border-bottom: 0.5px solid rgba(242,234,211,0.12);
  }

  .skills-banner-word {
    font-family: var(--font-display);
    font-size: clamp(5rem, 18vw, 16rem);
    line-height: 0.85;
    color: var(--cream-light);
    letter-spacing: 0.01em;
    user-select: none;
    text-align: center;
  }

  .skills-banner-sub {
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

  /* -- ANIMATE -- */
  .sk-up {
    opacity: 0;
    transform: translateY(28px);
    animation: skUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes skUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* -- RESPONSIVE -- */
  @media (max-width: 960px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .skills-header { padding: 0 28px; }
    .skills-legend { padding: 28px 28px 0; }
  }

  @media (max-width: 600px) {
    .skills { padding: 48px 0; }
    .skills-grid { grid-template-columns: 1fr; }
    .skills-category { padding: 16px 10px; }
    .skills-title { font-size: clamp(2rem, 7vw, 3.2rem); }
    .cat-label { font-size: 1.1rem; }
    .skills-header { padding: 0 12px; flex-direction: column; align-items: flex-start; gap: 14px; }
    .skills-legend { padding: 18px 12px 0; margin-top: 4px; }
  }
`;

/* Animate bars when category scrolls into view */
function CategoryCard({ cat, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="skills-category sk-up"
      style={{ animationDelay: delay }}
    >
      <div className="cat-head">
        <span className="cat-label">{cat.label}</span>
        <span className="cat-number">{cat.number}</span>
      </div>

      {cat.skills.map((sk) => {
        const dots = LEVEL_DOTS[sk.level];
        return (
          <div key={sk.name} className="skill-row">
            <div className="skill-meta">
              <span className="skill-name">{sk.name}</span>
              <div className="skill-level">
                <span className="skill-level-text">{sk.level}</span>
                <div className="skill-dots">
                  {[1, 2, 3].map((d) => (
                    <div
                      key={d}
                      className={`skill-dot${d <= dots ? " filled" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                style={{ width: visible ? `${sk.pct}%` : "0%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const totalSkills = CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0);

export default function Skills() {
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

  return (
    <>
      <style>{css}</style>
      <section className="skills" id="skills" ref={sectionRef}>
        {/* BANNER */}
        <div className="skills-banner sk-up" style={{ animationDelay: "0.0s" }}>
          <h2 className="skills-banner-word" style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}>CAREER</h2>
          <span className="skills-banner-sub">MY ARSENAL</span>
        </div>
        {/* HEADER */}
        <div className="skills-header sk-up" style={{ animationDelay: "0.05s" }}>
          <div>
            <div className="skills-index">
              <div className="skills-index-line" />
              <span className="skills-index-label">04 &mdash; Skills</span>
            </div>
            <h2 className="skills-title">
              What I<br /><em>Bring</em>
            </h2>
          </div>
          <div className="skills-header-right">
            <div className="skills-total">{totalSkills}</div>
            <div className="skills-total-label">Skills Listed</div>
          </div>
        </div>
        {/* GRID */}
        <div className="skills-grid">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              delay={`${0.1 + i * 0.08}s`}
            />
          ))}
        </div>
        {/* LEGEND */}
        <div className="skills-legend sk-up" style={{ animationDelay: "0.6s" }}>
          {['Beginner', 'Mid', 'Expert'].map((lvl) => {
            const dots = LEVEL_DOTS[lvl];
            return (
              <div key={lvl} className="legend-item">
                <div className="legend-dots">
                  {[1, 2, 3].map((d) => (
                    <div
                      key={d}
                      className={`legend-dot${d <= dots ? ' filled' : ''}`}
                    />
                  ))}
                </div>
                <span className="legend-label">{lvl}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}