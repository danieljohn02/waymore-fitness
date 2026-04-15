"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "3+", label: "Training Tiers" },
  { value: "9+", label: "Classes / Week" },
  { value: "1:1", label: "Coaching" },
  { value: "100%", label: "Results Focused" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "var(--surface)",
        position: "relative",
        padding: "96px 0",
        overflow: "hidden",
      }}
    >
      {/* Diagonal top cut (opposite direction) */}
      <div
        className="diagonal-cut"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "var(--black)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
        }}
      />

      <div
        className="container two-col-grid"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Image with parallax */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, margin: "-80px" }}
          ref={imageRef}
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            aspectRatio: "4/5",
          }}
          className="about-image-wrap"
        >
          <motion.div style={{ y, height: "115%", width: "100%", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80"
              alt="WayMore Fitness gym interior"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </motion.div>

          {/* Decorative orange corner accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 4,
              background: "var(--grad)",
            }}
          />

          {/* Stats overlay card */}
          <motion.div
            className="about-stats-overlay"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            viewport={{ once: true, margin: "-80px" }}
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "16px 20px",
              display: "flex",
              gap: 20,
              boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  color: "var(--orange)",
                  lineHeight: 1,
                }}
              >
                9+
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                Classes/wk
              </div>
            </div>
            <div
              style={{ width: 1, background: "var(--border)", margin: "0 4px" }}
            />
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  color: "var(--orange)",
                  lineHeight: 1,
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                Committed
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Copy */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="section-label">About WayMore</div>

          {/* Pull quote */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              color: "var(--white)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              marginBottom: 28,
            }}
          >
            REAL PEOPLE.
            <br />
            REAL GOALS.
            <br />
            <span className="text-gradient">NO EXCUSES.</span>
          </h2>

          <div className="divider" />

          {/* Brand copy */}
          <p
            style={{
              fontSize: 15,
              color: "var(--text)",
              lineHeight: 1.8,
              marginBottom: 20,
            }}
          >
            WayMore Fitness isn&apos;t another gym that sells you a membership and hopes
            you never show up. We built this space to help real people hit real goals
            — whether that&apos;s your first pull-up, losing 30 pounds, or just showing
            up consistently for the first time in years.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "var(--text)",
              lineHeight: 1.8,
              marginBottom: 36,
            }}
          >
            Located right on South Main Street in New City, we&apos;re your neighborhood
            gym that actually gives a damn. Every class, every training session, and
            every conversation here is about moving you closer to the version of
            yourself you&apos;re working toward.
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }}
                viewport={{ once: true, margin: "-80px" }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 38,
                    color: "var(--orange)",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-primary"
          >
            Start Your Journey
          </a>
        </motion.div>
      </div>

    </section>
  );
}
