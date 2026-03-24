import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const css = `
  .loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: all;
    display: flex;
  }

  /* left and right panels */
  .loader-left,
  .loader-right {
    position: relative;
    width: 50%;
    height: 100%;
    background: var(--brown);
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .loader-left  { justify-content: flex-end; }
  .loader-right { justify-content: flex-start; }

  /* grain overlay */
  .loader-left::before,
  .loader-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
  }

  /* center content - sits across the seam */
  .loader-content {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    gap: 24px;
  }

  .loader-logo {
    font-family: var(--font-display);
    font-size: clamp(4rem, 12vw, 9rem);
    color: var(--cream-light);
    letter-spacing: 0.08em;
    line-height: 1;
    opacity: 0;
  }

  .loader-tagline {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(0.8rem, 1.5vw, 1.1rem);
    color: var(--brown-muted);
    letter-spacing: 0.12em;
    opacity: 0;
  }

  /* progress bar */
  .loader-bar-wrap {
    width: 120px;
    height: 0.5px;
    background: rgba(242,234,211,0.15);
    position: relative;
    overflow: hidden;
    opacity: 0;
  }

  .loader-bar-fill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    width: 0%;
    background: var(--cream-dark);
  }

  /* counter */
  .loader-count {
    font-family: var(--font-display);
    font-size: 0.75rem;
    letter-spacing: 0.22em;
    color: rgba(242,234,211,0.3);
    opacity: 0;
  }

  /* hidden once done */
  .loader.done {
    pointer-events: none;
  }
`;

export default function LoadingScreen({ onComplete }) {
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const logoRef    = useRef(null);
  const tagRef     = useRef(null);
  const barRef     = useRef(null);
  const barFillRef = useRef(null);
  const countRef   = useRef(null);
  const wrapRef    = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    /* 1 - fade in logo + bar */
    tl.to([logoRef.current, tagRef.current, barRef.current, countRef.current], {
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    /* 2 - fill progress bar + count up */
    tl.to(barFillRef.current, {
      width: "100%",
      duration: 1.4,
      ease: "power1.inOut",
      onUpdate: function () {
        const pct = Math.round(this.progress() * 100);
        setCount(pct);
      },
    }, "-=0.2");

    /* 3 - brief hold at 100% */
    tl.to({}, { duration: 0.3 });

    /* 4 - fade out logo/tagline/bar */
    tl.to([logoRef.current, tagRef.current, barRef.current, countRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
    });

    /* 5 - split: left slides left, right slides right */
    tl.to(leftRef.current, {
      x: "-100%",
      duration: 0.9,
      ease: "power3.inOut",
    }, "-=0.1");

    tl.to(rightRef.current, {
      x: "100%",
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        if (wrapRef.current) {
          wrapRef.current.classList.add("done");
          wrapRef.current.style.display = "none";
        }
        if (onComplete) onComplete();
      },
    }, "<");
  }, []);

  return (
    <>
      <style>{css}</style>

      <div ref={wrapRef} className="loader">
        <div ref={leftRef}  className="loader-left"  />
        <div ref={rightRef} className="loader-right" />

        <div className="loader-content">
          <div ref={logoRef} className="loader-logo">NSC</div>
          <div ref={tagRef}  className="loader-tagline">
            Building the web, one component at a time.
          </div>
          <div ref={barRef} className="loader-bar-wrap">
            <div ref={barFillRef} className="loader-bar-fill" />
          </div>
          <div ref={countRef} className="loader-count">{count}%</div>
        </div>
      </div>
    </>
  );
}
