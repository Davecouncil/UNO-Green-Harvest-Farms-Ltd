import PageHero from "../components/ui/PageHero";
import CtaBanner from "../components/ui/CTABanner";
import FeatureGrid from "../components/ui/FeatureGrid";
import { Globe, Droplet, Bug, Recycle, Sprout, Cloud } from "lucide-react";

const practices = [
  {
    icon: Globe,
    title: "Soil Health Management",
    description:
      "We practice crop rotation, cover cropping, and minimal tillage to build rich, living soil. Our fields teem with beneficial microorganisms, earthworms, and natural fertility — no synthetic fertilizers needed.",
  },
  {
    icon: Droplet,
    title: "Water Conservation",
    description:
      "Our smart irrigation systems reduce water usage by 98%. Rainwater harvesting ponds capture seasonal rainfall, while drip irrigation delivers water directly to plant roots — never a drop wasted.",
  },
  {
    icon: Bug,
    title: "Natural Pest Management",
    description:
      "Instead of chemical pesticides, we use beneficial insects, companion planting, and habitat corridors. Ladybugs, lacewings, and birds are our pest control team — and they work for free.",
  },
  {
    icon: Recycle,
    title: "Zero-Waste Packaging",
    description:
      "All our packaging is compostable, recyclable, or reusable. From cardboard produce boxes to glass milk bottles, we design every package to return safely to the earth.",
  },
  {
    icon: Sprout,
    title: "Biodiversity Protection",
    description:
      "We maintain wildlife corridors, pollinator hedgerows, and native plant zones across all three farms. Over 120 bird species, countless bees, and native wildlife call our farms home.",
  },
  {
    icon: Cloud,
    title: "Carbon Sequestration",
    description:
      "Through cover cropping and perennial plantings, our soil captures and stores atmospheric carbon. We are on track to be carbon-negative by 2028 — removing more carbon than we emit.",
  },
];

function Sustainability() {
  return (
    <div>

      <PageHero
        badge="Our Promise to the Planet"
        title="Sustainability"
        description="Farming in harmony with nature — because healthy soil, clean water, and thriving ecosystems are the foundation of everything we do."
        bgImage="/images/sustain (1).jpeg"
      />

      {/* Our Philosophy */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <p className="uppercase tracking-widest text-sm text-[#4D7C0F] font-semibold mb-3">
          Our Philosophy
        </p>

        <h2 className="font-dm text-4xl mb-6">
          Regenerative Agriculture
        </h2>

        <p className="text-gray-600 text-base leading-7">
          We go beyond organic. Regenerative agriculture means we actively
          improve the land we farm — building soil health, increasing
          biodiversity, sequestering carbon, and enhancing the entire
          ecosystem. Every season, our farms become more resilient and more
          productive, proving that sustainable farming isn't just possible —
          it's better.
        </p>

      </section>

      {/* Sustainable Practices */}
      <FeatureGrid
        badge="How We Do It"
        title="Our Sustainable Practices"
        items={practices}
      />

      <CtaBanner
        title="Join Us in Growing a Better Future"
        description="Every purchase supports regenerative agriculture, fair wages for farm workers, and a healthier planet."
        buttonText="Shop Sustainable Products"
        buttonLink="/products"
      />

    </div>
  );
}

export default Sustainability;