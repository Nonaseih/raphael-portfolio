import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ShoppingCart, BarChart, BookOpen, Lock, Code, Wand2, Globe, Layers } from "lucide-react";

const PROJECTS = [
  {
    number: "01",
    name: "Storefront UI",
    description: "A fully responsive e-commerce storefront built with Next.js, featuring cart management, product filtering, and seamless checkout flow.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "#",
    Icon: ShoppingCart,
  },
  {
    number: "02",
    name: "Dashboard Kit",
    description: "An analytics dashboard template with real-time data visualisation, dark mode, and a fully componentised design system.",
    stack: ["React", "Recharts", "Framer Motion"],
    link: "#",
    Icon: BarChart,
  },
  {
    number: "03",
    name: "Portfolio CMS",
    description: "A headless CMS-powered portfolio with dynamic content, smooth page transitions, and optimised image delivery.",
    stack: ["Next.js", "Sanity.io", "GSAP"],
    link: "#",
    Icon: BookOpen,
  },
  {
    number: "04",
    name: "Auth Flow",
    description: "A complete authentication system with OAuth, JWT refresh tokens, role-based access control, and protected routes.",
    stack: ["React", "Node.js", "Supabase"],
    link: "#",
    Icon: Lock,
  },
  {
    number: "05",
    name: "Component Library",
    description: "A published open-source UI component library with Storybook documentation, accessibility compliance, and Tailwind theming.",
    stack: ["React", "Storybook", "Tailwind CSS"],
    link: "#",
    Icon: Code,
  },
  {
    number: "06",
    name: "Landing Page Builder",
    description: "A drag-and-drop landing page builder with live preview, export to HTML, and integration with popular email platforms.",
    stack: ["React", "DnD Kit", "TypeScript"],
    link: "#",
    Icon: Wand2,
  },
  {
    number: "07",
    name: "Chat Interface",
    description: "A real-time chat application with typing indicators, message threads, file sharing, and end-to-end encryption support.",
    stack: ["React", "Socket.io", "Node.js"],
    link: "#",
    Icon: Globe,
  },
  {
    number: "08",
    name: "Blog Platform",
    description: "A full-stack blogging platform with markdown support, SEO optimisation, tag filtering, and an admin content editor.",
    stack: ["Next.js", "MDX", "Prisma"],
    link: "#",
    Icon: Layers,
  },
];

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="var(--brown)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDrag = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3L12 8L8 13M4 3L8 8L4 13" stroke="var(--brown-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const css = `
  .projects {
    background: var(--cream-light);
    padding: 0 0 100px;
    position: relative;
    overflow: hidden;
  }

  .projects-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 48px;
    overflow: hidden;
    background: var(--brown);
    border-bottom: 0.5px solid rgba(242,234,211,0.12);
    margin-bottom: 64px;
  }

  .projects-banner-word {
    font-family: var(--font-display);
    font-size: clamp(5rem, 18vw, 16rem);
    line-height: 0.85;
    color: var(--cream-light);
    letter-spacing: 0.01em;
    user-select: none;
    text-align: center;
  }

  .projects-banner-sub {
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

  .projects-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 52px;
    margin-bottom: 52px;
  }

  .projects-header-left {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .projects-index {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .projects-index-line {
    width: 32px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .projects-index-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .projects-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 0.9;
    color: var(--brown);
    letter-spacing: 0.01em;
  }

  .projects-title em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--brown-soft);
  }

  .projects-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 6px;
  }

  .projects-drag-hint {
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .projects-track-wrap { position: relative; }

  .projects-track {
    display: flex;
    gap: 24px;
    padding: 0 52px 32px;
    overflow-x: auto;
    overflow-y: visible;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
    user-select: none;
    scrollbar-width: none;
  }

  .projects-track::-webkit-scrollbar { display: none; }
  .projects-track.dragging { cursor: grabbing; scroll-snap-type: none; }

  .proj-card {
    flex: 0 0 340px;
    width: 340px;
    background: var(--cream);
    border: 0.5px solid var(--cream-dark);
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s;
    position: relative;
    overflow: hidden;
  }

  .proj-card:hover {
    transform: translateY(-6px);
    border-color: var(--brown-muted);
  }

  .proj-card-top {
    height: 160px;
    background: var(--cream-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 0.5px solid rgba(160,112,80,0.2);
    overflow: hidden;
  }

  .proj-card-top::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(28,15,7,0.03) 10px,
      rgba(28,15,7,0.03) 11px
    );
  }

  .proj-card-number {
    position: absolute;
    top: 14px;
    left: 18px;
    font-family: var(--font-display);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: rgba(28,15,7,0.2);
  }

  .proj-icon {
    position: relative;
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.2s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  .proj-card:hover .proj-icon { opacity: 1; transform: scale(1.1); }

  .proj-card-body {
    padding: 24px 24px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
  }

  .proj-name {
    font-family: var(--font-display);
    font-size: 1.6rem;
    letter-spacing: 0.04em;
    color: var(--brown);
    line-height: 1;
  }

  .proj-desc {
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1.75;
    color: var(--brown-muted);
    flex: 1;
  }

  .proj-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }

  .proj-tag {
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--brown-soft);
    border: 0.5px solid var(--cream-dark);
    padding: 4px 10px;
    background: var(--cream-light);
  }

  .proj-card-footer {
    padding: 14px 24px;
    border-top: 0.5px solid var(--cream-dark);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .proj-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--brown);
    text-decoration: none;
    transition: gap 0.25s cubic-bezier(0.16,1,0.3,1);
  }

  .proj-link:hover { gap: 12px; }

  .projects-progress {
    padding: 0 52px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .projects-progress-track {
    flex: 1;
    height: 0.5px;
    background: var(--cream-dark);
    position: relative;
    max-width: 200px;
  }

  .projects-progress-fill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    background: var(--brown);
    transition: width 0.3s ease;
  }

  .projects-progress-count {
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    color: var(--brown-muted);
  }

  .p-up {
    opacity: 0;
    transform: translateY(28px);
    animation: pUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes pUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .projects-header { padding: 0 24px; margin-bottom: 36px; }
    .projects-track { padding: 0 24px 28px; gap: 16px; }
    .proj-card { flex: 0 0 290px; width: 290px; }
    .projects-progress { padding: 0 24px; }
    .projects-banner { margin-bottom: 40px; }
  }
`;

const SCROLL_SPEED = 0.6;

export default function Projects() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const isHovered = useRef(false);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => { isDraggingRef.current = isDragging; }, [isDragging]);

  /* auto-scroll */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = () => {
      if (!isHovered.current && !isDraggingRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        el.scrollLeft = el.scrollLeft >= max ? 0 : el.scrollLeft + SCROLL_SPEED;
      }
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  /* progress bar */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.pageX, scrollLeft: trackRef.current.scrollLeft };
  };
  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - (e.pageX - dragStart.current.x);
  };
  const onMouseUp = () => setIsDragging(false);

  return (
    <>
      <style>{css}</style>

      <section className="projects" id="projects">

        {/* BANNER */}
        <div className="projects-banner p-up" style={{ animationDelay: "0.0s" }}>
          <h2 className="projects-banner-word">PROJECTS</h2>
          <span className="projects-banner-sub">PERSONAL WORK</span>
        </div>

        {/* HEADER */}
        <div className="projects-header p-up" style={{ animationDelay: "0.05s" }}>
          <div className="projects-header-left">
            <div className="projects-index">
              <div className="projects-index-line" />
              <span className="projects-index-label">03 &mdash; Projects</span>
            </div>
            <h2 className="projects-title">
              Selected<br /><em>Work</em>
            </h2>
          </div>
          <div className="projects-header-right">
            <IconDrag />
            <span className="projects-drag-hint">Drag to explore</span>
          </div>
        </div>

        {/* SCROLL TRACK */}
        <div className="projects-track-wrap">
          <div
            ref={trackRef}
            className={`projects-track${isDragging ? " dragging" : ""}`}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; onMouseUp(); }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.number}
                className="proj-card p-up"
                style={{ animationDelay: `${0.1 + i * 0.07}s` }}
              >
                <div className="proj-card-top">
                  <span className="proj-card-number">{p.number}</span>
                  <div className="proj-icon">
                    <p.Icon size={32} color="var(--brown)" strokeWidth={1.4} />
                  </div>
                </div>

                <div className="proj-card-body">
                  <h3 className="proj-name">{p.name}</h3>
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-stack">
                    {p.stack.map((s) => (
                      <span key={s} className="proj-tag">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="proj-card-footer">
                  <a
                    href={p.link}
                    className="proj-link"
                    target="_blank"
                    rel="noreferrer"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    View Project <IconArrow />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROGRESS */}
        <div className="projects-progress p-up" style={{ animationDelay: "0.5s" }}>
          <div className="projects-progress-track">
            <div
              className="projects-progress-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="projects-progress-count">
            {PROJECTS.length} Projects
          </span>
        </div>

      </section>
    </>
  );
}