function FeatureGrid({
  badge,
  title,
  items,
  sectionBg = "bg-[#F4F8F1]",
  cardBg = "bg-white",
  iconBg = "bg-green-100",
  iconColor = "text-[#4D7C0F]",
  align = "left", // "left" or "center"
  columns = "md:grid-cols-3",
}) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  const itemsAlign = align === "center" ? "items-center" : "items-start";

  return (
    <section className={`${sectionBg} py-20`}>
      <div className="max-w-7xl mx-auto px-6">

        <div className={`mb-14 ${align === "center" ? "text-center" : ""}`}>
          <p className="uppercase tracking-widest text-sm text-[#D69B06] font-semibold mb-3">
            {badge}
          </p>

          <h2 className="font-dm text-4xl">
            {title}
          </h2>
        </div>

        <div className={`grid ${columns} gap-6`}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`${cardBg} rounded-2xl p-6 border border-gray-100 flex flex-col ${itemsAlign} ${textAlign}`}
              >
                <div className={`w-11 h-11 rounded-full ${iconBg} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={iconColor} />
                </div>

                <h3 className="font-dm text-lg mb-3">{item.title}</h3>

                <p className="text-gray-600 text-sm leading-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FeatureGrid;