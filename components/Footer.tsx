"use client";

import Link from "next/link";

const navLinks = [
  { label: "Pricing",  href: "#pricing"   },
  { label: "Classes",  href: "#classes"   },
  { label: "About",    href: "#about"     },
  { label: "Calendar", href: "/schedule"  },
  { label: "Contact",  href: "#contact"   },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "32px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "baseline",
            gap: 2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              letterSpacing: "0.03em",
              background: "var(--grad)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            WAY
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              letterSpacing: "0.03em",
              color: "var(--white)",
              lineHeight: 1,
            }}
          >
            MORE
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--muted)",
              marginLeft: 5,
              lineHeight: 1,
            }}
          >
            FITNESS
          </span>
        </a>

        {/* Copyright */}
        <p
          style={{
            fontSize: 12,
            color: "var(--muted)",
            letterSpacing: "0.03em",
          }}
        >
          © {currentYear} WayMore Fitness · New City, NY · All rights reserved.
        </p>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
