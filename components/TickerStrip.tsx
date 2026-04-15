const tickerItems = [
  "Personal Training",
  "Group Classes",
  "Zumba",
  "Mat Pilates",
  "Total Body Conditioning",
  "1-on-1 Coaching",
  "Goal Assessment",
  "Founder's Rates Available",
  "Believe. Achieve.",
];

const separator = (
  <span
    style={{
      display: "inline-block",
      width: 6,
      height: 6,
      background: "rgba(0,0,0,0.4)",
      borderRadius: "50%",
      margin: "0 20px",
      verticalAlign: "middle",
      flexShrink: 0,
    }}
  />
);

export default function TickerStrip() {
  const items = [...tickerItems, ...tickerItems]; // duplicate for seamless loop

  return (
    <div
      style={{
        background: "var(--grad)",
        overflow: "hidden",
        padding: "14px 0",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-display)",
              fontSize: 17,
              letterSpacing: "0.06em",
              color: "#000",
              whiteSpace: "nowrap",
              paddingRight: 0,
            }}
          >
            {item}
            {separator}
          </span>
        ))}
      </div>
    </div>
  );
}
