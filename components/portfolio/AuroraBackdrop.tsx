export function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_65%)] blur-3xl" />
      <div className="absolute left-[-10%] top-[20%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_rgba(120,140,255,0.22),_transparent_70%)] blur-3xl" />
      <div className="absolute right-[-5%] top-[50%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(90,220,210,0.18),_transparent_70%)] blur-3xl" />
    </div>
  );
}
