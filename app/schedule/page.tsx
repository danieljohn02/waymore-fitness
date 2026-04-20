"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/* ── Schedule Data ──────────────────────────────────────── */

const weeklySchedule: Record<string, { name: string; time: string; instructor: string }[]> = {
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

const classInfo = [
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
  },
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80",
    type: "Mind & Body",
    name: "Mat Pilates",
    instructor: "Jessica Lee",
    instructorNote: "STOTT-certified Pilates instructor, 10+ years experience",
    description:
      "Build deep core strength, improve posture, and increase flexibility on the mat. This low-impact, high-reward class uses bodyweight and small movements to activate muscles most workouts miss.",
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
  },
  {
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    type: "Strength & Cardio",
    name: "Total Body Conditioning",
    instructor: "Chris Morales",
    instructorNote: "NASM-certified personal trainer, 12 years coaching",
    description:
      "A full-body workout combining functional strength training, cardio intervals, and mobility work. Each session is different — expect dumbbells, resistance bands, bodyweight circuits, and battle ropes.",
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
  },
];

const classColors: Record<string, string> = {
  Zumba: "rgba(248,92,27,0.1)",
  "Mat Pilates": "rgba(75,144,226,0.1)",
  "Total Body Conditioning": "rgba(34,197,94,0.1)",
  "Open Gym": "rgba(161,161,170,0.08)",
};

const classBorderColors: Record<string, string> = {
  Zumba: "rgba(248,92,27,0.2)",
  "Mat Pilates": "rgba(75,144,226,0.2)",
  "Total Body Conditioning": "rgba(34,197,94,0.2)",
  "Open Gym": "rgba(161,161,170,0.15)",
};

const classTextColors: Record<string, string> = {
  Zumba: "#f85c1b",
  "Mat Pilates": "#4b90e2",
  "Total Body Conditioning": "#16a34a",
  "Open Gym": "#71717a",
};

/* ── Helpers ────────────────────────────────────────────── */

function getMonthCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(startDow).fill(null);

  for (let d = 1; d <= totalDays; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function SchedulePage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [view, setView] = useState<"calendar" | "weekly">("calendar");

  const weeks = getMonthCalendar(year, month);
  const todayDate = today.getDate();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  const getClassesForDay = (dayNum: number) => {
    const date = new Date(year, month, dayNum);
    const dayName = dayFull[date.getDay()];
    return weeklySchedule[dayName] || [];
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
    setSelectedDay(null);
  };

  const selectedClasses = selectedDay ? getClassesForDay(selectedDay) : [];
  const selectedDayName = selectedDay
    ? dayFull[new Date(year, month, selectedDay).getDay()]
    : "";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
              Pick a date to see what&apos;s happening.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar + Day Detail */}
      <section style={{ background: "var(--black)", padding: "80px 0" }}>
        <div className="container">
          {/* View Toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div className="section-label" style={{ marginBottom: 0 }}>
              {monthNames[month]} {year}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setView("calendar")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 6,
                  border: view === "calendar" ? "none" : "1px solid var(--border)",
                  background: view === "calendar" ? "var(--grad)" : "transparent",
                  color: view === "calendar" ? "#000" : "var(--text)",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Calendar
              </button>
              <button
                onClick={() => setView("weekly")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 6,
                  border: view === "weekly" ? "none" : "1px solid var(--border)",
                  background: view === "weekly" ? "var(--grad)" : "transparent",
                  color: view === "weekly" ? "#000" : "var(--text)",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Weekly
              </button>
            </div>
          </div>

          {view === "calendar" ? (
            <div className="schedule-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>
              {/* Calendar Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                {/* Month Nav */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 28px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <button
                    onClick={prevMonth}
                    style={{
                      background: "none",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text)",
                      fontSize: 14,
                    }}
                  >
                    <i className="fa-solid fa-chevron-left" />
                  </button>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 28,
                      color: "var(--white)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {monthNames[month].toUpperCase()} {year}
                  </h3>
                  <button
                    onClick={nextMonth}
                    style={{
                      background: "none",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text)",
                      fontSize: 14,
                    }}
                  >
                    <i className="fa-solid fa-chevron-right" />
                  </button>
                </div>

                {/* Day Headers */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {dayNames.map((d) => (
                    <div
                      key={d}
                      style={{
                        textAlign: "center",
                        padding: "12px 0",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div style={{ padding: "8px" }}>
                  {weeks.map((week, wi) => (
                    <div
                      key={wi}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: 4,
                      }}
                    >
                      {week.map((day, di) => {
                        if (day === null) {
                          return <div key={`e-${di}`} style={{ aspectRatio: "1", padding: 4 }} />;
                        }

                        const isToday = isCurrentMonth && day === todayDate;
                        const isSelected = day === selectedDay;
                        const classes = getClassesForDay(day);
                        const hasClasses = classes.length > 0 && classes[0].name !== "Open Gym";

                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            style={{
                              aspectRatio: "1",
                              borderRadius: 8,
                              border: isSelected
                                ? "2px solid var(--orange)"
                                : isToday
                                  ? "1px solid rgba(248,92,27,0.3)"
                                  : "1px solid transparent",
                              background: isSelected
                                ? "var(--orange-dim)"
                                : isToday
                                  ? "rgba(248,92,27,0.04)"
                                  : "transparent",
                              cursor: "pointer",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 3,
                              fontFamily: "var(--font-body)",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: isToday || isSelected ? 700 : 400,
                                color: isSelected ? "var(--orange)" : isToday ? "var(--orange)" : "var(--white)",
                              }}
                            >
                              {day}
                            </span>
                            {hasClasses && (
                              <div style={{ display: "flex", gap: 2 }}>
                                {classes.slice(0, 3).map((c, ci) => (
                                  <div
                                    key={ci}
                                    style={{
                                      width: 5,
                                      height: 5,
                                      borderRadius: "50%",
                                      background: classTextColors[c.name] || "var(--muted)",
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  {Object.entries(classTextColors).filter(([n]) => n !== "Open Gym").map(([name, color]) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Day Detail Sidebar */}
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "28px",
                  position: "sticky",
                  top: 96,
                }}
              >
                {selectedDay ? (
                  <>
                    <div style={{ marginBottom: 20 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--orange)",
                          marginBottom: 6,
                        }}
                      >
                        {selectedDayName}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 32,
                          color: "var(--white)",
                          letterSpacing: "0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {monthNames[month].toUpperCase()} {selectedDay}
                      </h3>
                    </div>

                    {selectedClasses.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {selectedClasses.map((cls, i) => (
                          <div
                            key={`${cls.name}-${cls.time}`}
                            style={{
                              background: classColors[cls.name] || "var(--orange-dim)",
                              border: `1px solid ${classBorderColors[cls.name] || "rgba(248,92,27,0.15)"}`,
                              borderRadius: 10,
                              padding: "16px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: classTextColors[cls.name] || "var(--orange)",
                                marginBottom: 4,
                              }}
                            >
                              {cls.time}
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: 20,
                                color: "var(--white)",
                                letterSpacing: "0.02em",
                                marginBottom: 4,
                              }}
                            >
                              {cls.name}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>
                              <i className="fa-solid fa-user" style={{ marginRight: 6, fontSize: 10 }} />
                              {cls.instructor}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "32px 16px",
                          color: "var(--muted)",
                          fontSize: 13,
                        }}
                      >
                        <i className="fa-regular fa-calendar-xmark" style={{ fontSize: 28, marginBottom: 12, display: "block", opacity: 0.4 }} />
                        No scheduled classes this day.
                      </div>
                    )}

                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                      <a href="tel:+18452320084" className="btn btn-primary" style={{ width: "100%", textAlign: "center", fontSize: 12 }}>
                        <i className="fa-solid fa-phone" /> Reserve a Spot
                      </a>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 16px",
                      color: "var(--muted)",
                      fontSize: 13,
                    }}
                  >
                    <i className="fa-regular fa-hand-pointer" style={{ fontSize: 28, marginBottom: 12, display: "block", opacity: 0.4 }} />
                    Select a date to see classes.
                  </div>
                )}
              </motion.div>
            </div>
          ) : (
            /* ── Weekly View ──────────────────────────────── */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Legend */}
              <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)", display: "flex", gap: 16, flexWrap: "wrap" }}>
                {Object.entries(classTextColors).map(([name, color]) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: color, opacity: 0.7 }} />
                    <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>{name}</span>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="schedule-table-wrap" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                  <tbody>
                    {Object.entries(weeklySchedule).map(([day, items], i, arr) => (
                      <tr
                        key={day}
                        style={{
                          borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                          background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
                        }}
                      >
                        <td
                          style={{
                            padding: "18px 28px",
                            width: 130,
                            fontFamily: "var(--font-display)",
                            fontSize: 18,
                            color: "var(--white)",
                            letterSpacing: "0.04em",
                            whiteSpace: "nowrap",
                            borderRight: "1px solid var(--border)",
                          }}
                        >
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
                                  border: `1px solid ${classBorderColors[item.name] || "rgba(248,92,27,0.15)"}`,
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
            </motion.div>
          )}
        </div>
      </section>

      {/* Class Details */}
      <section style={{ background: "var(--surface)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">Our Classes</div>
            <h2 className="section-title">
              WHAT WE <span className="text-gradient">OFFER</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {classInfo.map((cls, i) => (
              <motion.div
                key={cls.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-60px" }}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img
                    src={cls.image}
                    alt={cls.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(255,255,255,1), transparent)" }} />
                </div>

                <div style={{ padding: "24px 28px" }}>
                  <span style={{ display: "inline-block", background: "var(--orange-dim)", color: "var(--orange)", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 4, marginBottom: 12, border: "1px solid rgba(248,92,27,0.15)" }}>
                    {cls.type}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--white)", letterSpacing: "0.02em", marginBottom: 6, lineHeight: 1 }}>
                    {cls.name}
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>
                    <i className="fa-solid fa-user" style={{ marginRight: 6 }} />{cls.instructor} — {cls.instructorNote}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7, marginBottom: 20 }}>
                    {cls.description}
                  </p>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {[
                      { icon: "fa-regular fa-clock", text: cls.duration },
                      { icon: "fa-solid fa-users", text: cls.capacity },
                      { icon: "fa-solid fa-chart-simple", text: cls.level },
                    ].map((meta) => (
                      <div key={meta.text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text)", background: "var(--orange-dim)", border: "1px solid rgba(248,92,27,0.1)", padding: "5px 10px", borderRadius: 6 }}>
                        <i className={meta.icon} style={{ color: "var(--orange)", fontSize: 10 }} />
                        {meta.text}
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
                    What to expect
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                    {cls.whatToExpect.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--text)", lineHeight: 1.4 }}>
                        <i className="fa-solid fa-check" style={{ color: "var(--orange)", fontSize: 10, marginTop: 2, flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div style={{ fontSize: 13, color: "var(--white)", fontWeight: 500 }}>
                    <i className="fa-regular fa-calendar" style={{ color: "var(--orange)", marginRight: 8 }} />
                    {cls.schedule}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--black)", padding: "72px 0", textAlign: "center" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "var(--white)",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              marginBottom: 16,
            }}
          >
            READY TO <span className="text-gradient">START?</span>
          </h2>
          <p style={{ color: "var(--text)", fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
            Check out our class plans or give us a call to reserve your first class.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pricing" className="btn btn-primary">
              View Class Plans
            </Link>
            <a href="tel:+18452320084" className="btn btn-outline">
              <i className="fa-solid fa-phone" /> Call (845) 232-0084
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .schedule-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .schedule-table-wrap {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
