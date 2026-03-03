export function MissionBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(99,102,241,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 mission-grid opacity-40" />
      <div className="absolute inset-0 mission-noise" />
    </div>
  );
}
