"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const interests = [
  "Personal Training — Prime ($540/mo)",
  "Personal Training — Titan ($1,060/mo)",
  "Personal Training — Elite ($1,540/mo)",
  "Group Classes",
  "Jump Start Package ($300)",
  "Nutrition Coaching",
  "Just Looking Around",
];

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ["firstName", "lastName", "email", "interest"];
    const newErrors: Record<string, boolean> = {};
    required.forEach((field) => {
      if (!form[field as keyof typeof form].trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: "var(--black)",
    border: `1px solid ${errors[name] ? "var(--orange)" : "var(--border)"}`,
    borderRadius: 8,
    padding: "13px 16px",
    fontSize: 14,
    color: "var(--white)",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <section
      id="contact"
      style={{
        background: "var(--black)",
        padding: "96px 0",
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Get In Touch
          </div>
          <h2 className="section-title">
            READY TO BE <span className="text-gradient">WAYMORE?</span>
          </h2>
          <p
            style={{
              color: "var(--text)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Drop us a message, stop by, or give us a call. We&apos;ll help you find the
            right plan and get you started.
          </p>
        </motion.div>

        <div className="two-col-grid-contact">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div style={{ marginBottom: 48 }}>
              {[
                {
                  icon: "fa-solid fa-location-dot",
                  label: "Location",
                  lines: ["63 S Main St", "New City, NY 10956"],
                },
                {
                  icon: "fa-solid fa-phone",
                  label: "Phone",
                  lines: ["(845) 232-0084"],
                  href: "tel:+18452320084",
                },
                {
                  icon: "fa-solid fa-envelope",
                  label: "Email",
                  lines: ["info@waymorefitness.com"],
                  href: "mailto:info@waymorefitness.com",
                },
                {
                  icon: "fa-regular fa-clock",
                  label: "Hours",
                  lines: [
                    "Mon – Fri · 6:00 AM – 8:00 PM",
                    "Sat – Sun · 7:00 AM – 2:00 PM",
                  ],
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "var(--orange-dim)",
                      border: "1px solid rgba(248,92,27,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{ color: "var(--orange)", fontSize: 14 }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: 5,
                      }}
                    >
                      {item.label}
                    </div>
                    {item.lines.map((line) =>
                      item.href ? (
                        <a
                          key={line}
                          href={item.href}
                          style={{
                            display: "block",
                            fontSize: 14,
                            color: "var(--text)",
                            textDecoration: "none",
                            lineHeight: 1.6,
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--white)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--text)")
                          }
                        >
                          {line}
                        </a>
                      ) : (
                        <span
                          key={line}
                          style={{
                            display: "block",
                            fontSize: 14,
                            color: "var(--text)",
                            lineHeight: 1.6,
                          }}
                        >
                          {line}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social buttons */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 16,
                }}
              >
                Follow Us
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { icon: "fa-brands fa-instagram", label: "@waymorefitness", href: "https://instagram.com/waymorefitness" },
                  { icon: "fa-brands fa-facebook-f", label: "Facebook", href: "#" },
                  { icon: "fa-brands fa-tiktok", label: "TikTok", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      color: "var(--text)",
                      fontSize: 15,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--orange-dim)";
                      e.currentTarget.style.borderColor = "rgba(248,92,27,0.3)";
                      e.currentTarget.style.color = "var(--orange)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--card)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text)";
                    }}
                  >
                    <i className={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "40px",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "var(--orange-dim)",
                      border: "2px solid var(--orange)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                    }}
                  >
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "var(--orange)", fontSize: 24 }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 32,
                      color: "var(--white)",
                      letterSpacing: "0.02em",
                      marginBottom: 12,
                    }}
                  >
                    MESSAGE SENT!
                  </h3>
                  <p style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>
                    Thanks for reaching out! We&apos;ll get back to you within 24 hours.
                    We can&apos;t wait to help you get started.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 28,
                      color: "var(--white)",
                      letterSpacing: "0.02em",
                      marginBottom: 28,
                    }}
                  >
                    SEND A MESSAGE
                  </h3>

                  {/* Name row */}
                  <div className="form-row">
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 8,
                        }}
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        style={inputStyle("firstName")}
                        onFocus={(e) => {
                          if (!errors.firstName)
                            e.target.style.borderColor = "rgba(248,92,27,0.5)";
                        }}
                        onBlur={(e) => {
                          if (!errors.firstName)
                            e.target.style.borderColor = "var(--border)";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 8,
                        }}
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        style={inputStyle("lastName")}
                        onFocus={(e) => {
                          if (!errors.lastName)
                            e.target.style.borderColor = "rgba(248,92,27,0.5)";
                        }}
                        onBlur={(e) => {
                          if (!errors.lastName)
                            e.target.style.borderColor = "var(--border)";
                        }}
                      />
                    </div>
                  </div>

                  {/* Email / Phone row */}
                  <div className="form-row">
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 8,
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        style={inputStyle("email")}
                        onFocus={(e) => {
                          if (!errors.email)
                            e.target.style.borderColor = "rgba(248,92,27,0.5)";
                        }}
                        onBlur={(e) => {
                          if (!errors.email)
                            e.target.style.borderColor = "var(--border)";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 8,
                        }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(845) 555-0000"
                        style={inputStyle("phone")}
                        onFocus={(e) => {
                          e.target.style.borderColor = "rgba(248,92,27,0.5)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border)";
                        }}
                      />
                    </div>
                  </div>

                  {/* Interest dropdown */}
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: 8,
                      }}
                    >
                      I&apos;m Interested In *
                    </label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      style={{
                        ...inputStyle("interest"),
                        cursor: "pointer",
                        appearance: "none",
                        WebkitAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a5a5a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        paddingRight: 40,
                      }}
                      onFocus={(e) => {
                        if (!errors.interest)
                          e.target.style.borderColor = "rgba(248,92,27,0.5)";
                      }}
                      onBlur={(e) => {
                        if (!errors.interest)
                          e.target.style.borderColor = "var(--border)";
                      }}
                    >
                      <option value="" disabled>
                        Select an option...
                      </option>
                      {interests.map((opt) => (
                        <option key={opt} value={opt} style={{ background: "#161616" }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: 8,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your goals or ask us anything..."
                      rows={4}
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        minHeight: 100,
                        fontFamily: "var(--font-body)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(248,92,27,0.5)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? "wait" : "pointer",
                    }}
                  >
                    {submitting ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <i className="fa-solid fa-arrow-right" />
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 16,
                    }}
                  >
                    We typically respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
