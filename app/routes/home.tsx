import { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/home";
import "./home.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blue Jay — Everyday Innerwear by Sparoz Apparels" },
    {
      name: "description",
      content:
        "Blue Jay by Sparoz Apparels — everyday innerwear in breathable cotton blends, finished in soft seams that move how you move.",
    },
  ];
}

const NAV_LINKS = [
  { href: "#women", label: "Women" },
  { href: "#men", label: "Men" },
  { href: "#collection", label: "New Arrivals" },
  { href: "#story", label: "Our Story" },
  { href: "#visit", label: "Visit Store" },
];

type Product = {
  name: string;
  blurb: string;
  image: string;
  alt: string;
  badge: { label: string; variant?: "red" | "blue" };
  swatches: string[];
  span: "c4" | "c6";
};

const PRODUCTS: Product[] = [
  {
    name: "Brief",
    blurb: "Combed cotton · Everyday essential",
    image: "/assets/men-brief-grey.jpg",
    alt: "Combed cotton brief in grey",
    badge: { label: "Daily" },
    swatches: ["#B5B5B5", "#1B1B1B", "#1F4F6C"],
    span: "c4",
  },
  {
    name: "Pride",
    blurb: "Soft elastic · Pack of two",
    image: "/assets/men-brief-red.jpg",
    alt: "Soft elastic brief in red",
    badge: { label: "Bestseller" },
    swatches: ["#C71921", "#1B1B1B", "#1F4F6C"],
    span: "c4",
  },
  {
    name: "Plus Trunk OE",
    blurb: "Outer elastic · Mid-rise",
    image: "/assets/men-trunk-teal.jpg",
    alt: "Mid-rise trunk in teal",
    badge: { label: "New", variant: "red" },
    swatches: ["#1F4F6C", "#1B1B1B", "#6B6B6B"],
    span: "c4",
  },
  {
    name: "Rider",
    blurb: "Athletic fit · 100% cotton vest",
    image: "/assets/men-vest-white.jpg",
    alt: "Athletic cotton vest in white",
    badge: { label: "Limited", variant: "blue" },
    swatches: ["#FFFFFF", "#1B1B1B", "#6B6B6B"],
    span: "c6",
  },
  {
    name: "Brief Pride Plus",
    blurb: "Triple-pack · Combed cotton",
    image: "/assets/men-brief-red.jpg",
    alt: "Combed cotton brief triple-pack",
    badge: { label: "Editor's pick", variant: "blue" },
    swatches: ["#C71921", "#1B1B1B", "#B5B5B5"],
    span: "c6",
  },
];

const HOURS = [
  { day: "Mon", time: "10:00 — 21:00" },
  { day: "Tue", time: "10:00 — 21:00" },
  { day: "Wed", time: "10:00 — 21:00" },
  { day: "Thu", time: "10:00 — 21:00" },
  { day: "Fri", time: "10:00 — 22:00" },
  { day: "Sat", time: "09:00 — 22:00" },
  { day: "Sun", time: "11:00 — 20:00" },
];

const HeartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
  </svg>
);

const LOGO_W = 256;
const LOGO_H = 170;

const Logo = ({ className }: { className?: string }) => (
  <img
    className={className}
    src="/assets/logo.webp"
    srcSet="/assets/logo.webp 1x, /assets/logo@2x.webp 2x"
    alt="Blue Jay"
    width={LOGO_W}
    height={LOGO_H}
    decoding="async"
  />
);

const WOMEN_IMAGES = [
  "/assets/women-bra-pink.jpg",
  "/assets/women-bra-blue.jpg",
  "/assets/women-bra-sage.jpg",
  "/assets/women-bra-gift.jpg",
  "/assets/women-bra-trio.jpg",
];

const STATS: { to: number; suffix: React.ReactNode; eyebrow: string; line: string }[] = [
  {
    to: 28,
    suffix: <span className="red">.</span>,
    eyebrow: "Years on shelf",
    line: "Three generations of the same family stitching the same standard.",
  },
  {
    to: 14,
    suffix: <span className="blue">.</span>,
    eyebrow: "Sizes per style",
    line: "From AA to DD, XS to 3XL — drafted for real Indian bodies, not catalogue ones.",
  },
  {
    to: 100,
    suffix: <span className="red">%</span>,
    eyebrow: "Mill to label",
    line: "Every spool of yarn is sourced, dyed and stitched within thirty kilometres of our shop.",
  },
  {
    to: 30,
    suffix: <span className="blue">d</span>,
    eyebrow: "Return window",
    line: "Wear it, wash it, decide later. If the fit isn't right we'll take it back, no fine print.",
  },
];

function Counter({
  to,
  suffix,
  className,
}: {
  to: number;
  suffix?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1400;
        const start = performance.now();
        let raf = 0;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.45 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref} className={className}>
      {value}
      {suffix}
    </div>
  );
}

export default function Home() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [womenIdx, setWomenIdx] = useState(0);
  const cycleWomen = (delta: number) =>
    setWomenIdx((i) => (i + delta + WOMEN_IMAGES.length) % WOMEN_IMAGES.length);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuTriggerRef.current?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".bluejay-page .reveal");
    if (!els.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="bluejay-page">
      {/* ANNOUNCEMENT */}
      <div className="annc">
        <div className="annc-track" aria-hidden="true">
          <span>Free shipping on orders above ₹999</span>
          <span>Soft cotton · Skin-friendly fabric</span>
          <span>A Sparoz Apparels brand · Muvattupuzha, Kerala</span>
          <span>14 sizes across women &amp; men</span>
          <span>30-day no-stress returns</span>
          <span>Free shipping on orders above ₹999</span>
          <span>Soft cotton · Skin-friendly fabric</span>
          <span>A Sparoz Apparels brand · Muvattupuzha, Kerala</span>
          <span>14 sizes across women &amp; men</span>
          <span>30-day no-stress returns</span>
        </div>
      </div>

      {/* NAV */}
      <nav className="top">
        <div className="inner">
          <a className="brand" href="#" aria-label="Blue Jay by Sparoz Apparels">
            <Logo className="logo-img" />
            <span className="brand-meta">
              <span className="brand-by">by</span>
              <span className="brand-parent">Sparoz Apparels</span>
            </span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <button className="icon-btn" aria-label="Search">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button
              ref={menuTriggerRef}
              className="menu-btn"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menuOpen}
      >
        <div className="mobile-menu-head">
          <Logo className="logo-img" />
          <button
            ref={closeBtnRef}
            className="menu-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="mobile-menu-links" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                const id = l.href.slice(1);
                setMenuOpen(false);
                requestAnimationFrame(() => {
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  history.replaceState(null, "", l.href);
                });
              }}
              style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.04}s` : "0s" }}
            >
              <span className="i">0{i + 1}</span>
              <span className="l">{l.label}</span>
              <span className="arr" aria-hidden="true">→</span>
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <span className="brand-by">By</span>
          <span className="brand-parent">Sparoz Apparels</span>
          <span className="brand-loc">Muvattupuzha, Kerala</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="pill">
                <span className="dot"></span> Spring · Summer Collection 2026
              </span>
              <h1 className="display">
                <span className="word">Comfort</span>
                <span className="word">
                  <span className="serif-bit">that</span>{" "}
                  <span className="blue">feels</span>
                </span>
                <span className="word">
                  <span className="red">like</span> home.
                </span>
              </h1>
              <div className="hero-meta">
                <p>
                  Blue Jay makes everyday innerwear from breathable cotton
                  blends, finished in soft seams that move how you move. For
                  her. For him. For every day in between.
                </p>
                <div className="cta-row">
                  <a href="#collection" className="btn primary">
                    Shop the collection <span className="arr">→</span>
                  </a>
                  <a href="#story" className="btn">
                    Our story
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-art">
              <div className="tag">
                <span className="d"></span> Featured · Sky Bralette
              </div>
              <img
                src="/assets/women-bra-blue.jpg"
                alt="Blue Jay sky bralette"
                width="800"
                height="800"
                fetchPriority="high"
                decoding="async"
              />
              <div className="ribbon">
                <div className="num">42</div>
                <div className="lbl">Styles in this season's drop</div>
              </div>
            </div>
          </div>

          <div className="hero-strip">
            <div className="item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 3v18M3 12h18" />
              </svg>
              Skin-friendly cotton blends
            </div>
            <div className="item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12l3 3 5-6" />
              </svg>
              Tested for daily wear
            </div>
            <div className="item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 7h18M6 12h12M9 17h6" />
              </svg>
              14 sizes, true to body
            </div>
            <div className="item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-9-9" />
                <path d="M21 4v8h-8" />
              </svg>
              30-day easy returns
            </div>
            <div className="item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 7h16v10H4z" />
                <path d="M4 11h16" />
              </svg>
              Made in Tirupur, India
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Soft on skin</span>
          <span>Built for every day</span>
          <span>Quietly confident</span>
          <span>Made to last</span>
          <span>Soft on skin</span>
          <span>Built for every day</span>
          <span>Quietly confident</span>
          <span>Made to last</span>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="cat wrap" id="women">
        <div className="cat-head">
          <h2 className="display reveal">
            Two aisles, <span className="sf">one</span> standard of comfort.
          </h2>
          <div className="index">— 01 / Shop by category</div>
        </div>
        <div className="cat-grid">
          <div className="cat-card women">
            <img
              key={womenIdx}
              src={WOMEN_IMAGES[womenIdx]}
              alt="Women's collection"
              width="900"
              height="720"
              loading="lazy"
              decoding="async"
            />
            <div className="overlay"></div>
            <div className="label">For Her</div>
            <div className="count">
              {womenIdx + 1} / {WOMEN_IMAGES.length}
            </div>
            <div className="title">
              <h3>Women</h3>
              <div className="arrs">
                <button
                  type="button"
                  className="arr"
                  onClick={() => cycleWomen(-1)}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="arr"
                  onClick={() => cycleWomen(1)}
                  aria-label="Next image"
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <a href="#" className="cat-card men" id="men">
            <img
              src="/assets/men-brief-red.jpg"
              alt="Men's collection"
              width="900"
              height="720"
              loading="lazy"
              decoding="async"
            />
            <div className="overlay"></div>
            <div className="label">For Him</div>
            <div className="count">5 Styles</div>
            <div className="title">
              <h3>Men</h3>
              <div className="arr">→</div>
            </div>
          </a>
        </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="coll wrap" id="collection">
        <div className="coll-head">
          <div className="num">02</div>
          <div className="mid">
            <span className="eyebrow">The drop · this season</span>
            <h2 className="display reveal">Featured pieces</h2>
          </div>
        </div>

        <div className="grid">
          {PRODUCTS.map((p, i) => (
            <article key={p.name} className={`prod ${p.span}`}>
              <div className="img-wrap">
                <span className={`badge${p.badge.variant ? ` ${p.badge.variant}` : ""}`}>
                  {p.badge.label}
                </span>
                <button className="fav" aria-label={`Save ${p.name}`}>
                  <HeartIcon />
                </button>
                <img
                  src={p.image}
                  alt={p.alt}
                  width="600"
                  height="720"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="info">
                <div>
                  <h4>{p.name}</h4>
                  <p>{p.blurb}</p>
                  <div className="swatches">
                    {p.swatches.map((c) => (
                      <s key={c} style={{ background: c }} aria-hidden="true"></s>
                    ))}
                  </div>
                </div>
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement" id="story">
        <div className="wrap">
          <div className="statement-grid">
            <h2 className="display reveal">
              <span>Built</span>{" "}
              <span className="red">for the</span>{" "}
              <span className="stroke">layer</span>{" "}
              <span className="blue">no one</span>{" "}
              <span>sees.</span>
            </h2>
            <div>
              <div className="body">
                <p>
                  Blue Jay began as a small workshop in Muvattupuzha — a sole
                  proprietorship, one cutting table, and the quiet conviction
                  that the layer closest to your skin should be the softest
                  thing you wear all day.
                </p>
                <p>
                  We still cut every piece in the same town, still hand-finish
                  the seams, still test every fit on real bodies before it
                  ships out of Pezhakkappilly.
                </p>
              </div>
              <div className="statement-meta">
                <div className="meta-row">
                  <span className="k">Workshop</span>
                  <span className="v">
                    Thekkekara Complex <span className="sf">Muvattupuzha</span>
                  </span>
                </div>
                <div className="meta-row">
                  <span className="k">Parent company</span>
                  <span className="v">Sparoz Apparels</span>
                </div>
                <div className="meta-row">
                  <span className="k">Materials</span>
                  <span className="v">Cotton · Modal · Bamboo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="wrap">
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat" key={s.eyebrow}>
                <Counter to={s.to} suffix={s.suffix} className="n" />
                <div className="eyebrow">{s.eyebrow}</div>
                <div className="l">{s.line}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="editorial wrap">
        <div className="ed-grid">
          <div className="ed-img">
            <img
              src="/assets/women-bra-pink.jpg"
              alt="Detail of soft bralette"
              width="900"
              height="1080"
              loading="lazy"
              decoding="async"
            />
            <div className="cap">From the workshop</div>
          </div>
          <div className="ed-text">
            <span className="eyebrow">— A note from the workshop</span>
            <h3 className="display reveal">
              The first layer <span className="sf">deserves</span> the most
              thought.
            </h3>
            <p>
              We don't talk about innerwear the way we talk about jackets or
              jeans. It's hidden, so it gets quiet. But it's the layer that
              touches your skin for sixteen hours a day — through commutes,
              through workouts, through the long Sunday afternoons.
            </p>
            <p>
              That's the layer we build for. Cotton that breathes. Elastic
              that holds without leaving a mark. Seams placed where your body
              bends. Nothing loud. Nothing trying to be seen. Just a piece that
              disappears into your day and shows up again, day after day, the
              same as it always was.
            </p>
            <div className="signature">— Muhammed Shefin, Ashraf &amp; Najeeb</div>
            <div className="by">
              Founder · Info · HR &nbsp;·&nbsp; Sparoz Apparels, Muvattupuzha
            </div>
          </div>
        </div>
      </section>

      {/* VISIT / STORE */}
      <section className="visit" id="visit">
        <div className="wrap">
          <div className="visit-grid">
            <div>
              <span
                className="pill"
                style={{ borderColor: "#fff", color: "#fff" }}
              >
                <span className="dot"></span> Walk in &amp; try on
              </span>
              <h2 className="display reveal" style={{ marginTop: 18 }}>
                Find us <span className="sf">at</span> Thekkekara Complex,
                Muvattupuzha.
              </h2>
              <p className="desc">
                Three floors of cotton, modal and bamboo basics, with fitting
                rooms, free alterations on bra-band sizing, and tea on the
                house if you happen to be looking.
              </p>
              <div className="visit-info">
                <div className="vi-block">
                  <div className="lbl">Address</div>
                  <div className="val">
                    Thekkekara Building, Near Sabine Hospital
                    <br />
                    Pezhakkappilly P.O, Muvattupuzha
                    <br />
                    Ernakulam Dist, Kerala — 686 673
                  </div>
                </div>
                <div className="vi-block">
                  <div className="lbl">Reach us</div>
                  <div className="val">
                    +91 80891 17051
                    <br />
                    sparozapparels@gmail.com
                  </div>
                </div>
              </div>
              <div className="btn-row">
                <a href="#" className="btn primary">
                  Get directions <span className="arr">→</span>
                </a>
                <a href="#" className="btn">
                  Book a fitting
                </a>
              </div>
            </div>

            <div className="store-card">
              <div className="head">
                <h4>Flagship · Muvattupuzha</h4>
                <div className="open">
                  <span className="d"></span>
                  <span>Open · until 9 pm</span>
                </div>
              </div>
              <div className="map" aria-hidden="true">
                <svg viewBox="0 0 400 250" preserveAspectRatio="none">
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M40 0H0V40"
                        stroke="rgba(10,10,11,.06)"
                        fill="none"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="250" fill="url(#grid)" />
                  <path
                    d="M-10 130 Q 100 90 200 140 T 410 110"
                    stroke="#00AEEF"
                    strokeWidth="14"
                    fill="none"
                    opacity=".25"
                  />
                  <path
                    d="M-10 130 Q 100 90 200 140 T 410 110"
                    stroke="#fff"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path d="M60 -10 L 80 260" stroke="rgba(10,10,11,.1)" strokeWidth="2" fill="none" />
                  <path d="M280 -10 L 310 260" stroke="rgba(10,10,11,.1)" strokeWidth="2" fill="none" />
                  <circle cx="60" cy="60" r="14" fill="#92B59B" opacity=".4" />
                  <circle cx="340" cy="190" r="22" fill="#E8A8B3" opacity=".4" />
                  <circle cx="120" cy="200" r="10" fill="#7AAFC9" opacity=".5" />
                </svg>
                <div className="pin"></div>
              </div>
              <div>
                <div
                  className="eyebrow"
                  style={{ marginBottom: 14, color: "var(--muted)" }}
                >
                  Hours
                </div>
                <div className="hours">
                  {HOURS.map((h) => (
                    <div className="row" key={h.day}>
                      <span className="d">{h.day}</span>
                      <span className="t">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="news">
            <h2 className="display reveal">
              Stay <span className="sf">soft.</span>
              <br />
              Stay in touch.
            </h2>
            <div className="right">
              <p>
                Quiet emails — new arrivals, a fit tip now and then, an
                invitation to the next workshop sale. Nothing else.
              </p>
              <form className="news-form" onSubmit={onSubscribe}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (subscribed) setSubscribed(false);
                  }}
                />
                <button type="submit" disabled={subscribed}>
                  {subscribed ? "Subscribed ✓" : "Subscribe"}
                </button>
              </form>
              <span
                className="eyebrow"
                style={{ color: "rgba(255,255,255,.4)" }}
              >
                No spam · One email a fortnight · Unsubscribe anytime
              </span>
            </div>
          </div>

          <div className="foot-cols">
            <div className="foot-col foot-brand">
              <a className="brand" href="#" aria-label="Blue Jay by Sparoz Apparels">
                <Logo className="logo-img" />
              </a>
              <p className="by-line">
                A <strong>Sparoz Apparels</strong> brand · Muvattupuzha, Kerala
              </p>
              <p>
                Innerwear designed for the long, ordinary days of real life.
                Made for her, made for him, made for every day in between.
              </p>
              <div className="socials">
                <a href="#" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M16 8h-3a2 2 0 0 0-2 2v3M9 13h6M13 13v8" />
                  </svg>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 21l1.6-4.8A8 8 0 1 1 8.2 20.4L3 21z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="6" width="20" height="12" rx="3" />
                    <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="foot-col">
              <h5>Shop</h5>
              <ul>
                <li><a href="#">Women</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">New arrivals</a></li>
                <li><a href="#">Bestsellers</a></li>
                <li><a href="#">Gift sets</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Help</h5>
              <ul>
                <li><a href="#">Size guide</a></li>
                <li><a href="#">Fit consultations</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <ul>
                <li><a href="#">Our story</a></li>
                <li><a href="#">The workshop</a></li>
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Visit the store</a></li>
              </ul>
            </div>
          </div>

          <div className="mega" aria-hidden="true">
            BLUE <span className="red">JAY</span>
          </div>

          <div className="legal">
            <div>
              © 2026 Sparoz Apparels · Muvattupuzha, Kerala · GSTIN
              32ABHFS3123L1Z9
            </div>
            <div className="links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
