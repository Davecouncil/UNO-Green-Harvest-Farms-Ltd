import PageHero from "../components/ui/PageHero";

function About() {
  return (
    <div>

      <PageHero
        badge="Our Story Since 1972"
        title="About Us"
        description="A family legacy of farming, a passion for quality, and an unwavering commitment to doing what is right for the land and our community."
        bgImage="/images/farm-house.png"
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
          src="/images/hands-soil-seedling.png"
          alt="Hands holding soil with a young seedling"
          className="w-full h-[440px] object-cover rounded-2xl"
        />

      </section>

    </div>
  );
}

export default About;