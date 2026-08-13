import PageHero from "../components/ui/PageHero";
import FeatureGrid from "../components/ui/FeatureGrid";
import { Heart, Users, Globe } from "lucide-react";

const values = [
  // {
  //   icon: Heart,
  //   title: "Health First",
  //   description:
  //     "We grow food that nourishes bodies and delights taste buds. No synthetic pesticides, no GMOs, no shortcuts — just pure, wholesome produce packed with nutrients.",
  // },
  // {
  //   icon: Users,
  //   title: "Community Centered",
  //   description:
  //     "We pay fair wages, support local food banks, and partner with schools to teach children about farming. A thriving community grows from healthy food systems.",
  // },
  {
    icon: Globe,
    title: "Planet Positive",
    description:
      "Every farming decision considers its environmental impact. We are committed to leaving the land healthier than we found it for generations to come.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "We embrace modern technologies that improve agricultural productivity and efficiency."
  },
    {
    icon: Globe,
    title: "Integrity",
    description: "We operate with honesty, transparency, and accountability."
  },
    {
    icon: Globe,
    title: "Sustainability",
    description: "We protect natural resources while producing healthy food for present and future generations."
  },
    {
    icon: Globe,
    title: "Excellence",
    description: "We strive for the highest standards in agricultural production and customer satisfaction."
  },
    {
    icon: Globe,
    title: "Community Development",
    description: "We believe agriculture should improve the lives of farmers, employees, and surrounding communities. "
  },
    {
    icon: Globe,
    title: "Environmental Responsibility",
    description: "We are committed to environmentally friendly farming practices and renewable energy solutions."
  }
];
const team = [
  {
    image: "/images/person1.jpeg",
    name: "Carlos Vasquez-Ortega",
    role: "Founder & Head Farmer",
  },
  {
    image: "/images/person3.jpeg",
    name: "Ada bola ",
    role: "Director of Sustainability",
  },
  {
    image: "/images/person2.jpeg",
    name: "Miguel Herrera",
    role: "Head of Operations",
  },
  {
    image: "/images/person4.jpeg",
    name: "Sofia Chen",
    role: "Smart Farming Lead",
  },
];

function About() {
  return (
    <div>

      <PageHero
       
        title="About Us"
        // description="A family legacy of farming, a passion for quality, and an unwavering commitment to doing what is right for the land and our community."
        bgImage="/images/farm-house.jpeg"
      />

      {/* Our Mission */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <p className="uppercase tracking-widest text-xs text-[#4D7C0F] font-semibold mb-3">
            Our Mission
          </p>

          <h2 className="font-dm text-4xl leading-tight mb-5">
            Good Food Grown
            <br />
            the Right Way
          </h2>

          <div className="flex flex-col gap-4 text-gray-600 text-sm leading-6">
            <p>
              Our mission is simple: to provide families with the freshest,
              most nutritious organic produce while regenerating the land
              that sustains us. We believe that how food is grown matters —
              for our health, for our communities, and for the planet.
            </p>

            <p>
              We are not just farmers. We are stewards of 2,400 acres of
              farmland, custodians of soil that has been nurtured for
              generations, and partners in a food system that prioritizes
              quality over quantity and people over profits.
            </p>

            <p>
              Every decision we make — from seed selection to packaging — is
              guided by three principles: nourish people, respect the land,
              and build community.
            </p>
          </div>
        </div>

        <img
          src="/images/sustain.png"
          alt="Hands holding soil with a young seedling"
          className="w-full h-110 object-cover rounded-2xl"
        />

      </section>

      {/* Core Values */}
      <FeatureGrid
        badge="What We Stand For"
        title="Our Core Values"
        items={values}
        align="center"
        iconBg="bg-[#f5e2b8]"
        iconColor="text-[#D69B06]"
        columns="md:grid-cols-3"
      />
      {/* Meet Our Team */}
      <section className="bg-[#F4F8F1] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <p className="uppercase tracking-widest text-sm text-[#4D7C0F] font-semibold mb-3">
            The People Behind the Produce
          </p>

          <h2 className="font-dm text-4xl mb-14">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-2xl mb-4"
                />

                <h3 className="font-dm text-lg">{member.name}</h3>
                <p className="text-[#4D7C0F] text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default About;