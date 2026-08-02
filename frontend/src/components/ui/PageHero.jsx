export default function PageHero({ badge, title, description, bgImage }) {
  return (
    <section
      className="relative h-[500px] flex items-end bg-cover bg-center"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
        {badge && (
          <span className="inline-block bg-[#dcb458] text-black text-xs font-bold tracking-wide uppercase px-4 py-1.5 rounded-full mb-4">
            {badge}
          </span>
        )}

        <h1 className="font-dm text-white text-4xl sm:text-5xl lg:text-6xl mb-4">
          {title}
        </h1>

        {description && (
          <p className="text-white/90 text-base sm:text-lg max-w-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}