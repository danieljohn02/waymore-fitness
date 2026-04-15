"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ── ROW 1: PT Memberships ────────────────────────────── */
const memberships = [
  {
    name: "Prime Membership",
    freq: "1x / week personal training",
    price: "$540",
    priceNote: "/ mo",
    description:
      "Build a strong foundation with weekly one-on-one coaching, custom programming, and steady progress.",
    slug: "prime",
    icon: "fa-solid fa-bolt",
  },
  {
    name: "Titan Membership",
    freq: "2x / week personal training",
    price: "$1,060",
    priceNote: "/ mo",
    description:
      "Accelerate results with structured programming, frequent coaching, and consistent momentum toward your goals.",
    slug: "titan",
    icon: "fa-solid fa-shield-halved",
    featured: true,
  },
  {
    name: "Elite Membership",
    freq: "3x / week personal training",
    price: "$1,540",
    priceNote: "/ mo",
    description:
      "Maximum coaching, faster progress, and elite-level accountability for those ready to push limits and thrive.",
    slug: "elite",
    icon: "fa-solid fa-crown",
  },
];

/* ── ROW 2: Class Plans ───────────────────────────────── */
const classPlans = [
  {
    name: "4 Classes / Month",
    price: "$115",
    priceNote: "/ mo",
    description: "1 class per week. Perfect for busy schedules or supplementing PT.",
    slug: "4-classes",
    icon: "fa-solid fa-calendar-check",
  },
  {
    name: "8 Classes / Month",
    price: "$215",
    priceNote: "/ mo",
    description: "Twice a week with purpose. Steady progress without going unlimited.",
    slug: "8-classes",
    icon: "fa-solid fa-fire",
    featured: true,
  },
  {
    name: "Unlimited Classes",
    price: "$229.99",
    priceNote: "/ mo",
    description: "Maximum access for serious class athletes who thrive in a group environment.",
    slug: "unlimited-classes",
    icon: "fa-solid fa-infinity",
  },
];

/* ── ROW 3: Packages ──────────────────────────────────── */
const packages = [
  {
    name: "Jump Start Package",
    price: "$300",
    priceNote: "one-time",
    description: "Everything you need to hit the ground running at WayMore.",
    slug: "jump-start",
    icon: "fa-solid fa-bolt",
    featured: true,
  },
  {
    name: "1 Private Training Session",
    price: "$150",
    priceNote: "per session",
    description: "A single one-on-one session to experience personal training.",
    slug: "1-pt-session",
    icon: "fa-solid fa-dumbbell",
  },
  {
    name: "1 Month Nutrition Coaching",
    price: "$150",
    priceNote: "4 sessions",
    description: "Four 30-min nutrition coaching sessions over one month.",
    slug: "1-month-nutrition",
    icon: "fa-solid fa-apple-whole",
  },
  {
    name: "5 Pack Private Training",
    price: "$700",
    priceNote: "5 sessions",
    description: "Flexible starter pack to refine technique and build momentum.",
    slug: "5-pack-pt",
    icon: "fa-solid fa-layer-group",
  },
];

/* ── Compact Card ─────────────────────────────────────── */
function PricingCard({
  name,
  price,
  priceNote,
  description,
  slug,
  icon,
  featured,
  index,
}: {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  slug: string;
  icon: string;
  featured?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-60px" }}
      style={{
        background: featured ? "#FFF5F0" : "var(--card)",
        border: featured
          ? "1.5px solid rgba(248,92,27,0.45)"
          : "1px solid var(--border)",
        borderRadius: 12,
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      whileHover={{
        y: -3,
        boxShadow: featured
          ? "0 16px 40px rgba(248,92,27,0.12)"
          : "0 12px 32px rgba(0,0,0,0.06)",
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "var(--grad)",
          }}
        />
      )}

      {/* Icon + Name row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "var(--orange-dim)",
            border: "1px solid rgba(248,92,27,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <i className={icon} style={{ fontSize: 14, color: "var(--orange)" }} />
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "var(--white)",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
      </div>

      {/* Price */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 4,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 36,
            color: "var(--white)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {price}
        </span>
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
          {priceNote}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 12,
          color: "var(--text)",
          lineHeight: 1.5,
          marginBottom: 16,
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* CTA */}
      <Link
        href={`/pricing?plan=${slug}`}
        className={featured ? "btn btn-primary" : "btn btn-outline"}
        style={{ textAlign: "center", fontSize: 11, padding: "9px 14px" }}
      >
        Learn More
      </Link>
    </motion.div>
  );
}

/* ── Row Label ────────────────────────────────────────── */
function RowLabel({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-60px" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 20,
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
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--orange)",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────────────────── */
export default function PricingSection() {
  return (
    <section
      id="pricing"
      style={{
        background: "var(--surface)",
        position: "relative",
        padding: "96px 0",
        overflow: "hidden",
      }}
    >
      {/* Diagonal top cut */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: "var(--black)",
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              className="section-label"
              style={{ justifyContent: "center" }}
            >
              Plans &amp; Pricing
            </div>
            <h2 className="section-title">
              FIND YOUR <span className="text-gradient">PLAN</span>
            </h2>
            <p
              style={{
                color: "var(--text)",
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              No contracts. No hidden fees. Straightforward pricing for
              memberships, classes, and packages.
            </p>
          </motion.div>
        </div>

        {/* ── ROW 1: Memberships ──────────────────────── */}
        <RowLabel label="Personal Training Memberships" index={0} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {memberships.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} index={i} />
          ))}
        </div>

        {/* ── ROW 2: Classes ──────────────────────────── */}
        <RowLabel label="Group Classes" index={1} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {classPlans.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} index={i} />
          ))}
        </div>

        {/* ── ROW 3: Packages ─────────────────────────── */}
        <RowLabel label="Packages &amp; Sessions" index={2} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {packages.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} index={i} />
          ))}
        </div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{
            textAlign: "center",
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p style={{ color: "var(--muted)", fontSize: 13 }}>
            All plans include community app access. Questions?{" "}
            <a
              href="mailto:info@waymorefitness.com"
              style={{ color: "var(--orange)", textDecoration: "none" }}
            >
              Contact us
            </a>{" "}
            anytime.
          </p>
          <Link
            href="/pricing"
            style={{
              color: "var(--orange)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Compare all plans in detail &rarr;
          </Link>
        </motion.div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          #pricing [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          #pricing [style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
          #pricing [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          #pricing [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
