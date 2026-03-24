import { useState, useEffect } from "react";
import nscImg from '../assets/NSC.png';

/* -- DATA -- */
const ROWS = [
  { role: "Frontend Developer", name: "NONA", band: false },
  { role: "UI Engineer",        name: "SIEH",    band: false },
  { role: "React Specialist",   name: "CODES", band: true },
];

const STACK = ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"];

/* -- STYLES -- */
const css = `
  .hero {
    position: relative;
    min-height: 100vh;
    background: var(--cream-light);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
  }

  /* -- META - top right -- */
  .hero-meta {
    position: absolute;
    top: calc(var(--nav-height) + 28px);
    right: 52px;
    text-align: right;
    z-index: 5;
  }

  .hero-meta-index {
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
    margin-bottom: 8px;
  }

  .hero-meta-name {
    font-family: var(--font-display);
    font-size: 0.95rem;
    letter-spacing: 0.1em;
    color: var(--brown);
    margin-bottom: 12px;
  }

  .hero-stack {
    list-style: none;
  }

  .hero-stack li {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--brown-muted);
    line-height: 2;
    transition: color 0.2s;
  }

  .hero-stack li.active {
    color: var(--brown);
    font-weight: 500;
  }

  /* -- IMAGE CARD - right side -- */
  .hero-image {
    position: absolute;
    right: 52px;
    bottom: 110px;
    width: 200px;
    height: 255px;
    z-index: 5;
    overflow: hidden;
    border: 1px solid var(--brown-muted);
  }

  .hero-image-fill {
    width: 100%;
    height: 100%;
    background: linear-gradient(160deg, var(--cream-dark) 0%, #B8895A 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .hero-image-fill::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 9px,
      rgba(28,15,7,0.04) 9px,
      rgba(28,15,7,0.04) 10px
    );
  }

  .hero-image-initials {
    font-family: var(--font-display);
    font-size: 3.5rem;
    color: rgba(28,15,7,0.18);
    position: relative;
    z-index: 1;
    letter-spacing: 0.06em;
  }

  .hero-image-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: var(--brown);
    color: var(--cream-light);
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 8px 12px;
    text-align: center;
  }

  /* -- NAME ROWS -- */
  .hero-names {
    position: relative;
    z-index: 4;
    width: 100%;
  }

  .hero-row {
    display: flex;
    align-items: center;
    padding: 0 52px;
    border-top: 0.5px solid rgba(160,112,80,0.15);
    cursor: default;
    transition: background 0.2s;
  }

  .hero-row:hover:not(.hero-row--band) {
    background: rgba(28,15,7,0.02);
  }

  .hero-row--band {
    background: var(--brown);
  }

  .hero-role {
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
    min-width: 170px;
    flex-shrink: 0;
    transition: color 0.2s;
  }

  .hero-row--band .hero-role {
    color: rgba(160,112,80,0.6);
  }

  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(4.5rem, 11vw, 9rem);
    line-height: 0.9;
    letter-spacing: 0.01em;
    color: var(--brown);
    padding: 10px 0;
    display: inline-block;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  .hero-row:not(.hero-row--band):hover .hero-name {
    transform: translateX(16px);
  }

  .hero-row--band .hero-name {
    color: var(--cream-light);
  }

  /* -- BOTTOM BAR -- */
  .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 52px;
    border-top: 0.5px solid var(--cream-dark);
    position: relative;
    z-index: 4;
    background: var(--cream-light);
  }

  .hero-tagline {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 0.92rem;
    color: var(--brown-soft);
    letter-spacing: 0.03em;
  }

  .hero-socials {
    display: flex;
    gap: 28px;
    list-style: none;
  }

  .hero-socials a {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .hero-socials a:hover {
    color: var(--brown);
  }

  /* -- SCROLL INDICATOR -- */
  .hero-scroll {
    position: absolute;
    left: 52px;
    bottom: 68px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 5;
  }

  .hero-scroll-line {
    width: 36px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .hero-scroll-text {
    font-size: 0.58rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  /* -- FADE IN -- */
  .h-up {
    opacity: 0;
    transform: translateY(26px);
    animation: hUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes hUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* -- RESPONSIVE -- */

  /* hide inline PC/UI images on mobile */
  .hero-inline-img {
    display: inline-block;
  }

  /* mobile portrait card top-left */
  .hero-mobile-portrait {
    display: none;
  }

  @media (max-width: 768px) {
    .hero-meta { right: 24px; top: calc(var(--nav-height) + 56px); }
    .hero-image { display: none; }
    .hero-row { padding: 0 24px; }
    .hero-role { min-width: 90px; font-size: 0.48rem; }
    .hero-bottom { padding: 16px 24px; flex-direction: column; gap: 10px; text-align: center; }
    .hero-scroll { left: 24px; }

    /* hide inline images beside names */
    .hero-inline-img { display: none !important; }

    /* shrink OKWUMABUA to fit */
    .hero-name { font-size: clamp(2.6rem, 9.5vw, 9rem); }

    /* show portrait top-left */
    .hero-mobile-portrait {
      display: block;
      position: absolute;
      top: calc(var(--nav-height) + 56px);
      left: 24px;
      width: 160px;
      height: 200px;
      overflow: hidden;
      border: 1px solid var(--brown-muted);
      z-index: 5;
    }

    .hero-mobile-portrait img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-mobile-portrait-caption {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      background: var(--brown);
      color: var(--cream-light);
      font-size: 0.42rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      padding: 4px 6px;
      text-align: center;
    }
  }
`;

/* -- COMPONENT -- */
export default function Hero() {
  const [activeStack, setActiveStack] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveStack((p) => (p + 1) % STACK.length);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{css}</style>

      <section className="hero" id="hero">

        {/* MOBILE PORTRAIT - top left, mobile only */}
        <div className="hero-mobile-portrait">
          <img src={nscImg} alt="Nona portrait" />
          <div className="hero-mobile-portrait-caption">NSC</div>
        </div>

        {/* META */}
        <div className="hero-meta h-up" style={{ animationDelay: "0.2s" }}>
          <p className="hero-meta-index">[ 01 ] Featured</p>
          <p className="hero-meta-name">Nona S. Codes</p>
          <ul className="hero-stack">
            {STACK.map((s, i) => (
              <li key={s} className={i === activeStack ? "active" : ""}>{s}</li>
            ))}
          </ul>
        </div>

        {/* IMAGE CARD */}
        <div className="hero-image h-up" style={{ animationDelay: "0.45s" }}>
          <div className="hero-image-fill">
            <span className="hero-image-initials">NSC</span>
            <div className="hero-image-caption">Frontend Dev - Lagos</div>
          </div>
        </div>

        {/* NAME ROWS */}
        <div className="hero-names">
          {ROWS.map((row, i) => {
            let nameStyle = {};
            if (row.name === "NONA") nameStyle = { marginLeft: "48px" };
            if (row.name === "CODES") nameStyle = { marginLeft: "32px" };
            return (
              <div
                key={row.name}
                className={`hero-row h-up${row.band ? " hero-row--band" : ""}`}
                style={{ animationDelay: `${0.05 + i * 0.1}s` }}
              >
                <span className="hero-role">{row.role}</span>
                <span className="hero-name" style={nameStyle}>{row.name}</span>
              </div>
            );
          })}
        </div>

        {/* BOTTOM BAR */}
        <div className="hero-bottom h-up" style={{ animationDelay: "0.5s" }}>
          <span className="hero-tagline">Building the web, one component at a time.</span>
          <ul className="hero-socials">
            <li><a href="mailto:okwumabua25@gmail.com">Email</a></li>
            <li><a href="https://instagram.com/raphael.433" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer">Github</a></li>
            <li><a href="tel:+2348160262326">Call No.</a></li>
          </ul>
        </div>

        {/* SCROLL CUE */}
        <div className="hero-scroll h-up" style={{ animationDelay: "0.7s" }}>
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll</span>
        </div>

      </section>
    </>
  );
}