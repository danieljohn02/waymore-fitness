"use client";

import { motion } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=85",
  "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=1200&q=85",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=85",
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: 600,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 2x2 Mosaic Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        {heroImages.map((src, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay gradient — reduced for more visible images */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.50) 45%, rgba(8,8,8,0.16) 100%)",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.28)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(to top, var(--black), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          paddingTop: 72,
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <motion.div {...fadeUp(0)}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 32,
                height: 2,
                background: "var(--grad)",
                borderRadius: 1,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--orange)",
              }}
            >
              New City, NY · Boutique Gym
            </span>
          </div>
        </motion.div>

        {/* H1 */}
        <div style={{ lineHeight: 0.9, marginBottom: 28 }}>
          <motion.div {...fadeUp(0.15)}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(80px, 14vw, 200px)",
                color: "#F4F4F0",
                letterSpacing: "0.01em",
                display: "block",
              }}
            >
              BE
            </h1>
          </motion.div>
          <motion.div {...fadeUp(0.3)}>
            <h1
              className="shimmer"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(80px, 14vw, 200px)",
                letterSpacing: "0.01em",
                display: "block",
              }}
            >
              WAYMORE
            </h1>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p {...fadeUp(0.45)}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 2vw, 20px)",
              fontWeight: 300,
              color: "rgba(244,244,240,0.7)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              maxWidth: 480,
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            Real People. Real Goals. No Excuses.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.6)}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-primary"
            >
              View Memberships
            </a>
            <a
              href="#classes"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#classes")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-outline"
            style={{ color: "#F4F4F0", borderColor: "rgba(244,244,240,0.38)" }}
            >
              Explore Classes
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(244,244,240,0.35)",
          }}
        >
          Scroll ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
