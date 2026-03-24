import NSCPCImg from '../assets/NSCPC.png';
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream-light: #FBF6EC;
    --cream-dark: #E2CFA8;
    --brown: #1C0F07;
    --brown-mid: #3D2010;
    --brown-soft: #6B3E24;
    --brown-muted: #A07050;
  }

  .about {
    position: relative;
    background: var(--cream-light);
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── IMAGE BLOCK ── */
  .about-img {
    position: absolute;
    top: 0;
    right: 0;
    width: 52%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }

  .about-img-inner {
    width: 100%;
    height: 100%;
    background: linear-gradient(160deg, #C8A882 0%, #8C5E38 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* hatched texture on image */
  .about-img-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(28,15,7,0.045) 10px,
      rgba(28,15,7,0.045) 11px
    );
  }

  .about-img-initials {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 9rem;
    color: rgba(28,15,7,0.12);
    letter-spacing: 0.05em;
    position: relative;
    z-index: 1;
    user-select: none;
  }

  /* fade left edge of image into cream */
  .about-img::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 55%;
    height: 100%;
    background: linear-gradient(to right, var(--cream-light) 0%, transparent 100%);
    z-index: 2;
  }

  /* ── TOP INDEX LABEL ── */
  .about-index {
    position: absolute;
    top: 52px;
    left: 52px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .about-index-line {
    width: 36px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .about-index-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #fff;
  }

  /* ── MAIN CONTENT ── */
  .about-content {
    position: relative;
    z-index: 10;
    padding: 0 52px 72px;
    max-width: 720px;
  }

  /* big editorial heading */
  .about-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5rem, 12vw, 10.5rem);
    line-height: 0.88;
    letter-spacing: 0.01em;
    color: var(--brown);
    margin-bottom: 40px;
  }

  .about-heading em {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    color: var(--brown-soft);
  }

  /* divider */
  .about-rule {
    width: 48px;
    height: 0.5px;
    background: var(--brown-muted);
    margin-bottom: 28px;
  }

  /* value prop */
  .about-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.25rem, 2.5vw, 1.65rem);
    font-weight: 300;
    line-height: 1.55;
    color: var(--brown-mid);
    margin-bottom: 24px;
    max-width: 540px;
  }

  /* bio paragraph */
  .about-bio {
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.85;
    color: var(--brown-muted);
    max-width: 480px;
  }

  /* ── BOTTOM RIGHT STAT STRIP ── */
  .about-stats {
    position: absolute;
    bottom: 72px;
    right: 52px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
  }

  .about-stat {
    text-align: right;
  }

  .about-stat-number {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.8rem;
    letter-spacing: 0.04em;
    color: var(--cream-light);
    line-height: 1;
  }

  .about-stat-label {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(251,246,236,0.55);
    margin-top: 2px;
  }

  /* ── SCROLL CUE ── */
  .about-scroll {
    position: absolute;
    bottom: 72px;
    left: 52px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .about-scroll-line {
    width: 36px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .about-scroll-text {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  /* ── ANIMATIONS ── */
  .a-up {
    opacity: 0;
    transform: translateY(30px);
    animation: aUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes aUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .about-img {
      width: 100%;
      height: 45%;
      top: auto;
      bottom: 0;
    }
    .about-img::after {
      width: 100%;
      height: 60%;
      background: linear-gradient(to bottom, var(--cream-light) 0%, transparent 100%);
      top: 0; left: 0;
    }
    .about-content {
      padding: 140px 28px 320px;
      max-width: 100%;
    }
    .about-index { top: 36px; left: 28px; }
    .about-stats { display: none; }
    .about-scroll { left: 28px; bottom: 280px; }
  }
`;

const About = () => {
  return (
    <>
      <style>{styles}</style>
      <section className="about" id="about">

        {/* INDEX LABEL */}
        <div className="about-index a-up" style={{ animationDelay: "0.05s" }}>
          <div className="about-index-line" />
          <span className="about-index-label">02 — About</span>
        </div>

        {/* IMAGE */}
        <div className="about-img">
          <div className="about-img-inner">
              <img src={NSCPCImg} alt="NSCPC portrait" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0', position: 'relative', zIndex: 1 }} />
          </div>
        </div>

        {/* STAT STRIP — sits on the image */}
        <div className="about-stats a-up" style={{ animationDelay: "0.5s" }}>
          <div className="about-stat">
            <div className="about-stat-number" style={{ color: '#fff', fontSize: '3.6rem', fontWeight: 600 }}>1 year</div>
            <div className="about-stat-label" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 500 }}>Experience</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-number" style={{ color: '#fff', fontSize: '3.6rem', fontWeight: 600 }}>11+</div>
            <div className="about-stat-label" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 500 }}>Projects Shipped</div>
          </div>
        </div>

        {/* MAIN TEXT */}
        <div className="about-content">
          <h2 className="about-heading a-up" style={{ animationDelay: "0.1s" }}>
            Building<br /><em>interfaces</em><br />that work.
          </h2>

          <div className="about-rule a-up" style={{ animationDelay: "0.2s" }} />

          <p className="about-value a-up" style={{ animationDelay: "0.3s" }}>
            Frontend developer based in Lagos, crafting fast, accessible, and
            visually sharp web experiences from concept to deployment.
          </p>

          <p className="about-bio a-up" style={{ animationDelay: "0.4s" }}>
            I'm Nona Sieh Codes — I specialise in turning designs into
            responsive, production-ready React applications. Whether it's a
            landing page, a dashboard, or a full product, I care about every
            pixel and every millisecond of load time. Clean code, honest
            timelines, and interfaces people actually enjoy using.
          </p>
        </div>

        {/* SCROLL CUE */}
        <div className="about-scroll a-up" style={{ animationDelay: "0.6s" }}>
          <div className="about-scroll-line" />
          <span className="about-scroll-text">Scroll</span>
        </div>

      </section>
    </>
  );
};

export default About;