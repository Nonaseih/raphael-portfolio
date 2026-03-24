import { useState } from "react";

const css = `
  .contact {
    background: var(--brown);
    font-family: var(--font-sans);
    overflow: hidden;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* subtle grain */
  .contact::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  .contact > * { position: relative; z-index: 1; }

  /* -- BANNER -- */
  .ct-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 48px;
    overflow: hidden;
    border-bottom: 0.5px solid rgba(242,234,211,0.1);
  }

  .ct-banner-word {
    font-family: var(--font-display);
    font-size: clamp(5rem, 18vw, 16rem);
    line-height: 0.85;
    color: var(--cream-light);
    letter-spacing: 0.01em;
    user-select: none;
    text-align: center;
  }

  .ct-banner-sub {
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

  /* -- SPLIT BODY -- */
  .ct-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex: 1;
  }

  /* -- LEFT -- */
  .ct-left {
    padding: 72px 52px 72px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 0.5px solid rgba(242,234,211,0.1);
  }

  .ct-index {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }

  .ct-index-line {
    width: 32px;
    height: 0.5px;
    background: var(--brown-muted);
  }

  .ct-index-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .ct-heading {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 7vw, 6.5rem);
    line-height: 0.88;
    color: var(--cream-light);
    letter-spacing: 0.01em;
    margin-bottom: 32px;
  }

  .ct-heading em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--cream-dark);
    display: block;
  }

  .ct-subtext {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--brown-muted);
    max-width: 380px;
    margin-bottom: 52px;
  }

  /* social links */
  .ct-socials {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 52px;
  }

  .ct-social-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-top: 0.5px solid rgba(242,234,211,0.1);
    text-decoration: none;
    transition: padding-left 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  .ct-social-item:last-child {
    border-bottom: 0.5px solid rgba(242,234,211,0.1);
  }

  .ct-social-item:hover {
    padding-left: 12px;
  }

  .ct-social-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ct-social-label {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .ct-social-value {
    font-family: var(--font-display);
    font-size: 1.2rem;
    letter-spacing: 0.06em;
    color: var(--cream-light);
    transition: color 0.2s;
  }

  .ct-social-item:hover .ct-social-value {
    color: var(--cream-dark);
  }

  .ct-social-arrow {
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.25s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  .ct-social-item:hover .ct-social-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* bottom sign-off */
  .ct-signoff {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(160,112,80,0.4);
  }

  /* -- RIGHT (FORM) -- */
  .ct-right {
    padding: 72px 52px 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .ct-form-title {
    font-family: var(--font-display);
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    color: var(--cream-light);
    margin-bottom: 8px;
  }

  .ct-form-sub {
    font-size: 0.72rem;
    font-weight: 300;
    color: var(--brown-muted);
    margin-bottom: 40px;
    letter-spacing: 0.04em;
  }

  /* form fields */
  .ct-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }

  .ct-label {
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--brown-muted);
  }

  .ct-input,
  .ct-textarea {
    background: rgba(242,234,211,0.04);
    border: 0.5px solid rgba(242,234,211,0.15);
    color: var(--cream-light);
    font-family: var(--font-sans);
    font-size: 0.88rem;
    font-weight: 300;
    padding: 14px 16px;
    outline: none;
    transition: border-color 0.25s, background 0.25s;
    width: 100%;
    border-radius: 0;
    -webkit-appearance: none;
  }

  .ct-input::placeholder,
  .ct-textarea::placeholder {
    color: rgba(160,112,80,0.35);
    font-size: 0.82rem;
  }

  .ct-input:focus,
  .ct-textarea:focus {
    border-color: rgba(242,234,211,0.4);
    background: rgba(242,234,211,0.07);
  }

  .ct-textarea {
    resize: none;
    height: 140px;
    line-height: 1.7;
  }

  /* two-col row */
  .ct-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* submit */
  .ct-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: var(--cream-light);
    border: none;
    color: var(--brown);
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 16px 24px;
    cursor: pointer;
    transition: background 0.25s;
    margin-top: 8px;
  }

  .ct-submit:hover {
    background: var(--cream-dark);
  }

  .ct-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* success state */
  .ct-success {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 32px;
    border: 0.5px solid rgba(242,234,211,0.15);
    background: rgba(242,234,211,0.04);
  }

  .ct-success-title {
    font-family: var(--font-display);
    font-size: 1.6rem;
    letter-spacing: 0.06em;
    color: var(--cream-light);
    line-height: 1;
  }

  .ct-success-sub {
    font-size: 0.78rem;
    font-weight: 300;
    color: var(--brown-muted);
    line-height: 1.7;
  }

  /* -- FOOTER STRIP -- */
  .ct-footer {
    border-top: 0.5px solid rgba(242,234,211,0.1);
    padding: 20px 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ct-footer-copy {
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(160,112,80,0.4);
  }

  .ct-footer-name {
    font-family: var(--font-display);
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    color: rgba(242,234,211,0.2);
  }

  /* -- ANIMATE -- */
  .cn-up {
    opacity: 0;
    transform: translateY(28px);
    animation: cnUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes cnUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* -- RESPONSIVE -- */
  @media (max-width: 900px) {
    .ct-body { grid-template-columns: 1fr; }
    .ct-left { padding: 52px 28px 40px; border-right: none; border-bottom: 0.5px solid rgba(242,234,211,0.1); }
    .ct-right { padding: 40px 28px 52px; }
    .ct-footer { padding: 18px 28px; }
  }

  @media (max-width: 600px) {
    .ct-field-row { grid-template-columns: 1fr; }
    .ct-heading { font-size: clamp(3rem, 12vw, 5rem); }
  }
`;

const ArrowIcon = ({ color = "var(--brown)" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H6M13 3V10" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SOCIALS = [
  { label: "Email", value: "NonaSiehCode@gmail.com", href: "mailto:NonaSiehCode@gmail.com" },
  { label: "Instagram", value: "@nonasieh", href: "https://instagram.com/nonasieh" },
  { label: "Github", value: "github.com/Nonaseih", href: "https://github.com/Nonaseih" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      <style>{css}</style>

      <section className="contact" id="contact">

        {/* BANNER */}
        <div className="ct-banner cn-up" style={{ animationDelay: "0.0s" }}>
          <h2 className="ct-banner-word">CONTACT</h2>
          <span className="ct-banner-sub">GET IN TOUCH</span>
        </div>

        {/* SPLIT BODY */}
        <div className="ct-body">

          {/* LEFT */}
          <div className="ct-left cn-up" style={{ animationDelay: "0.1s" }}>
            <div>
              <div className="ct-index">
                <div className="ct-index-line" />
                <span className="ct-index-label">08 &mdash; Contact</span>
              </div>

              <h3 className="ct-heading">
                Let's Build<br />
                <em>Something</em><br />
                Together.
              </h3>

              <p className="ct-subtext">
                Whether it's a new project, a quick question, or just a conversation
                about frontend - Nona is always open to hearing from you.
              </p>
            </div>

            <div>
              <div className="ct-socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="ct-social-item"
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <div className="ct-social-left">
                      <span className="ct-social-label">{s.label}</span>
                      <span className="ct-social-value">{s.value}</span>
                    </div>
                    <span className="ct-social-arrow">
                      <ArrowIcon color="var(--cream-dark)" />
                    </span>
                  </a>
                ))}
              </div>

              <p className="ct-signoff">Nona Sieh Codes &mdash; Lagos, Nigeria</p>
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="ct-right cn-up" style={{ animationDelay: "0.2s" }}>
            {submitted ? (
              <div className="ct-success">
                <div className="ct-success-title">Message Sent.</div>
                <p className="ct-success-sub">
                  Thanks for reaching out. Nona will get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="ct-form-title">Send a Message</div>
                <p className="ct-form-sub">Fill in the form and he will get back to you shortly.</p>

                <div className="ct-field-row">
                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-name">Name</label>
                    <input
                      id="ct-name"
                      className="ct-input"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-email">Email</label>
                    <input
                      id="ct-email"
                      className="ct-input"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-message">Message</label>
                  <textarea
                    id="ct-message"
                    className="ct-textarea"
                    name="message"
                    placeholder="Tell Nona what you have in mind..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="ct-submit"
                  disabled={loading}
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  {!loading && <ArrowIcon color="var(--brown)" />}
                </button>
              </form>
            )}
          </div>
        </div>

      </section>
    </>
  );
}