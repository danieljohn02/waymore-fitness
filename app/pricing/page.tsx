import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Plans & Pricing | WayMore Fitness",
  description:
    "Compare all WayMore Fitness memberships, class plans, training packages, and nutrition coaching. Transparent pricing, no contracts.",
};

/* ───────────────────────────────────────────────────────────
   DATA
   ─────────────────────────────────────────────────────────── */

const ptMemberships = [
  {
    icon: "fa-solid fa-bolt",
    name: "Prime Membership",
    slug: "prime",
    price: "$540",
    priceNote: "/ month",
    badge: null,
    tagline: "1x / week personal training",
    description:
      "Build a strong foundation with weekly one-on-one coaching, custom programming, and steady progress toward your goals.",
    features: [
      "1 personal training session per week",
      "Custom workout programming",
      "Progress tracking & adjustments",
      "Dedicated trainer matched to your goals",
      "Community app access",
      "No signup fee",
    ],
    ideal:
      "Best for members who want consistent coaching on a manageable schedule and budget.",
    billing: "Monthly recurring",
    minTerm: "1 month",
  },
  {
    icon: "fa-solid fa-shield-halved",
    name: "Titan Membership",
    slug: "titan",
    price: "$1,060",
    priceNote: "/ month",
    badge: "Most Popular",
    tagline: "2x / week personal training",
    description:
      "Our most popular option. Accelerate results with structured programming, frequent coaching, and consistent momentum toward your goals.",
    features: [
      "2 personal training sessions per week",
      "Custom workout programming",
      "Progress tracking & adjustments",
      "Dedicated trainer matched to your goals",
      "Community app access",
      "No signup fee",
    ],
    ideal:
      "Best for members who want consistent one-on-one coaching with a structured weekly routine.",
    billing: "Monthly recurring",
    minTerm: "1 month",
  },
  {
    icon: "fa-solid fa-crown",
    name: "Elite Membership",
    slug: "elite",
    price: "$1,540",
    priceNote: "/ month",
    badge: "Best Results",
    tagline: "3x / week personal training",
    description:
      "Maximum coaching, faster progress, and elite-level accountability for those ready to push limits and thrive.",
    features: [
      "3 personal training sessions per week",
      "Custom workout programming",
      "Nutrition & lifestyle coaching included",
      "Weekly progress tracking & adjustments",
      "Priority scheduling with your trainer",
      "Dedicated trainer matched to your goals",
      "Community app access",
      "No signup fee",
    ],
    ideal:
      "For members who want the fastest results and maximum face-time with their trainer every week.",
    billing: "Monthly recurring",
    minTerm: "1 month",
  },
];

const classPlans = [
  {
    icon: "fa-solid fa-calendar-check",
    name: "4 Classes / Month",
    slug: "4-classes",
    price: "$115",
    priceNote: "/ month",
    badge: null,
    tagline: "1 class per week",
    description:
      "A flexible way to stay active and consistent. Perfect for busy schedules or anyone looking to supplement personal training with high-energy group workouts.",
    features: [
      "4 group classes per month",
      "Choose from HIIT, Zumba, Pilates & more",
      "Flexible scheduling",
      "Community app access",
      "No signup fee",
    ],
    ideal:
      "Best for: 1 class per week, beginners, or PT clients adding extra conditioning.",
    billing: "Monthly recurring",
    minTerm: "1 month",
  },
  {
    icon: "fa-solid fa-fire",
    name: "8 Classes / Month",
    slug: "8-classes",
    price: "$215",
    priceNote: "/ month",
    badge: "Most Popular",
    tagline: "2 classes per week",
    description:
      "Train twice a week with structure and purpose. Designed to build strength, conditioning, and momentum while keeping flexibility in your schedule.",
    features: [
      "8 group classes per month",
      "Choose from HIIT, Zumba, Pilates & more",
      "Priority class booking",
      "Flexible scheduling",
      "Community app access",
      "No signup fee",
    ],
    ideal:
      "Best for: Members committed to steady progress without going unlimited.",
    billing: "Monthly recurring",
    minTerm: "1 month",
  },
  {
    icon: "fa-solid fa-infinity",
    name: "Unlimited Classes",
    slug: "unlimited-classes",
    price: "$229.99",
    priceNote: "/ month",
    badge: "Best Value",
    tagline: "Unlimited monthly classes",
    description:
      "Maximum access for serious class athletes. Train often, push harder, and stay fully engaged in the WayMore training experience.",
    features: [
      "Unlimited group classes every month",
      "All class formats: HIIT, Zumba, Pilates, Cardio Tae Boxing & more",
      "Priority class booking",
      "Community app access",
      "No signup fee",
    ],
    ideal:
      "Best for: High-frequency attendees who thrive in a group environment.",
    billing: "Monthly recurring",
    minTerm: "1 month",
  },
];

const trainingPackages = [
  {
    icon: "fa-solid fa-bolt",
    name: "Jump Start Package",
    slug: "jump-start",
    price: "$300",
    priceNote: "one-time",
    badge: "Starter",
    tagline: "Your launchpad at WayMore",
    description:
      "Everything you need to hit the ground running. A curated package designed to introduce you to personal training, group classes, and nutrition coaching so you can experience the full WayMore difference.",
    features: [
      "Introductory personal training sessions",
      "Group class access included",
      "Nutrition coaching session",
      "Goal-setting consultation",
      "Community app access",
    ],
    ideal:
      "Perfect for new members who want to sample everything WayMore offers before committing to a membership.",
    billing: "One-time payment",
    term: "Valid for 1 year",
  },
  {
    icon: "fa-solid fa-dumbbell",
    name: "1 Private Training Session",
    slug: "1-pt-session",
    price: "$150",
    priceNote: "per session",
    badge: null,
    tagline: "Single one-on-one session",
    description:
      "A one-time personal training session to experience coaching, test your fit with a trainer, or get a fresh workout when you need it.",
    features: [
      "60-minute private training session",
      "Work with a certified trainer",
      "Custom session based on your goals",
      "No commitment required",
    ],
    ideal:
      "Great for trying personal training for the first time or as a drop-in session.",
    billing: "One-time payment",
    term: "Use within 1 year",
  },
  {
    icon: "fa-solid fa-apple-whole",
    name: "1 Month Nutrition Coaching",
    slug: "1-month-nutrition",
    price: "$150",
    priceNote: "4 sessions",
    badge: null,
    tagline: "30-min weekly nutrition coaching",
    description:
      "Four 30-minute nutrition coaching sessions over one month. Get personalized guidance on eating habits, meal planning, and building a sustainable approach to nutrition.",
    features: [
      "4 x 30-minute nutrition coaching sessions",
      "Personalized meal guidance",
      "Habit tracking & accountability",
      "No commitment beyond the month",
    ],
    ideal:
      "Best for members looking to kickstart healthier eating or complement their training with nutrition support.",
    billing: "One-time payment",
    term: "Valid for 1 year",
  },
  {
    icon: "fa-solid fa-layer-group",
    name: "5 Pack Private Training",
    slug: "5-pack-pt",
    price: "$700",
    priceNote: "5 sessions",
    badge: "Popular",
    tagline: "Flexible 5-session training pack",
    description:
      "A flexible starter option to experience personal training, refine technique, and begin building momentum toward your goals. Use sessions on your schedule.",
    features: [
      "5 x 60-minute private training sessions",
      "Work with a certified trainer",
      "Custom programming each session",
      "Use on your own schedule",
      "$140 per session (save $50 vs. single sessions)",
    ],
    ideal:
      "Ideal for members who want flexibility without a weekly commitment while still seeing real results.",
    billing: "One-time payment",
    term: "Valid for 1 year",
  },
];

const additionalPlans = [
  {
    icon: "fa-solid fa-box-open",
    name: "20 Class Pack",
    slug: "20-class-pack",
    price: "$520",
    priceNote: "20 classes",
    description:
      "Flexible options to attend multiple fitness classes at a discounted rate. Use on your schedule, no monthly commitment.",
    features: [
      "20 group classes",
      "All class formats included",
      "$26 per class",
      "Use on your own schedule",
    ],
    billing: "One-time payment",
    term: "Valid for 1 year",
  },
  {
    icon: "fa-solid fa-boxes-stacked",
    name: "10 Pack Private Training",
    slug: "10-pack-pt",
    price: "$1,350",
    priceNote: "10 sessions",
    description:
      "Designed for consistent progress. Ideal if you want structure without a weekly commitment while still seeing real results.",
    features: [
      "10 x 60-minute private training sessions",
      "Custom programming each session",
      "$135 per session (save $150 vs. single sessions)",
      "Use on your own schedule",
    ],
    billing: "One-time payment",
    term: "Valid for 1 year",
  },
  {
    icon: "fa-solid fa-seedling",
    name: "4 Month Nutrition Coaching",
    slug: "4-month-nutrition",
    price: "$550",
    priceNote: "16 sessions",
    description:
      "16 nutrition coaching sessions over four months. Build lasting habits with consistent weekly guidance and accountability.",
    features: [
      "16 x 30-minute sessions",
      "Personalized meal guidance",
      "Habit tracking & accountability",
      "$34.38 per session",
    ],
    billing: "One-time payment",
    term: "Valid for 1 year",
  },
  {
    icon: "fa-solid fa-trophy",
    name: "1 Year Nutrition Coaching",
    slug: "1-year-nutrition",
    price: "$1,600",
    priceNote: "48 sessions",
    description:
      "48 nutrition coaching sessions over a full year. The ultimate commitment to transforming your relationship with food and fueling performance.",
    features: [
      "48 x 30-minute sessions",
      "Personalized meal guidance & adjustments",
      "Long-term habit building",
      "$33.33 per session (best value)",
    ],
    billing: "One-time payment",
    term: "Valid for 2 years",
  },
];

const faqs = [
  {
    q: "Are there any contracts or cancellation fees?",
    a: "No contracts, ever. Monthly memberships can be canceled anytime with 30 days notice. Packages are one-time purchases with no recurring charges.",
  },
  {
    q: "Can I try before I commit?",
    a: "Yes. We offer a free trial session for first-time visitors. Stop in or call us at (845) 232-0084 to set it up.",
  },
  {
    q: "What's the difference between memberships and packages?",
    a: "Memberships (Titan, Elite, Class Plans) are monthly recurring subscriptions billed automatically. Packages (Jump Start, Training Packs, Nutrition) are one-time purchases you use on your schedule within the validity period.",
  },
  {
    q: "When does billing happen?",
    a: "Monthly memberships bill on the same day each month starting from your join date. Packages are charged once at time of purchase.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can change plans at any time — upgrades take effect immediately, downgrades at the next billing cycle.",
  },
  {
    q: "How do class packs work?",
    a: "Class packs (4/mo, 8/mo, Unlimited) give you a set number of group classes each month. Book through the community app or at the front desk. Unused classes do not roll over.",
  },
  {
    q: "What classes are available?",
    a: "HIIT, Zumba, Mat Pilates, Cardio Tae Boxing, Total Body Conditioning, and rotating specialty classes. Check the schedule page for current times.",
  },
  {
    q: "Do packages expire?",
    a: "Training packs and nutrition coaching packages are valid for 1 year from purchase (1 Year Nutrition is valid for 2 years). The Jump Start Package is also valid for 1 year.",
  },
];

/* ───────────────────────────────────────────────────────────
   COMPONENTS
   ─────────────────────────────────────────────────────────── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 32, marginTop: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{ width: 28, height: 2, background: "var(--grad)", borderRadius: 1 }}
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
      </div>
      <span
        className="detail-swipe-hint"
        style={{
          display: "none",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "var(--muted)",
          fontWeight: 500,
        }}
      >
        Swipe <i className="fa-solid fa-arrow-right" style={{ fontSize: 9 }} />
      </span>
    </div>
  );
}

function DetailCard({
  plan,
}: {
  plan: {
    icon: string;
    name: string;
    slug: string;
    price: string;
    priceNote: string;
    badge?: string | null;
    tagline?: string;
    description: string;
    features: string[];
    ideal?: string;
    billing: string;
    term?: string;
    minTerm?: string;
  };
}) {
  const hasBadge = plan.badge;
  const isFeatured =
    plan.badge === "Most Popular" ||
    plan.badge === "Best Results" ||
    plan.badge === "Starter";

  return (
    <div
      id={plan.slug}
      style={{
        background: isFeatured ? "#FFF5F0" : "var(--card)",
        border: isFeatured
          ? "1.5px solid rgba(248,92,27,0.45)"
          : "1px solid var(--border)",
        borderRadius: 16,
        padding: "36px 28px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isFeatured && (
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
      {hasBadge && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: isFeatured ? "var(--grad)" : "var(--orange-dim)",
            color: isFeatured ? "#000" : "var(--orange)",
            border: isFeatured ? "none" : "1px solid rgba(248,92,27,0.2)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 4,
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "var(--orange-dim)",
          border: "1px solid rgba(248,92,27,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <i className={plan.icon} style={{ fontSize: 18, color: "var(--orange)" }} />
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          color: "var(--white)",
          letterSpacing: "0.02em",
          marginBottom: 4,
        }}
      >
        {plan.name}
      </div>

      {/* Tagline */}
      {plan.tagline && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--orange)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {plan.tagline}
        </div>
      )}

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: "var(--text)",
          lineHeight: 1.65,
          marginBottom: 24,
        }}
      >
        {plan.description}
      </p>

      {/* Price */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 4,
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 52,
            color: "var(--white)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {plan.price}
        </span>
        <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 500 }}>
          {plan.priceNote}
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: isFeatured
            ? "rgba(248,92,27,0.15)"
            : "var(--border)",
          marginBottom: 24,
        }}
      />

      {/* Features */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 14,
        }}
      >
        What&apos;s included
      </div>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {plan.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13,
              color: "var(--text)",
              lineHeight: 1.45,
            }}
          >
            <i
              className="fa-solid fa-check"
              style={{
                color: "var(--orange)",
                fontSize: 11,
                marginTop: 3,
                flexShrink: 0,
              }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Ideal for */}
      {plan.ideal && (
        <p
          style={{
            fontSize: 12,
            color: "var(--muted)",
            lineHeight: 1.55,
            fontStyle: "italic",
            marginBottom: 20,
          }}
        >
          {plan.ideal}
        </p>
      )}

      {/* Billing info */}
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 11,
          color: "var(--muted)",
          marginBottom: 24,
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        <span>
          <i className="fa-solid fa-credit-card" style={{ marginRight: 5, fontSize: 10 }} />
          {plan.billing}
        </span>
        {(plan.minTerm || plan.term) && (
          <span>
            <i className="fa-solid fa-clock" style={{ marginRight: 5, fontSize: 10 }} />
            {plan.minTerm ? `Min: ${plan.minTerm}` : plan.term}
          </span>
        )}
      </div>

      {/* CTA */}
      <Link
        href={`/pay?plan=${plan.slug}`}
        className={isFeatured ? "btn btn-primary" : "btn btn-outline"}
        style={{ textAlign: "center" }}
      >
        Sign Up Now
      </Link>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   PAGE
   ─────────────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      <Navigation />

      {/* Page Header */}
      <section
        style={{
          background: "var(--surface)",
          paddingTop: 120,
          paddingBottom: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(248,92,27,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <div className="section-label">Compare All Plans</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8vw, 96px)",
              color: "var(--white)",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              marginBottom: 20,
            }}
          >
            PLANS &<br />
            <span className="text-gradient">PRICING</span>
          </h1>
          <p
            style={{
              color: "var(--text)",
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            No contracts. No hidden fees. Choose from personal training
            memberships, group class plans, and flexible packages designed for
            every goal and budget.
          </p>
        </div>
      </section>

      {/* ── PERSONAL TRAINING MEMBERSHIPS ─────────────── */}
      <section style={{ background: "var(--black)", padding: "24px 0 0" }}>
        <div className="container">
          <SectionDivider label="Personal Training Memberships" />
          <p
            style={{
              fontSize: 14,
              color: "var(--text)",
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 32,
            }}
          >
            Ongoing monthly memberships with a dedicated personal trainer.
            Custom programming, progress tracking, and consistent coaching
            every week.
          </p>
          <div className="detail-scroll-row">
            {ptMemberships.map((plan) => (
              <DetailCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GROUP CLASS PLANS ─────────────────────────── */}
      <section style={{ background: "var(--black)", padding: "0" }}>
        <div className="container">
          <SectionDivider label="Group Class Plans" />
          <p
            style={{
              fontSize: 14,
              color: "var(--text)",
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 32,
            }}
          >
            Monthly class subscriptions for HIIT, Zumba, Pilates, Cardio Tae
            Boxing, and more. Pick the frequency that fits your life.
          </p>
          <div className="detail-scroll-row">
            {classPlans.map((plan) => (
              <DetailCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES & SESSIONS ───────────────────────── */}
      <section style={{ background: "var(--black)", padding: "0" }}>
        <div className="container">
          <SectionDivider label="Packages &amp; Sessions" />
          <p
            style={{
              fontSize: 14,
              color: "var(--text)",
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 32,
            }}
          >
            One-time purchases with no recurring charges. Use sessions on your
            own schedule within the validity period.
          </p>
          <div className="detail-scroll-row">
            {trainingPackages.map((plan) => (
              <DetailCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MORE OPTIONS ──────────────────────────────── */}
      <section style={{ background: "var(--black)", padding: "0 0 72px" }}>
        <div className="container">
          <SectionDivider label="More Options" />
          <p
            style={{
              fontSize: 14,
              color: "var(--text)",
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 32,
            }}
          >
            Bulk class packs, extended training packages, and long-term
            nutrition coaching for members who want maximum value.
          </p>
          <div className="detail-scroll-row">
            {additionalPlans.map((plan) => (
              <DetailCard
                key={plan.name}
                plan={{ ...plan, badge: null, ideal: undefined, minTerm: undefined }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ALWAYS INCLUDED ───────────────────────────── */}
      <section style={{ background: "var(--surface)", padding: "72px 0" }}>
        <div className="container">
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "40px 40px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div className="section-label" style={{ justifyContent: "center" }}>
                Every Plan
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 36,
                  color: "var(--white)",
                  letterSpacing: "0.02em",
                }}
              >
                ALWAYS INCLUDED
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 20,
              }}
            >
              {[
                { icon: "fa-solid fa-lock-open", text: "No long-term contracts" },
                { icon: "fa-solid fa-rotate-left", text: "Cancel anytime (30-day notice)" },
                { icon: "fa-solid fa-mobile-screen", text: "Community app access" },
                { icon: "fa-solid fa-shield-halved", text: "Secure billing via GymMaster" },
                { icon: "fa-solid fa-person-walking", text: "Clean, welcoming facility" },
                { icon: "fa-solid fa-headset", text: "Member support team" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
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
                    <i
                      className={item.icon}
                      style={{ color: "var(--orange)", fontSize: 13 }}
                    />
                  </div>
                  <span
                    style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.4 }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section style={{ background: "var(--black)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              FAQ
            </div>
            <h2 className="section-title">COMMON QUESTIONS</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
              gap: 20,
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            {faqs.map((faq) => (
              <div
                key={faq.q}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "28px 28px",
                }}
              >
                <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                  <i
                    className="fa-solid fa-circle-question"
                    style={{
                      color: "var(--orange)",
                      fontSize: 16,
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--white)",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text)",
                    lineHeight: 1.7,
                    paddingLeft: 28,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          padding: "72px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="section-label" style={{ justifyContent: "center" }}>
            Not sure?
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 60px)",
              color: "var(--white)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              marginBottom: 16,
            }}
          >
            TALK TO US FIRST
          </h2>
          <p
            style={{
              color: "var(--text)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto 32px",
            }}
          >
            Not sure which plan is right for you? We&apos;ll help you figure it
            out &mdash; no pressure, no sales pitch.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="tel:+18452320084" className="btn btn-primary">
              <i className="fa-solid fa-phone" /> Call (845) 232-0084
            </a>
            <Link href="/#contact" className="btn btn-outline">
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing page responsive */}
      <style>{`
        .detail-scroll-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        @media (max-width: 768px) {
          .detail-scroll-row {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 8px;
            gap: 14px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .detail-scroll-row::-webkit-scrollbar {
            display: none;
          }
          .detail-scroll-row > * {
            min-width: 280px;
            max-width: 300px;
            flex-shrink: 0;
            scroll-snap-align: start;
          }
          .detail-scroll-row::after {
            content: '';
            min-width: 1px;
            flex-shrink: 0;
          }
          .detail-swipe-hint {
            display: inline-flex !important;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}
