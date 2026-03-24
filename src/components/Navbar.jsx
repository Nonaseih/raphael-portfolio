import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const links = [
  { label: "Home",         href: "#hero" },
  { label: "About",        href: "#about" },
  { label: "Projects",     href: "#projects" },
  { label: "Skills",       href: "#skills" },
  { label: "Experience",   href: "#experience" },
  { label: "Services",     href: "#services" },
  { label: "Case Studies", href: "#casestudies" },
  { label: "Contact",      href: "#contact" },
];

const styles = `
      @media (max-width: 900px) {
        .nb-mobile .nb-logo {
          font-size: 2.2rem !important;
          font-weight: 900 !important;
          color: var(--brown) !important;
          opacity: 1 !important;
          letter-spacing: 0.22em !important;
          text-shadow: 0 2px 8px rgba(28,15,7,0.12) !important;
        }
      }
    @media (max-width: 900px) {
      .nb-mobile .nb-logo {
        font-size: 2.2rem;
        font-weight: 900;
        color: var(--brown);
        opacity: 1;
        letter-spacing: 0.22em;
        text-shadow: 0 2px 8px rgba(28,15,7,0.12);
      }
      .nb-burger span {
        height: 5px;
        background: var(--brown);
        opacity: 1;
        box-shadow: 0 2px 8px rgba(28,15,7,0.12);
      }
    }
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream-light: #FBF6EC;
    --brown: #1C0F07;
    --brown-soft: #6B3E24;
    --brown-muted: #A07050;
  }

  /* ---- NAVBAR BAR ---- */
  .nb {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    font-family: 'DM Sans', sans-serif;
    background: transparent;
    transition: background 0.4s ease, box-shadow 0.4s ease;
  }

  .nb.scrolled {
    background: rgba(251, 246, 236, 0.95);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 1px 0 rgba(160, 112, 80, 0.2);
  }

  /* hide bar background when mobile menu is open */
  @media (max-width: 900px) {
    .nb.menu-open {
      background: transparent !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
  }

  .nb-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 52px;
    margin-top: 32px;
    transition: padding 0.4s ease;
  }

  .nb-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.25rem;
    letter-spacing: 0.15em;
    color: var(--brown);
    text-decoration: none;
    flex-shrink: 0;
    position: relative;
    z-index: 1001;
    transition: font-size 0.4s;
  }

  @media (min-width: 901px) {
    .nb.scrolled .nb-inner {
      padding: 8px 52px;
    }
    .nb.scrolled .nb-logo {
      font-size: 1rem;
    }
  }

  /* ---- LOGO ---- */
  .nb-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.25rem;
    letter-spacing: 0.15em;
    color: var(--brown);
    text-decoration: none;
    flex-shrink: 0;
    position: relative;
    z-index: 1001;
  }

  /* ---- DESKTOP LINKS ---- */
  .nb-links {
    display: flex;
    align-items: center;
    gap: 36px;
    list-style: none;
  }

  .nb-links a {
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown-muted);
    text-decoration: none;
    position: relative;
    transition: color 0.2s;
  }

  .nb-links a::after {
    content: '';
    position: absolute;
    bottom: -3px; left: 0;
    width: 0; height: 0.5px;
    background: var(--brown);
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nb-links a:hover,
  .nb-links a.active-link { color: var(--brown); }

  .nb-links a:hover::after,
  .nb-links a.active-link::after { width: 100%; }

  /* ---- RIGHT CLUSTER ---- */
  .nb-right {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1001;
  }

  /* ---- CTA BUTTON ---- */
  .nb-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cream-light);
    background: var(--brown);
    border: 1px solid var(--brown);
    padding: 10px 24px;
    text-decoration: none;
    transition: background 0.25s, border-color 0.25s;
    white-space: nowrap;
  }

  .nb-cta:hover {
    background: var(--brown-soft);
    border-color: var(--brown-soft);
  }

  /* ---- BURGER ---- */
  .nb-burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    z-index: 1001;
  }

  .nb-burger span {
    display: block;
    height: 1px;
    background: var(--brown);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s, width 0.3s;
    transform-origin: center;
  }

  .nb-burger span:nth-child(1) { width: 28px; }
  .nb-burger span:nth-child(2) { width: 20px; }
  .nb-burger span:nth-child(3) { width: 24px; }

  .nb-burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); width: 28px; }
  .nb-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nb-burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); width: 28px; }

  /* ---- MOBILE OVERLAY ---- */
  .nb-mobile {
    position: fixed;
    inset: 0;
    background: var(--cream-light);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 80px 28px 52px;
    transform: translateY(-100%);
    visibility: hidden;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.55s;
  }

  .nb-mobile.open {
    transform: translateY(0);
    visibility: visible;
    pointer-events: all;
  }

  .nb-mobile-links {
    list-style: none;
    margin-top: 16px;
  }

  .nb-mobile-links a {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem, 9vw, 5.5rem);
    letter-spacing: 0.03em;
    color: var(--brown);
    text-decoration: none;
    line-height: 1;
    padding: 10px 0;
    border-top: 0.5px solid rgba(160, 112, 80, 0.2);
    transition: color 0.2s, padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nb-mobile-links a:hover,
  .nb-mobile-links a.active-link {
    color: var(--brown-soft);
    padding-left: 12px;
  }

  .nb-mobile-socials {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    list-style: none;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 0.5px solid rgba(160, 112, 80, 0.2);
  }

  .nb-mobile-socials a {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .nb-mobile-socials a:hover { color: var(--brown); }

  /* ---- BREAKPOINT ---- */
  @media (max-width: 900px) {
    .nb-links { display: none; }
    .nb-cta  { display: none; }
    .nb-burger { display: flex; }
    .nb-inner { padding: 24px 28px; }
    .nb.scrolled .nb-inner { padding: 18px 28px; }
  }
`;

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("hero");
  const navbarRef = useRef(null);
  const mobileRef = useRef(null);

  /* scroll + active section */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.href.replace("#", ""));
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 80 && bottom > 80) { setActiveSection(sec); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* GSAP entrance */
  useEffect(() => {
    if (navbarRef.current) {
      gsap.from(navbarRef.current, { y: -60, opacity: 0, duration: 0.8, ease: "power2.out" });
    }
  }, []);

  /* body lock + mobile GSAP */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (mobileRef.current) {
      if (menuOpen) {
        gsap.to(mobileRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      } else {
        gsap.to(mobileRef.current, { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" });
      }
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <style>{styles}</style>

      <header
        ref={navbarRef}
        className={`nb${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      >
        <div className="nb-inner">
          <a href="#hero" className="nb-logo">NSC</a>

          <ul className="nb-links">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={activeSection === l.href.replace("#", "") ? "active-link" : ""}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nb-right">
            <a href="mailto:NonaSiehCode@gmail.com" className="nb-cta">Hire Me</a>
            <button
              className={`nb-burger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={mobileRef}
        className={`nb-mobile${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nb-mobile-links">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={close}
                className={activeSection === l.href.replace("#", "") ? "active-link" : ""}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="nb-mobile-socials">
          <li><a href="mailto:NonaSiehCode@gmail.com" onClick={close}>Email</a></li>
          {/* Phone number removed as requested */}
          <li><a href="https://instagram.com/nonasieh" target="_blank" rel="noreferrer" onClick={close}>Instagram</a></li>
          <li><a href="https://github.com/Nonaseih" target="_blank" rel="noreferrer" onClick={close}>Github</a></li>
        </ul>
      </div>
    </>
  );
}
