function StatCard({ value, label, variant = "glass" }) {
  const styles = {
    glass:
      "w-32 h-20 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md",
    solid:
      "rounded-xl border border-white/10 bg-white/5 py-10",
  };

  return (
    <div
      className={`${styles[variant]} flex flex-col items-center justify-center text-center`}
    >
      <h3 className="text-[#f4b942] text-2xl font-bold">{value}</h3>
      <p className="text-white/90 mt-1 text-xs">{label}</p>
    </div>
  );
}

export default StatCard;