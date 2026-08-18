import PageHero from "../components/ui/PageHero";

const galleryImages = [
  "/images/farm1.png",
  "/images/farm2.png",
  "/images/farm3.png",
  "/images/farm4.png",
];

export default function Farms() {
  return (
    <div className="min-h-screen">
      <PageHero
        badge="Our Land, Our Legacy"
        title="Our Farms"
        // description="Three generations of sustainable farming across 2,400 acres of fertile land. Discover the places where your food comes from."
        bgImage="/images/farm-spot (1).png"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#2D7A0F] text-xs font-bold tracking-wider uppercase mb-3">
            Our Farms
          </p>

          <h2 className="font-dm text-3xl sm:text-4xl text-gray-900 mb-6">
            {/* Harvesting the future */}
            Where innovation meets agriculture 
          </h2>

          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            {/* <p>
              In 1972, Eduardo and Maria Vasquez purchased 80 acres of farmland in
              California's fertile Green Valley with a simple dream: to grow food
              the way nature intended. What began as a small family operation has
              blossomed into a network of three farms spanning 2,400 acres across
              California and Oregon.
            </p>

            <p>
              Today, the third generation of the Vasquez-Ortega family carries
              forward that same commitment to organic, regenerative agriculture. We
              still hand-pick our produce, still rotate our crops seasonally, and
              still believe that the best farming works in partnership with nature
              — not against it.
            </p>

            <p>
              Every carrot, every egg, every jar of honey carries the legacy of a
              family that has devoted its life to the land. When you buy from UNO
              Green Harvest Farms Ltd., you are not just buying food — you are
              supporting a vision of agriculture that nourishes both people and
              planet.
            </p> */}

            <p>
              UNO Green Harvest Farms Ltd. is a proposed Nigerian agribusiness dedicated to transforming
agriculture through innovation, sustainability, and technology. The company aims to establish a large-
scale smart industrial farm that combines crop production, livestock farming, plantation agriculture,
greenhouse cultivation, and digital technologies to improve food security, create employment
opportunities, and contribute to Nigeria's economic development.
</p><p>
The farm will integrate Artificial Intelligence (AI), Internet of Things (IoT), drones, renewable energy,
precision agriculture, cybersecurity, and data-driven decision-making to maximize productivity while
minimizing environmental impact.
Initially, the company will focus on crop farming, poultry production, goat farming, greenhouse
cultivation, palm plantations, cocoa farming, fruit orchards, plantain cultivation, and the establishment
of economically valuable tree plantations such as Ogbono and Dabino.
In the long term, UNO Green Harvest Farms Ltd. aims to become one of Africa's leading smart
agricultural enterprises by producing high-quality food products, supporting agricultural research,
empowering local communities, and exporting premium agricultural products to international markets.
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <img
            src="/images/3ae08721-03b2-4ab0-8291-a8d614da4f7b.png"
            alt="The Vasquez-Ortega family at their farm"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* <section className="bg-[#f3f6ee] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#dcb458] text-xs font-bold tracking-wider uppercase text-center mb-3">
            Our Locations
          </p>
          <h2 className="font-dm text-3xl sm:text-4xl text-gray-900 text-center mb-12">
            One Farms,Three Mission
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {farms.map((farm) => (
              <div key={farm.name} className="bg-white rounded-2xl overflow-hidden">
                <img
                  src={farm.image}
                  alt={farm.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h3 className="font-dm text-xl text-gray-900 mb-1">{farm.name}</h3>
                  <p className="text-[#2D7A0F] text-sm font-medium mb-3">{farm.location}</p>

                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <span>🌱 {farm.acres}</span>
                    <span>🌿 {farm.produce}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-[#2D7A0F] text-xs font-bold tracking-wider uppercase text-center mb-3">
          Behind the Scenes
        </p>
        <h2 className="font-dm text-3xl sm:text-4xl text-gray-900 text-center mb-12">
          Life on the Farm
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="rounded-xl overflow-hidden aspect-square">
              <img
                src={src}
                alt={`Life on the farm ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </section> */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-[#2D7A0F] text-xs font-bold tracking-wider uppercase text-center mb-3">
          Behind the Scenes
        </p>
        <h2 className="font-dm text-3xl sm:text-4xl text-gray-900 text-center mb-12">
          The Farm
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="rounded-xl overflow-hidden aspect-square">
              <img
                src={src}
                alt={`Life on the farm ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}