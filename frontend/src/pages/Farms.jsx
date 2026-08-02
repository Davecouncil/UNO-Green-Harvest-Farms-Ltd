import PageHero from "../components/ui/PageHero";

const farms = [
  {
    name: "Green Valley Farm",
    location: "Central California",
    acres: "1,200 acres",
    produce: "Vegetables, Dairy, Livestock",
    image: "/images/green-valley-farm.png",
  },
  {
    name: "Meadowbrook Farm",
    location: "Willamette Valley, Oregon",
    acres: "800 acres",
    produce: "Organic Vegetables, Apiary, Poultry",
    image: "/images/meadowbrook-farm.png",
  },
  {
    name: "Sunrise Orchard",
    location: "Southern California",
    acres: "400 acres",
    produce: "Fruits, Nuts, Berries",
    image: "/images/sunrise-orchard.png",
  },
];

const galleryImages = [
  "/images/farm-life-1.png",
  "/images/farm-life-2.png",
  "/images/farm-life-3.png",
  "/images/farm-life-4.png",
];

export default function Farms() {
  return (
    <div className="min-h-screen">
      <PageHero
        badge="Our Land, Our Legacy"
        title="Our Farms"
        description="Three generations of sustainable farming across 2,400 acres of fertile land. Discover the places where your food comes from."
        bgImage="/images/farm-spot.png"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#2D7A0F] text-xs font-bold tracking-wider uppercase mb-3">
            Our Story
          </p>

          <h2 className="font-dm text-3xl sm:text-4xl text-gray-900 mb-6">
            Three Generations of Stewardship
          </h2>

          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
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
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <img
            src="/images/our-story.png"
            alt="The Vasquez-Ortega family at their farm"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="bg-[#f3f6ee] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#dcb458] text-xs font-bold tracking-wider uppercase text-center mb-3">
            Our Locations
          </p>
          <h2 className="font-dm text-3xl sm:text-4xl text-gray-900 text-center mb-12">
            Three Farms, One Mission
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
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
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
      </section>
    </div>
  );
}