import { Sprout, Droplet, Sun } from "lucide-react";
import StatCard from "../components/ui/StatsCard";
import { FiCheck } from "react-icons/fi";



function SmartFarming() {
  const features = [
    {
      image: "/images/img-2.jpeg",
      icon: Sprout,
      title: "Drone Crop Monitoring",
      description:
        "Our fleet of agricultural drones equipped with multispectral cameras surveys every acre daily, capturing high-resolution imagery that reveals plant health, soil moisture levels, and early signs of pest pressure — weeks before the human eye can detect issues.",
      stats: [
        { value: "5+", label: "Acres monitored daily" },
        { value: "92%", label: "Early pest detection rate" },
      ],
    },
    {
      image: "/images/img-1.jpeg",
      icon: Droplet,
      title: "Smart Irrigation Systems",
      description:
        "Our AI-driven irrigation network uses real-time soil moisture sensors and weather forecasting to deliver exactly the right amount of water to each crop zone. This precision approach has reduced our water consumption by 98% compared to conventional flood irrigation.",
      stats: [
        { value: "98%", label: "Water efficiency" },
        { value: "10,000", label: "Gallons saved annually" },
      ],
    },
    {
      image: "/images/solar.jpeg",
      icon: Sun,
      title: "Solar-Powered Operations",
      description:
        "Our farm facilities run on 100% renewable energy through an array of solar panels installed across our properties. From powering irrigation pumps to running our cold storage units, the sun fuels every aspect of our operation — reducing our carbon footprint to near zero.",
      stats: [
        { value: "100%", label: "Renewable energy" },
        { value: "340", label: "Solar panels installed" },
      ],
    },
  ];

  const impactStats = [
    { value: "47%", label: "Increase in Crop Yield" },
    { value: "98%", label: "Water Efficiency" },
    { value: "62%", label: "Reduction in Waste" },
    { value: "0", label: "Chemical Pesticides" },
  ];

  return (
    <div>

      {/* Hero */}
      <section
        className="relative h-[500px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/images/smart-farm.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl text-white">

            <span className="inline-block bg-[#D69B06] text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-5">
              Innovation Meets Agriculture
            </span>

            <h1 className="font-dm text-5xl md:text-6xl font-bold leading-tight mb-4">
              Smart Farming
            </h1>

            <p className="text-white/90 text-base leading-7 max-w-md">
              Harnessing cutting-edge technology to grow better food while
              protecting our planet for future generations.
            </p>

          </div>
        </div>
      </section>

      {/* Why Smart Farming */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <p className="uppercase tracking-widest text-sm text-[#4D7C0F] font-semibold mb-3">
          Why Smart Farming
        </p>

        <h2 className="font-dm text-4xl mb-6">
          Technology That Works With Nature
        </h2>

        <p className="text-gray-600 text-base leading-7">
          At UNO Green Harvest Farms Ltd., we believe the future of
          agriculture lies at the intersection of traditional wisdom and
          modern innovation. Our smart farming systems reduce water
          consumption, eliminate chemical waste, and increase yield —
          all while staying true to the values that have guided our farm
          for generations.
        </p>

      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title}>

                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-60 object-cover rounded-2xl mb-5"
                />

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#4D7C0F]" />
                </div>

                <h3 className="font-dm text-xl mb-3">{feature.title}</h3>

                <p className="text-gray-600 text-sm leading-6 mb-5">
                  {feature.description}
                </p>

                <div className="border-t border-gray-200 pt-4 flex gap-8">
                  {feature.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[#D69B06] text-2xl font-bold">
                        {stat.value}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* Impact Banner */}
      <section className="bg-[#0d2b0a] py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="font-dm text-4xl text-white mb-3">
            The Impact of Smart Farming
          </h2>

          <p className="text-gray-300 text-sm mb-10">
            Real numbers from our transition to technology-driven sustainable agriculture
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {impactStats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                variant="solid"
              />
            ))}
          </div>

        </div>
      </section>

      {/* What's Next */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <p className="uppercase tracking-widest text-xs text-[#D69B06] font-semibold mb-3">
            What's Next
          </p>

          <h2 className="font-dm text-4xl leading-tight mb-5">
            The Future of Farming
            <br />
            Is Already Here
          </h2>

          <p className="text-gray-600 text-base leading-7 mb-6">
            We're constantly exploring new technologies to make our farming
            practices even more sustainable and efficient. Our current
            research and development initiatives include:
          </p>

          <ul className="flex flex-col gap-3">
            {[
              "AI-powered crop rotation planning to maximize soil health",
              "Autonomous electric tractors for zero-emission field operations",
              "Blockchain-based supply chain tracking for complete transparency",
              "Vertical farming pilots for year-round leafy green production",
              "Carbon sequestration measurement and verification systems",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                  <FiCheck size={12} className="text-[#2D7A0F]" />
                </span>
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>

        </div>

        <img
          src="/images/future-farming.png"
          alt="Autonomous tractor in a field with wind turbines"
          className="w-full h-96 object-cover rounded-2xl"
        />

      </section>

    </div>
  );
}

export default SmartFarming;