"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type NavLink = {
  label: string;
  href: string;
  type: "home" | "scroll" | "page";
};

const navLinks: NavLink[] = [
  { label: "Home",     href: "/",         type: "home"   },
  { label: "About",    href: "#about",    type: "scroll" },
  { label: "Pricing",  href: "#pricing",  type: "scroll" },
  { label: "Classes",  href: "#classes",  type: "scroll" },
  { label: "Contact",  href: "#contact",  type: "scroll" },
  { label: "Calendar", href: "/schedule", type: "page"   },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
    if (link.type === "page") return;
    e.preventDefault();
    setMobileOpen(false);

    if (link.type === "home") {
      if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
      else router.push("/");
      return;
    }

    if (link.type === "scroll") {
      if (!isHome) {
        router.push(`/${link.href}`);
        return;
      }
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleJoinNow = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    router.push("/pricing");
  };

  // On non-home pages the bg is always light, so always use dark colours there
  const dark = scrolled || !isHome;
  const linkColor = dark ? "var(--text)" : "rgba(244,244,240,0.88)";
  const linkHoverColor = dark ? "var(--white)" : "#FFFFFF";

  const renderDesktopLink = (link: NavLink) => {
    const isCalendar = link.label === "Calendar";
    const style: React.CSSProperties = {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: isCalendar ? "var(--orange)" : linkColor,
      textDecoration: "none",
      transition: "color 0.2s",
      padding: isCalendar ? "6px 14px" : undefined,
      border: isCalendar ? "1px solid rgba(248,92,27,0.35)" : undefined,
      borderRadius: isCalendar ? 6 : undefined,
    };

    if (link.type === "page") {
      return (
        <Link
          key={link.label}
          href={link.href}
          style={style}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--orange)")}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.label}
        href={link.href}
        style={style}
        onClick={(e) => handleNavClick(e, link)}
        onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
        onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
      >
        {link.label}
      </a>
    );
  };

  const renderMobileLink = (link: NavLink) => {
    const style: React.CSSProperties = {
      display: "block",
      padding: "14px 0",
      fontFamily: "var(--font-display)",
      fontSize: 26,
      color: link.label === "Calendar" ? "var(--orange)" : "var(--white)",
      textDecoration: "none",
      letterSpacing: "0.04em",
      borderBottom: "1px solid var(--border)",
    };

    if (link.type === "page") {
      return (
        <Link
          key={link.label}
          href={link.href}
          style={style}
          onClick={() => setMobileOpen(false)}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.label}
        href={link.href}
        style={style}
        onClick={(e) => handleNavClick(e, link)}
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s ease, border-color 0.3s ease",
        background: dark ? "rgba(249,248,245,0.95)" : "transparent",
        backdropFilter: dark ? "blur(16px)" : "none",
        WebkitBackdropFilter: dark ? "blur(16px)" : "none",
        borderBottom: dark ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
            else router.push("/");
          }}
          style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 2 }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "0.03em", background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>WAY</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "0.03em", color: dark ? "var(--white)" : "#F4F4F0", lineHeight: 1 }}>MORE</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.18em", color: dark ? "var(--muted)" : "rgba(244,244,240,0.5)", marginLeft: 6, lineHeight: 1 }}>FITNESS</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: 28 }}>
          {navLinks.map(renderDesktopLink)}
          <a
            href="#contact"
            onClick={handleJoinNow}
            className="btn btn-primary"
            style={{ padding: "10px 22px", fontSize: 12 }}
          >
            Join Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="flex lg:hidden"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5, alignItems: "flex-end" }}
        >
          {[
            { w: 22, transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" },
            { w: 16, opacity: mobileOpen ? 0 : 1 },
            { w: 22, transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" },
          ].map((s, i) => (
            <span key={i} style={{ display: "block", width: s.w, height: 2, background: dark ? "var(--white)" : "#F4F4F0", borderRadius: 1, transition: "all 0.25s ease", transform: s.transform, opacity: s.opacity ?? 1 }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden", background: "rgba(249,248,245,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}
          >
            <div style={{ padding: "20px 24px 28px" }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  {renderMobileLink(link)}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} style={{ marginTop: 24 }}>
                <a
                  href="#contact"
                  onClick={handleJoinNow}
                  className="btn btn-primary"
                  style={{ width: "100%", textAlign: "center", display: "block" }}
                >
                  Join Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
