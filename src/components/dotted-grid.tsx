export function DottedGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 dotted-grid-bg"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(37,99,235,0.07) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  );
}
