"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const classes = [
  {
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
    type: "Dance Fitness",
    name: "Zumba",
    description:
      "High-energy Latin dance fitness that burns serious calories while you have a blast. No experience needed — just bring your energy.",
    duration: "45 min",
    capacity: "Up to 20",
    schedule: "Mon, Wed, Fri · 9:00 AM",
  },
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    type: "Mind & Body",
    name: "Mat Pilates",
    description:
      "Build deep core strength, improve posture, and increase flexibility. Low impact, high reward — perfect for all fitness levels.",
    duration: "60 min",
    capacity: "Up to 15",
    schedule: "Tue, Thu · 10:00 AM & 6:00 PM",
  },
  {
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    type: "Strength & Cardio",
    name: "Total Body Conditioning",
    description:
      "A full-body workout combining functional strength, cardio intervals, and mobility work. Push limits, build endurance.",
    duration: "55 min",
    capacity: "Up to 18",
    schedule: "Mon, Wed, Sat · 7:00 AM & 5:30 PM",
  },
];

const scheduleData = {
  March: [
    { day: "Monday", classes: ["Zumba — 9:00 AM", "Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Tuesday", classes: ["Mat Pilates — 10:00 AM & 6:00 PM"] },
    { day: "Wednesday", classes: ["Zumba — 9:00 AM", "Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Thursday", classes: ["Mat Pilates — 10:00 AM & 6:00 PM"] },
    { day: "Friday", classes: ["Zumba — 9:00 AM"] },
    { day: "Saturday", classes: ["Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Sunday", classes: ["Open Gym · 7 AM – 2 PM"] },
  ],
  April: [
    { day: "Monday", classes: ["Zumba — 9:00 AM", "Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Tuesday", classes: ["Mat Pilates — 10:00 AM & 6:00 PM"] },
    { day: "Wednesday", classes: ["Zumba — 9:00 AM", "Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Thursday", classes: ["Mat Pilates — 10:00 AM & 6:00 PM"] },
    { day: "Friday", classes: ["Zumba — 9:00 AM"] },
    { day: "Saturday", classes: ["Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Sunday", classes: ["Open Gym · 7 AM – 2 PM"] },
  ],
  May: [
    { day: "Monday", classes: ["Zumba — 9:00 AM", "Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Tuesday", classes: ["Mat Pilates — 10:00 AM & 6:00 PM"] },
    { day: "Wednesday", classes: ["Zumba — 9:00 AM", "Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Thursday", classes: ["Mat Pilates — 10:00 AM & 6:00 PM"] },
    { day: "Friday", classes: ["Zumba — 9:00 AM"] },
    { day: "Saturday", classes: ["Total Body Conditioning — 7:00 AM & 5:30 PM"] },
    { day: "Sunday", classes: ["Open Gym · 7 AM – 2 PM"] },
  ],
};

type Month = keyof typeof scheduleData;

export default function ClassesSection() {
  const [activeMonth, setActiveMonth] = useState<Month>("April");

  return (
    <section
      id="classes"
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
          style={{ marginBottom: 56 }}
        >
          <div className="section-label">Group Classes</div>
          <h2 className="section-title">
            CLASSES THAT <span className="text-gradient">DELIVER</span>
          </h2>
          <p
            style={{
              color: "var(--text)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 540,
            }}
          >
            Every class is led by an experienced instructor who actually gives a
            damn. Show up, push hard, and walk out feeling different.
          </p>
        </motion.div>

        {/* Class Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 20,
            marginBottom: 64,
          }}
        >
          {classes.map((cls, i) => (
            <Link key={cls.name} href="/schedule" style={{ textDecoration: "none", display: "contents" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-80px" }}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                overflow: "hidden",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
                cursor: "pointer",
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                <img
                  src={cls.image}
                  alt={cls.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                />
                {/* Image bottom gradient */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    background: "linear-gradient(to top, rgba(22,22,22,1), transparent)",
                  }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: "24px 24px 28px" }}>
                {/* Type badge */}
                <span
                  style={{
                    display: "inline-block",
                    background: "var(--orange-dim)",
                    color: "var(--orange)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: 4,
                    marginBottom: 12,
                    border: "1px solid rgba(248,92,27,0.15)",
                  }}
                >
                  {cls.type}
                </span>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 30,
                    color: "var(--white)",
                    letterSpacing: "0.02em",
                    marginBottom: 10,
                  }}
                >
                  {cls.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text)",
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  {cls.description}
                </p>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    <i
                      className="fa-regular fa-clock"
                      style={{ color: "var(--orange)", fontSize: 11 }}
                    />
                    {cls.duration}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    <i
                      className="fa-solid fa-users"
                      style={{ color: "var(--orange)", fontSize: 11 }}
                    />
                    {cls.capacity}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "var(--muted)",
                      marginLeft: "auto",
                    }}
                  >
                    {cls.schedule}
                  </span>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        {/* Schedule Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Schedule header */}
            <div
              style={{
                padding: "28px 32px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div className="section-label" style={{ marginBottom: 4 }}>
                  Weekly Schedule
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    color: "var(--white)",
                    letterSpacing: "0.02em",
                  }}
                >
                  CLASS CALENDAR
                </h3>
              </div>

              {/* View full schedule + month tabs */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Link
                  href="/schedule"
                  style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--orange)", textDecoration: "none", marginRight: 4 }}
                >
                  Full Schedule →
                </Link>
              <div style={{ display: "flex", gap: 8 }}>
                {(Object.keys(scheduleData) as Month[]).map((month) => (
                  <button
                    key={month}
                    onClick={() => setActiveMonth(month)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 6,
                      border: activeMonth === month ? "none" : "1px solid var(--border)",
                      background:
                        activeMonth === month ? "var(--grad)" : "transparent",
                      color: activeMonth === month ? "#000" : "var(--text)",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {month}
                  </button>
                ))}
              </div>
              </div>
            </div>

            {/* Schedule table */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 560,
                }}
              >
                <tbody>
                  {scheduleData[activeMonth].map((row, i) => (
                    <tr
                      key={row.day}
                      style={{
                        borderBottom:
                          i < scheduleData[activeMonth].length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                      }}
                    >
                      <td
                        style={{
                          padding: "18px 32px",
                          width: 140,
                          fontFamily: "var(--font-display)",
                          fontSize: 18,
                          color: "var(--white)",
                          letterSpacing: "0.04em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.day}
                      </td>
                      <td style={{ padding: "18px 32px 18px 0" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {row.classes.map((cls) => (
                            <span
                              key={cls}
                              style={{
                                display: "inline-block",
                                fontSize: 12,
                                color: "var(--text)",
                                background: "var(--orange-dim)",
                                border: "1px solid rgba(248,92,27,0.12)",
                                padding: "5px 12px",
                                borderRadius: 4,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {cls}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Personal training note */}
            <div
              style={{
                padding: "20px 32px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <i
                className="fa-solid fa-dumbbell"
                style={{ color: "var(--orange)", fontSize: 14 }}
              />
              <span style={{ fontSize: 13, color: "var(--text)" }}>
                <strong style={{ color: "var(--white)" }}>
                  1-on-1 Personal Training
                </strong>{" "}
                — Available by appointment. Contact us to schedule your first session.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
