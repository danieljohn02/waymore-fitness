"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const classes = [
  {
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=900&q=80",
    type: "Dance Fitness",
    name: "Zumba",
    instructor: "Maria Santos",
    instructorNote: "Certified Zumba instructor with 8 years teaching experience",
    description:
      "High-energy Latin dance fitness that burns serious calories while you have a blast. Every class is a party — you'll move through merengue, salsa, cumbia, and reggaeton rhythms without even realizing you're working out.",
    duration: "45 min",
    capacity: "Up to 20",
    level: "All Levels",
    schedule: "Mon, Wed, Fri · 9:00 AM",
    whatToExpect: [
      "Non-stop music and movement",
      "Easy-to-follow choreography",
      "High calorie burn (400–600 cal/session)",
      "Zero dance experience required",
    ],
    whatToBring: "Sneakers with lateral support, water bottle, small towel",
    slug: "zumba",
  },
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80",
    type: "Mind & Body",
    name: "Mat Pilates",
    instructor: "Jessica Lee",
    instructorNote: "STOTT-certified Pilates instructor, 10+ years experience",
    description:
      "Build deep core strength, improve posture, and increase flexibility on the mat. This low-impact, high-reward class uses bodyweight and small movements to activate muscles most workouts miss. Perfect for every fitness level.",
    duration: "60 min",
    capacity: "Up to 15",
    level: "All Levels",
    schedule: "Tue, Thu · 10:00 AM & 6:00 PM",
    whatToExpect: [
      "Core-focused bodyweight exercises",
      "Breathing and body awareness cues",
      "Progressive difficulty within each class",
      "Improved posture and flexibility over time",
    ],
    whatToBring: "Yoga mat (mats available), water, grip socks recommended",
    slug: "mat-pilates",
  },
  {
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    type: "Strength & Cardio",
    name: "Total Body Conditioning",
    instructor: "Chris Morales",
    instructorNote: "NASM-certified personal trainer, 12 years coaching",
    description:
      "A full-body workout combining functional strength training, cardio intervals, and mobility work. Each session is different — expect dumbbells, resistance bands, bodyweight circuits, and battle ropes. Push your limits and build real endurance.",
    duration: "55 min",
    capacity: "Up to 18",
    level: "Beginner–Intermediate",
    schedule: "Mon, Wed, Sat · 7:00 AM & 5:30 PM",
    whatToExpect: [
      "Full-body strength and cardio combination",
      "Rotating equipment and exercises each session",
      "Modifications for beginners at every station",
      "High energy, team-driven atmosphere",
    ],
    whatToBring: "Athletic shoes with good support, water bottle, towel",
    slug: "total-body-conditioning",
  },
];

const scheduleData: Record<string, { name: string; time: string; instructor: string }[]> = {
  Monday: [
    { name: "Total Body Conditioning", time: "7:00 AM", instructor: "Chris Morales" },
    { name: "Zumba", time: "9:00 AM", instructor: "Maria Santos" },
    { name: "Total Body Conditioning", time: "5:30 PM", instructor: "Chris Morales" },
  ],
  Tuesday: [
    { name: "Mat Pilates", time: "10:00 AM", instructor: "Jessica Lee" },
    { name: "Mat Pilates", time: "6:00 PM", instructor: "Jessica Lee" },
  ],
  Wednesday: [
    { name: "Total Body Conditioning", time: "7:00 AM", instructor: "Chris Morales" },
    { name: "Zumba", time: "9:00 AM", instructor: "Maria Santos" },
    { name: "Total Body Conditioning", time: "5:30 PM", instructor: "Chris Morales" },
  ],
  Thursday: [
    { name: "Mat Pilates", time: "10:00 AM", instructor: "Jessica Lee" },
    { name: "Mat Pilates", time: "6:00 PM", instructor: "Jessica Lee" },
  ],
  Friday: [
    { name: "Zumba", time: "9:00 AM", instructor: "Maria Santos" },
  ],
  Saturday: [
    { name: "Total Body Conditioning", time: "7:00 AM", instructor: "Chris Morales" },
    { name: "Total Body Conditioning", time: "5:30 PM", instructor: "Chris Morales" },
  ],
  Sunday: [
    { name: "Open Gym", time: "7:00 AM – 2:00 PM", instructor: "Self-guided" },
  ],
};

const classColors: Record<string, string> = {
  "Zumba": "rgba(248,92,27,0.1)",
  "Mat Pilates": "rgba(75,144,226,0.1)",
  "Total Body Conditioning": "rgba(34,197,94,0.1)",
  "Open Gym": "rgba(161,161,170,0.1)",
};

const classTextColors: Record<string, string> = {
  "Zumba": "#f85c1b",
  "Mat Pilates": "#4b90e2",
  "Total Body Conditioning": "#16a34a",
  "Open Gym": "#71717a",
};

export default function SchedulePage() {
  const [activeClass, setActiveClass] = useState<string | null>(null);

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
            top: -60,
            left: -60,
            width: 360,
            height: 360,
            background: "radial-gradient(circle, rgba(248,92,27,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <div className="section-label">Group Classes</div>
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
            CLASS<br />
            <span className="text-gradient">SCHEDULE</span>
          </h1>
          <p style={{ color: "var(--text)", fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
            Every class is led by an experienced instructor who actually gives a damn.
            Show up, push hard, and walk out feeling different.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a href="tel:+18452320084" className="btn btn-primary" style={{ fontSize: 13 }}>
              <i className="fa-solid fa-phone" /> Book a Class
            </a>
            <Link href="/pricing" className="btn btn-outline" style={{ fontSize: 13 }}>
              View Memberships
            </Link>
          </div>
        </div>
      </section>

      {/* Class Detail Cards */}
      <section style={{ background: "var(--black)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">The Classes</div>
            <h2 className="section-title">
              WHAT WE <span className="text-gradient">OFFER</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {classes.map((cls, i) => (
              <motion.div
                key={cls.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-60px" }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "280px 1fr",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={cls.image}
                    alt={cls.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: 280 }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.6) 100%)" }} />
                </div>

                {/* Content */}
                <div style={{ padding: "36px 40px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <span style={{ display: "inline-block", background: "var(--orange-dim)", color: "var(--orange)", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 4, marginBottom: 10, border: "1px solid rgba(248,92,27,0.15)" }}>
                        {cls.type}
                      </span>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "var(--white)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 4 }}>
                        {cls.name}
                      </h3>
                      <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>
                        <i className="fa-solid fa-user" style={{ marginRight: 6 }} />{cls.instructor} — {cls.instructorNote}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[
                        { icon: "fa-regular fa-clock", text: cls.duration },
                        { icon: "fa-solid fa-users", text: cls.capacity },
                        { icon: "fa-solid fa-chart-simple", text: cls.level },
                      ].map((meta) => (
                        <div key={meta.text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text)", background: "var(--orange-dim)", border: "1px solid rgba(248,92,27,0.1)", padding: "5px 10px", borderRadius: 6 }}>
                          <i className={meta.icon} style={{ color: "var(--orange)", fontSize: 11 }} />
                          {meta.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.75, marginBottom: 24 }}>
                    {cls.description}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                        What to expect
                      </div>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                        {cls.whatToExpect.map((item) => (
                          <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--text)", lineHeight: 1.4 }}>
                            <i className="fa-solid fa-check" style={{ color: "var(--orange)", fontSize: 10, marginTop: 2, flexShrink: 0 }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                        Schedule
                      </div>
                      <p style={{ fontSize: 13, color: "var(--white)", fontWeight: 500, marginBottom: 10 }}>{cls.schedule}</p>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>
                        What to bring
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.5 }}>{cls.whatToBring}</p>
                    </div>
                  </div>

                  <a href="tel:+18452320084" className="btn btn-primary" style={{ fontSize: 12, padding: "10px 20px" }}>
                    <i className="fa-solid fa-calendar-plus" /> Reserve Your Spot
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Calendar */}
      <section style={{ background: "var(--surface)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="section-label">Weekly Schedule</div>
            <h2 className="section-title">
              FULL <span className="text-gradient">CALENDAR</span>
            </h2>
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            {/* Legend */}
            <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)", display: "flex", gap: 16, flexWrap: "wrap" }}>
              {Object.entries(classTextColors).map(([name, color]) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: color, opacity: 0.7 }} />
                  <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>{name}</span>
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <tbody>
                  {Object.entries(scheduleData).map(([day, items], i, arr) => (
                    <tr
                      key={day}
                      style={{
                        borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                        background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
                      }}
                    >
                      <td style={{ padding: "18px 28px", width: 120, fontFamily: "var(--font-display)", fontSize: 18, color: "var(--white)", letterSpacing: "0.04em", whiteSpace: "nowrap", borderRight: "1px solid var(--border)" }}>
                        {day}
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {items.map((item) => (
                            <div
                              key={`${item.name}-${item.time}`}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: classColors[item.name] || "var(--orange-dim)",
                                border: `1px solid ${classTextColors[item.name] || "var(--orange)"}22`,
                                borderRadius: 6,
                                padding: "7px 12px",
                              }}
                            >
                              <span style={{ fontSize: 12, fontWeight: 600, color: classTextColors[item.name] || "var(--orange)" }}>
                                {item.time}
                              </span>
                              <span style={{ fontSize: 12, color: "var(--text)" }}>
                                {item.name}
                              </span>
                              <span style={{ fontSize: 11, color: "var(--muted)" }}>
                                · {item.instructor}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: "18px 28px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
              <i className="fa-solid fa-circle-info" style={{ color: "var(--orange)", fontSize: 14 }} />
              <span style={{ fontSize: 12, color: "var(--text)" }}>
                Schedule subject to change. Call us at{" "}
                <a href="tel:+18452320084" style={{ color: "var(--orange)", textDecoration: "none", fontWeight: 600 }}>(845) 232-0084</a>{" "}
                to confirm times or reserve your spot.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Training CTA */}
      <section style={{ background: "var(--black)", padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 32,
              alignItems: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "40px 48px",
            }}
          >
            <div>
              <div className="section-label">One-on-One</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)", color: "var(--white)", lineHeight: 0.95, letterSpacing: "0.02em", marginBottom: 14 }}>
                PERSONAL TRAINING
              </h2>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.75, maxWidth: 540 }}>
                Group classes not your thing? Our certified personal trainers build fully customized programs around your specific goals — whether that's fat loss, muscle building, injury rehab, or just building a sustainable habit.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 180 }}>
              <a href="tel:+18452320084" className="btn btn-primary">
                <i className="fa-solid fa-phone" /> Book a Call
              </a>
              <Link href="/pricing?plan=personal-training" className="btn btn-outline" style={{ textAlign: "center" }}>
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
