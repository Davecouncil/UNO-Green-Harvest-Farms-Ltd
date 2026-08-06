import { FiArrowRight, FiSun } from "react-icons/fi";
import { GiDrippingHoney, GiPlantRoots } from "react-icons/gi";
import { Link } from "react-router-dom";
import StatCard from "../../components/ui/StatsCard"; 

function SmartFarming() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div
        className="relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[420px]"
        style={{
          backgroundImage: "url('/images/cart-bg.png')"
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#173d20]/90 via-[#2c4d22]/60 to-[#d4b248]/25" />

        <div className="relative z-10 h-full flex flex-col lg:flex-row justify-between p-6 md:p-10">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl text-white flex flex-col justify-center">

            {/* Badge */}
            <div className="inline-flex w-fit rounded-full border border-[#d4b248] bg-[#6d5915]/40 px-4 py-1.5 mb-4">
              <span className="uppercase tracking-wide text-xs font-semibold text-[#f5c44b]">
                Innovation At Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-dm text-3xl md:text-4xl leading-tight font-bold">
              Smart Farming
              <br />
              <span className="text-[#f4b942]">
                Sustainable Future
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 text-white/90 text-sm leading-6 max-w-xl">
              We combine cutting-edge technology with traditional farming
              wisdom. From drone-monitored crop health to AI-powered irrigation
              systems, every harvest is optimized for quality and sustainability.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mt-5">

              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                <GiPlantRoots className="text-[#f4b942]" />
                <span>Drone Monitoring</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                <GiDrippingHoney className="text-[#f4b942]" />
                <span>Smart Irrigation</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                <FiSun className="text-[#f4b942]" />
                <span>Solar Powered</span>
              </div>

            </div>

            {/* Button */}
            <Link
              to="/smart-farming"
              className="mt-6 w-fit flex items-center gap-2 bg-[#d4a017] hover:bg-[#be9015] transition px-6 py-2.5 text-sm rounded-full font-semibold text-white"
            >
              Discover Our Technology
              <FiArrowRight />
            </Link>

          </div>

          {/* RIGHT STATS */}
          <div className="mt-8 lg:mt-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3">
              <StatCard value="98%" label="Water Efficiency" />
              <StatCard value="45%" label="Higher Yield" />
              <StatCard value="24/7" label="Crop Monitoring" />
              <StatCard value="0" label="Chemical Runoff" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SmartFarming;