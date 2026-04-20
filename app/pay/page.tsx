"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/* ── Plan Data ─────────────────────────────────────────── */

const planDetails: Record<
  string,
  { name: string; price: string; priceNote: string; billing: string; features: string[] }
> = {
  prime: {
    name: "Prime Membership",
    price: "$540",
    priceNote: "/mo",
    billing: "$540.00 billed monthly",
    features: ["1x/week personal training", "Custom programming", "Progress tracking", "Dedicated trainer"],
  },
  titan: {
    name: "Titan Membership",
    price: "$1,060",
    priceNote: "/mo",
    billing: "$1,060.00 billed monthly",
    features: ["2x/week personal training", "Custom programming", "Progress tracking", "Dedicated trainer"],
  },
  elite: {
    name: "Elite Membership",
    price: "$1,540",
    priceNote: "/mo",
    billing: "$1,540.00 billed monthly",
    features: ["3x/week personal training", "Custom programming", "Nutrition & lifestyle coaching", "Priority scheduling"],
  },
  "4-classes": {
    name: "4 Classes / Month",
    price: "$115",
    priceNote: "/mo",
    billing: "$115.00 billed monthly",
    features: ["4 group classes per month", "All class formats", "Flexible scheduling", "Community app"],
  },
  "8-classes": {
    name: "8 Classes / Month",
    price: "$215",
    priceNote: "/mo",
    billing: "$215.00 billed monthly",
    features: ["8 group classes per month", "All class formats", "Priority booking", "Community app"],
  },
  "unlimited-classes": {
    name: "Unlimited Classes",
    price: "$229.99",
    priceNote: "/mo",
    billing: "$229.99 billed monthly",
    features: ["Unlimited group classes", "All class formats", "Priority booking", "Community app"],
  },
  "jump-start": {
    name: "Jump Start Package",
    price: "$300",
    priceNote: "one-time",
    billing: "$300.00 one-time payment",
    features: ["Intro PT sessions", "Group class access", "Nutrition coaching session", "Goal-setting consultation"],
  },
  "1-pt-session": {
    name: "1 Private Training Session",
    price: "$150",
    priceNote: "per session",
    billing: "$150.00 one-time payment",
    features: ["60-minute private session", "Certified trainer", "Custom session", "No commitment"],
  },
  "1-month-nutrition": {
    name: "1 Month Nutrition Coaching",
    price: "$150",
    priceNote: "4 sessions",
    billing: "$150.00 one-time payment",
    features: ["4 x 30-min sessions", "Personalized guidance", "Habit tracking", "No commitment"],
  },
  "5-pack-pt": {
    name: "5 Pack Private Training",
    price: "$700",
    priceNote: "5 sessions",
    billing: "$700.00 one-time payment",
    features: ["5 x 60-min sessions", "Custom programming", "Use on your schedule", "$140/session"],
  },
  "20-class-pack": {
    name: "20 Class Pack",
    price: "$520",
    priceNote: "20 classes",
    billing: "$520.00 one-time payment",
    features: ["20 group classes", "All formats", "$26/class", "Use on your schedule"],
  },
  "10-pack-pt": {
    name: "10 Pack Private Training",
    price: "$1,350",
    priceNote: "10 sessions",
    billing: "$1,350.00 one-time payment",
    features: ["10 x 60-min sessions", "Custom programming", "$135/session", "Use on your schedule"],
  },
  "4-month-nutrition": {
    name: "4 Month Nutrition Coaching",
    price: "$550",
    priceNote: "16 sessions",
    billing: "$550.00 one-time payment",
    features: ["16 x 30-min sessions", "Personalized guidance", "Habit tracking", "$34.38/session"],
  },
  "1-year-nutrition": {
    name: "1 Year Nutrition Coaching",
    price: "$1,600",
    priceNote: "48 sessions",
    billing: "$1,600.00 one-time payment",
    features: ["48 x 30-min sessions", "Personalized guidance", "Long-term habits", "$33.33/session"],
  },
};

/* ── Helpers ───────────────────────────────────────────── */

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  return digits;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length >= 7) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length >= 4) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length > 0) return `(${digits}`;
  return "";
}

/* ── Step indicator ────────────────────────────────────── */

function StepIndicator({ step }: { step: number }) {
  const steps = ["Personal Info", "Emergency Contact", "Terms", "Payment"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {steps.map((label, i) => {
        const isActive = i + 1 === step;
        const isDone = i + 1 < step;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isDone ? "var(--orange)" : isActive ? "var(--grad)" : "var(--surface)",
                  border: isDone || isActive ? "none" : "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: isDone || isActive ? "#000" : "var(--muted)",
                  flexShrink: 0,
                }}
              >
                {isDone ? <i className="fa-solid fa-check" style={{ fontSize: 10 }} /> : i + 1}
              </div>
              <span
                className="step-label"
                style={{
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--white)" : "var(--muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: isDone ? "var(--orange)" : "var(--border)",
                  margin: "0 12px",
                  minWidth: 20,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Form ─────────────────────────────────────────── */

function PayContent() {
  const searchParams = useSearchParams();
  const planSlug = searchParams.get("plan") || "titan";
  const plan = planDetails[planSlug] || planDetails["titan"];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // Personal
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    street: "",
    city: "",
    state: "NY",
    zip: "",
    // Emergency
    ecName: "",
    ecPhone: "",
    ecEmail: "",
    ecRelationship: "",
    // Terms
    agreeTerms: false,
    agreeSms: false,
    // Payment
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingZip: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    let value: string | boolean;
    if (type === "checkbox") {
      value = (e.target as HTMLInputElement).checked;
    } else {
      value = e.target.value;
    }

    let formatted = value as string;
    if (name === "cardNumber") formatted = formatCardNumber(formatted);
    if (name === "expiry") formatted = formatExpiry(formatted);
    if (name === "cvv") formatted = (formatted as string).replace(/\D/g, "").slice(0, 4);
    if (name === "billingZip" || name === "zip") formatted = (formatted as string).replace(/\D/g, "").slice(0, 5);
    if (name === "phone" || name === "ecPhone") formatted = formatPhone(formatted);

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: formatted }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateStep = (s: number) => {
    const errs: Record<string, boolean> = {};
    if (s === 1) {
      ["firstName", "lastName", "email", "phone", "dob", "street", "city", "state", "zip"].forEach((f) => {
        if (!form[f as keyof typeof form].toString().trim()) errs[f] = true;
      });
      if (form.zip.replace(/\D/g, "").length < 5) errs.zip = true;
    } else if (s === 2) {
      ["ecName", "ecPhone", "ecRelationship"].forEach((f) => {
        if (!form[f as keyof typeof form].toString().trim()) errs[f] = true;
      });
    } else if (s === 3) {
      if (!form.agreeTerms) errs.agreeTerms = true;
    } else if (s === 4) {
      ["cardName", "cardNumber", "expiry", "cvv", "billingZip"].forEach((f) => {
        if (!form[f as keyof typeof form].toString().trim()) errs[f] = true;
      });
      if (form.cardNumber.replace(/\s/g, "").length < 16) errs.cardNumber = true;
      if (form.expiry.replace(/\D/g, "").length < 4) errs.expiry = true;
      if (form.cvv.length < 3) errs.cvv = true;
      if (form.billingZip.replace(/\D/g, "").length < 5) errs.billingZip = true;
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep(4);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSubmitted(true);
    }, 2000);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: "#FAFAF8",
    border: `1.5px solid ${errors[name] ? "#ef4444" : "var(--border)"}`,
    borderRadius: 8,
    padding: "13px 16px",
    fontSize: 14,
    color: "var(--white)",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  });

  const selectStyle = (name: string): React.CSSProperties => ({
    ...inputStyle(name),
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239A9691' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: 36,
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: 7,
  };

  const sectionCardStyle: React.CSSProperties = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "28px",
    marginBottom: 20,
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    color: "var(--white)",
    letterSpacing: "0.03em",
    marginBottom: 20,
  };

  const focusHandlers = (name: string) => ({
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!errors[name]) e.target.style.borderColor = "rgba(248,92,27,0.5)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!errors[name]) e.target.style.borderColor = "var(--border)";
    },
  });

  /* ── Success State ─── */
  if (submitted) {
    return (
      <>
        <Navigation />
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--black)",
            paddingTop: 72,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "2px solid #22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}
            >
              <i className="fa-solid fa-check" style={{ color: "#22c55e", fontSize: 30 }} />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 52,
                color: "var(--white)",
                letterSpacing: "0.02em",
                marginBottom: 16,
              }}
            >
              YOU&apos;RE IN!
            </h1>
            <p style={{ color: "var(--text)", fontSize: 16, lineHeight: 1.75, marginBottom: 8 }}>
              Welcome to WayMore Fitness,{" "}
              <strong style={{ color: "var(--white)" }}>{form.firstName}</strong>!
            </p>
            <p style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              Your <strong style={{ color: "var(--white)" }}>{plan.name}</strong> is
              confirmed. Check your email at{" "}
              <strong style={{ color: "var(--orange)" }}>{form.email}</strong> for your
              welcome packet and next steps.
            </p>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "20px 24px",
                marginBottom: 32,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                First steps
              </div>
              {[
                "Stop by 63 S Main St, New City, NY to get your member card",
                "Download the community app (link in your welcome email)",
                "Check the class schedule and book your first session",
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 10,
                    fontSize: 13,
                    color: "var(--text)",
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "var(--grad)",
                      color: "#000",
                      fontSize: 11,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  {s}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link href="/schedule" className="btn btn-primary">
                View Class Schedule
              </Link>
              <Link href="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Form Steps ─── */
  return (
    <>
      <Navigation />

      {/* Breadcrumb */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          paddingTop: 90,
        }}
      >
        <div className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
              Home
            </Link>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: 9 }} />
            <Link href="/pricing" style={{ color: "var(--muted)", textDecoration: "none" }}>
              Pricing
            </Link>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: 9 }} />
            <span style={{ color: "var(--orange)", fontWeight: 600 }}>Sign Up</span>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--black)", padding: "56px 0 80px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 40,
              alignItems: "start",
            }}
          >
            {/* ── Left: Plan Summary ── */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ marginBottom: 20 }}>
                <div className="section-label">Order Summary</div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 36,
                    color: "var(--white)",
                    letterSpacing: "0.02em",
                  }}
                >
                  YOUR PLAN
                </h2>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1.5px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div style={{ background: "var(--grad)", padding: "20px 24px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 28,
                      color: "#000",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {plan.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 44,
                        color: "#000",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: "rgba(0,0,0,0.6)",
                        fontWeight: 600,
                      }}
                    >
                      {plan.priceNote}
                    </span>
                  </div>
                </div>
                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: 12,
                    }}
                  >
                    Includes
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 20,
                    }}
                  >
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 13,
                          color: "var(--text)",
                        }}
                      >
                        <i
                          className="fa-solid fa-check"
                          style={{ color: "var(--orange)", fontSize: 11 }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        color: "var(--text)",
                        marginBottom: 8,
                      }}
                    >
                      <span>Subtotal</span>
                      <span style={{ color: "var(--white)", fontWeight: 600 }}>
                        {plan.price}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        color: "var(--text)",
                        marginBottom: 8,
                      }}
                    >
                      <span>Signup fee</span>
                      <span style={{ color: "#22c55e", fontWeight: 600 }}>Waived</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 15,
                        fontWeight: 700,
                        borderTop: "1px solid var(--border)",
                        paddingTop: 12,
                        marginTop: 8,
                      }}
                    >
                      <span style={{ color: "var(--white)" }}>Due today</span>
                      <span style={{ color: "var(--orange)" }}>{plan.price}</span>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 12,
                      lineHeight: 1.5,
                    }}
                  >
                    {plan.billing}. Cancel anytime with 30 days notice.
                  </p>
                </div>
              </div>

              <Link
                href="/pricing"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 16,
                  fontSize: 12,
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                &larr; Change plan
              </Link>

              {/* Trust signals */}
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  { icon: "fa-solid fa-lock", text: "Secure 256-bit SSL encryption" },
                  { icon: "fa-solid fa-rotate-left", text: "Cancel anytime, no fees" },
                  { icon: "fa-solid fa-shield-halved", text: "No contracts or commitments" },
                ].map((item) => (
                  <div
                    key={item.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{ color: "var(--orange)", fontSize: 12, width: 14 }}
                    />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Multi-Step Form ── */}
            <div>
              <div style={{ marginBottom: 8 }}>
                <div className="section-label">Sign Up</div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 36,
                    color: "var(--white)",
                    letterSpacing: "0.02em",
                    marginBottom: 8,
                  }}
                >
                  {step === 1 && "PERSONAL INFO"}
                  {step === 2 && "EMERGENCY CONTACT"}
                  {step === 3 && "TERMS & CONDITIONS"}
                  {step === 4 && "PAYMENT DETAILS"}
                </h2>
              </div>

              <StepIndicator step={step} />

              <form
                onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                noValidate
              >
                {/* ════════════════ STEP 1: Personal Info ════════════════ */}
                {step === 1 && (
                  <>
                    <div className="pay-section-card" style={sectionCardStyle}>
                      <h3 style={sectionHeadingStyle}>ABOUT YOU</h3>
                      <div className="form-row">
                        <div>
                          <label style={labelStyle}>First Name *</label>
                          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" style={inputStyle("firstName")} {...focusHandlers("firstName")} />
                        </div>
                        <div>
                          <label style={labelStyle}>Last Name *</label>
                          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle("lastName")} {...focusHandlers("lastName")} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div>
                          <label style={labelStyle}>Email *</label>
                          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" style={inputStyle("email")} {...focusHandlers("email")} />
                        </div>
                        <div>
                          <label style={labelStyle}>Phone *</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(845) 555-0000" style={inputStyle("phone")} {...focusHandlers("phone")} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div>
                          <label style={labelStyle}>Date of Birth *</label>
                          <input type="date" name="dob" value={form.dob} onChange={handleChange} style={inputStyle("dob")} {...focusHandlers("dob")} />
                        </div>
                        <div>
                          <label style={labelStyle}>Gender</label>
                          <select name="gender" value={form.gender} onChange={handleChange} style={selectStyle("gender")} {...focusHandlers("gender")}>
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pay-section-card" style={sectionCardStyle}>
                      <h3 style={sectionHeadingStyle}>YOUR ADDRESS</h3>
                      <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Street Address *</label>
                        <input type="text" name="street" value={form.street} onChange={handleChange} placeholder="123 Main St" style={inputStyle("street")} {...focusHandlers("street")} />
                      </div>
                      <div className="form-row">
                        <div>
                          <label style={labelStyle}>City *</label>
                          <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="New City" style={inputStyle("city")} {...focusHandlers("city")} />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <div>
                            <label style={labelStyle}>State *</label>
                            <select name="state" value={form.state} onChange={handleChange} style={selectStyle("state")} {...focusHandlers("state")}>
                              {US_STATES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label style={labelStyle}>ZIP *</label>
                            <input type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="10956" style={inputStyle("zip")} {...focusHandlers("zip")} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ════════════════ STEP 2: Emergency Contact ════════════════ */}
                {step === 2 && (
                  <div className="pay-section-card" style={sectionCardStyle}>
                    <h3 style={sectionHeadingStyle}>EMERGENCY CONTACT</h3>
                    <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, marginBottom: 24 }}>
                      Please provide someone we can reach in case of an emergency during your time at the gym.
                    </p>
                    <div className="form-row">
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input type="text" name="ecName" value={form.ecName} onChange={handleChange} placeholder="John Doe" style={inputStyle("ecName")} {...focusHandlers("ecName")} />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone *</label>
                        <input type="tel" name="ecPhone" value={form.ecPhone} onChange={handleChange} placeholder="(845) 555-0000" style={inputStyle("ecPhone")} {...focusHandlers("ecPhone")} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" name="ecEmail" value={form.ecEmail} onChange={handleChange} placeholder="john@example.com" style={inputStyle("ecEmail")} {...focusHandlers("ecEmail")} />
                      </div>
                      <div>
                        <label style={labelStyle}>Relationship *</label>
                        <select name="ecRelationship" value={form.ecRelationship} onChange={handleChange} style={selectStyle("ecRelationship")} {...focusHandlers("ecRelationship")}>
                          <option value="">Select...</option>
                          <option value="spouse">Spouse / Partner</option>
                          <option value="parent">Parent</option>
                          <option value="sibling">Sibling</option>
                          <option value="friend">Friend</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ════════════════ STEP 3: Terms & Conditions ════════════════ */}
                {step === 3 && (
                  <div className="pay-section-card" style={sectionCardStyle}>
                    <h3 style={sectionHeadingStyle}>TERMS &amp; CONDITIONS</h3>

                    {/* Scrollable terms box */}
                    <div
                      className="terms-box"
                      style={{
                        background: "#FAFAF8",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        padding: "20px 24px",
                        maxHeight: 320,
                        overflowY: "auto",
                        marginBottom: 24,
                        fontSize: 13,
                        color: "var(--text)",
                        lineHeight: 1.75,
                      }}
                    >
                      <p style={{ fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>
                        WayMore Fitness Membership Agreement
                      </p>

                      <p style={{ fontWeight: 600, color: "var(--white)", marginTop: 16, marginBottom: 6 }}>
                        1. Membership & Billing
                      </p>
                      <p>
                        By signing up, you authorize WayMore Fitness to charge your payment method on file for the selected plan. Monthly memberships are billed on a recurring basis on the same day each month from your start date. One-time packages are charged in full at the time of purchase. All prices are in USD and are subject to applicable taxes.
                      </p>

                      <p style={{ fontWeight: 600, color: "var(--white)", marginTop: 16, marginBottom: 6 }}>
                        2. Cancellation Policy
                      </p>
                      <p>
                        Monthly memberships may be canceled at any time with a minimum of 30 days written notice. No cancellation fees apply. Upon cancellation, your membership will remain active through the end of the current billing cycle. Package purchases are non-refundable but are transferable to another individual with prior written approval.
                      </p>

                      <p style={{ fontWeight: 600, color: "var(--white)", marginTop: 16, marginBottom: 6 }}>
                        3. Assumption of Risk & Waiver of Liability
                      </p>
                      <p>
                        You acknowledge that participation in fitness activities involves inherent risks, including but not limited to physical injury, disability, and death. You voluntarily assume all risks associated with your use of WayMore Fitness facilities, equipment, classes, and services. You agree to release, discharge, and hold harmless WayMore Fitness, its owners, employees, trainers, and agents from any and all claims, demands, or causes of action arising out of your use of the facility.
                      </p>

                      <p style={{ fontWeight: 600, color: "var(--white)", marginTop: 16, marginBottom: 6 }}>
                        4. Health Representation
                      </p>
                      <p>
                        You represent that you are in good physical health and have no medical conditions that would prevent safe participation in exercise programs. You agree to consult with a physician before beginning any exercise program if you have any health concerns. You agree to notify WayMore Fitness staff of any changes to your health status.
                      </p>

                      <p style={{ fontWeight: 600, color: "var(--white)", marginTop: 16, marginBottom: 6 }}>
                        5. Facility Rules
                      </p>
                      <p>
                        Members are expected to follow all posted rules and guidelines, treat staff and fellow members with respect, return equipment to its designated location after use, and maintain proper hygiene. WayMore Fitness reserves the right to revoke membership for violations of facility rules or conduct deemed inappropriate or unsafe.
                      </p>

                      <p style={{ fontWeight: 600, color: "var(--white)", marginTop: 16, marginBottom: 6 }}>
                        6. Privacy
                      </p>
                      <p>
                        Your personal information will be used solely for the purpose of managing your membership, billing, and communication related to WayMore Fitness services. We will not sell or share your personal data with third parties without your consent, except as required by law.
                      </p>

                      <p style={{ fontWeight: 600, color: "var(--white)", marginTop: 16, marginBottom: 6 }}>
                        7. Modifications
                      </p>
                      <p>
                        WayMore Fitness reserves the right to modify these terms, pricing, class schedules, and facility hours with reasonable notice to members. Continued use of the facility after notification of changes constitutes acceptance of updated terms.
                      </p>
                    </div>

                    {/* Agreement checkboxes */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          cursor: "pointer",
                          fontSize: 13,
                          color: errors.agreeTerms ? "#ef4444" : "var(--text)",
                          lineHeight: 1.5,
                        }}
                      >
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={form.agreeTerms}
                          onChange={handleChange}
                          style={{
                            width: 18,
                            height: 18,
                            marginTop: 2,
                            accentColor: "var(--orange)",
                            flexShrink: 0,
                          }}
                        />
                        <span>
                          I have read and agree to the WayMore Fitness Membership Agreement, including the assumption of risk and waiver of liability. <strong style={{ color: errors.agreeTerms ? "#ef4444" : "var(--white)" }}>*</strong>
                        </span>
                      </label>

                      <label
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          cursor: "pointer",
                          fontSize: 13,
                          color: "var(--text)",
                          lineHeight: 1.5,
                        }}
                      >
                        <input
                          type="checkbox"
                          name="agreeSms"
                          checked={form.agreeSms}
                          onChange={handleChange}
                          style={{
                            width: 18,
                            height: 18,
                            marginTop: 2,
                            accentColor: "var(--orange)",
                            flexShrink: 0,
                          }}
                        />
                        <span>
                          I agree to receive SMS messages from WayMore Fitness (membership updates, booking confirmations, promotions). Message & data rates may apply. Reply STOP to opt out.
                        </span>
                      </label>
                    </div>

                    {errors.agreeTerms && (
                      <p style={{ fontSize: 12, color: "#ef4444", marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <i className="fa-solid fa-circle-exclamation" />
                        You must agree to the terms to continue.
                      </p>
                    )}
                  </div>
                )}

                {/* ════════════════ STEP 4: Payment ════════════════ */}
                {step === 4 && (
                  <div className="pay-section-card" style={sectionCardStyle}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20,
                      }}
                    >
                      <h3 style={sectionHeadingStyle}>CARD DETAILS</h3>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["fa-cc-visa", "fa-cc-mastercard", "fa-cc-amex"].map((icon) => (
                          <i
                            key={icon}
                            className={`fa-brands ${icon}`}
                            style={{ fontSize: 22, color: "var(--muted)" }}
                          />
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Cardholder Name *</label>
                      <input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder="Jane Doe" style={inputStyle("cardName")} {...focusHandlers("cardName")} />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Card Number *</label>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          name="cardNumber"
                          value={form.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          style={{
                            ...inputStyle("cardNumber"),
                            paddingRight: 48,
                            letterSpacing: "0.08em",
                          }}
                          {...focusHandlers("cardNumber")}
                        />
                        <i
                          className="fa-solid fa-credit-card"
                          style={{
                            position: "absolute",
                            right: 14,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--muted)",
                            fontSize: 16,
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="pay-card-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <div>
                        <label style={labelStyle}>Expiry *</label>
                        <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM / YY" style={inputStyle("expiry")} {...focusHandlers("expiry")} />
                      </div>
                      <div>
                        <label style={labelStyle}>CVV *</label>
                        <input type="text" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" style={inputStyle("cvv")} {...focusHandlers("cvv")} />
                      </div>
                      <div>
                        <label style={labelStyle}>Billing ZIP *</label>
                        <input type="text" name="billingZip" value={form.billingZip} onChange={handleChange} placeholder="10956" style={inputStyle("billingZip")} {...focusHandlers("billingZip")} />
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        marginTop: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <i className="fa-solid fa-lock" style={{ color: "var(--orange)" }} />
                      This is a demo — no real charges will be made.
                    </p>
                  </div>
                )}

                {/* ── Navigation Buttons ── */}
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-outline"
                      style={{ padding: "14px 24px" }}
                    >
                      <i className="fa-solid fa-arrow-left" style={{ fontSize: 12 }} /> Back
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 1, padding: "14px 28px", fontSize: 14 }}
                    >
                      Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={processing}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        fontSize: 15,
                        padding: "16px 28px",
                        opacity: processing ? 0.75 : 1,
                        cursor: processing ? "wait" : "pointer",
                      }}
                    >
                      {processing ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-lock" /> Complete Sign Up — {plan.price}
                        </>
                      )}
                    </button>
                  )}
                </div>

                {step === 4 && (
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    By completing sign up you confirm you have read and agreed to our terms & conditions.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 900px) {
          section .container > div[style*="grid-template-columns: 1fr 1.4fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          /* Step indicator: hide labels, show numbers only */
          .step-label {
            display: none !important;
          }
          /* Stack card number fields */
          .pay-card-row {
            grid-template-columns: 1fr !important;
          }
          /* Ensure form cards don't overflow */
          .pay-section-card {
            padding: 20px 16px !important;
          }
          /* Terms box: shorter on mobile */
          .terms-box {
            max-height: 200px !important;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}

export default function PayPage() {
  return (
    <Suspense
      fallback={<div style={{ minHeight: "100vh", background: "var(--black)" }} />}
    >
      <PayContent />
    </Suspense>
  );
}
