const css = `
  .footer {
    background: var(--brown);
    font-family: var(--font-sans);
    border-top: 0.5px solid rgba(242,234,211,0.1);
    position: relative;
    overflow: hidden;
  }

  /* grain */
  .footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  .footer > * { position: relative; z-index: 1; }

  /* -- TOP ROW -- */
  .footer-top {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: end;
    padding: 64px 52px 48px;
    border-bottom: 0.5px solid rgba(242,234,211,0.08);
    gap: 40px;
  }

  /* left - nav links */
  .footer-nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-nav-label {
    font-size: 0.55rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(160,112,80,0.45);
    margin-bottom: 6px;
  }

  .footer-nav-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-nav-link {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(242,234,211,0.45);
    text-decoration: none;
    transition: color 0.2s;
    width: fit-content;
  }

  .footer-nav-link:hover {
    color: var(--cream-light);
  }

  /* center - big logo */
  .footer-logo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .footer-logo {
    font-family: var(--font-display);
    font-size: clamp(4rem, 10vw, 8rem);
    line-height: 0.85;
    color: rgba(242,234,211,0.08);
    letter-spacing: 0.08em;
    user-select: none;
    transition: color 0.4s;
  }

  .footer-logo-wrap:hover .footer-logo {
    color: rgba(242,234,211,0.14);
  }

  .footer-tagline {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 0.82rem;
    color: rgba(160,112,80,0.5);
    letter-spacing: 0.06em;
    text-align: center;
  }

  /* right - socials */
  .footer-socials {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  .footer-socials-label {
    font-size: 0.55rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(160,112,80,0.45);
    margin-bottom: 6px;
  }

  .footer-social-link {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(242,234,211,0.45);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s, gap 0.25s cubic-bezier(0.16,1,0.3,1);
  }

  .footer-social-link:hover {
    color: var(--cream-light);
    gap: 12px;
  }

  /* -- BOTTOM ROW -- */
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 52px;
  }

  .footer-copy {
    font-size: 0.56rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(160,112,80,0.3);
  }

  .footer-credit {
    font-size: 0.56rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(160,112,80,0.3);
  }

  /* -- RESPONSIVE -- */
  @media (max-width: 860px) {
    .footer-top {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      padding: 48px 28px 36px;
    }
    .footer-logo-wrap {
      grid-column: 1 / -1;
      order: -1;
    }
    .footer-bottom { padding: 16px 28px; flex-direction: column; gap: 8px; text-align: center; }
  }

  @media (max-width: 500px) {
    .footer-top { grid-template-columns: 1fr; }
    .footer-socials { align-items: flex-start; }
  }
`;

import { Mail, Instagram, Github } from "lucide-react";

const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Projects",       href: "#projects" },
  { label: "Skills",         href: "#skills" },
  { label: "Experience",     href: "#experience" },
  { label: "Services",       href: "#services" },
  { label: "Case Studies",   href: "#casestudies" },
  { label: "Contact",        href: "#contact" },
];

const SOCIALS = [
  { label: "Email", href: "mailto:NonaSiehCode@gmail.com", Icon: Mail },
  { label: "Instagram", href: "https://instagram.com/nonasieh", Icon: Instagram },
  { label: "Github", href: "https://github.com/Nonaseih", Icon: Github },
];

export default function Footer() {
  return (
    <>
      <style>{css}</style>

      <footer className="footer">

        {/* TOP */}
        <div className="footer-top">

          {/* NAV */}
          <div className="footer-nav">
            <p className="footer-nav-label">Navigation</p>
            <div className="footer-nav-links">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="footer-nav-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* LOGO */}
          <div className="footer-logo-wrap">
            <div className="footer-logo">NSC</div>
            <p className="footer-tagline">Building the web, one component at a time.</p>
          </div>

          {/* SOCIALS */}
          <div className="footer-socials">
            <p className="footer-socials-label">Connect</p>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-social-link"
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {s.label} <s.Icon size={16} color="var(--cream-light)" strokeWidth={1.4} />
              </a>
            ))}
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Nona Sieh Codes. All rights reserved.
          </span>
          <span className="footer-credit">
            Lagos, Nigeria
          </span>
        </div>

      </footer>
    </>
  );
}