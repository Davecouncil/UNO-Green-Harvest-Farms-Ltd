import { FiArrowRight } from "react-icons/fi";

function Hero() {
  return (
    <section
      className="relative font-geist h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-5">
        <div className="max-w-xl">

          {/* Badge */}
          <span className="inline-block fade-up delay-300 bg-[#0d860d] text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            FARM FRESH SINCE 1972
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-dm leading-tight text-white fade-up delay-300">
            From Our Fields
            <br />
            <span className="text-[#0d860d]">
              To Your Table
            </span>
          </h1>

          {/* Paragraph */}
          <p className="mt-4 text-sm leading-6 text-gray-200 fade-up delay-500">
            Experience the difference of farm-fresh organic produce,
            harvested at peak ripeness and delivered straight to your door.
            No middlemen, just pure goodness.
          </p>

          {/* Buttons */}
          <div className="mt-6 fade-up delay-700 flex gap-4">

            <button className="flex items-center gap-2 bg-[#0d860d] hover:bg-[#c79f2d] px-6 py-2.5 text-sm rounded-full text-white font-semibold transition">
              Shop Now
              <FiArrowRight />
            </button>

            <button className="border border-white text-white hover:bg-white hover:text-black px-6 py-2.5 text-sm rounded-full font-semibold transition">
              Learn More
            </button>

          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white fade-up delay-700">
          <span className="text-xs tracking-[0.3em] uppercase mb-3">
            Scroll
          </span>
          <div className="w-5 h-9 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;