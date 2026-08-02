import {
  FiArrowRight,
  FiShield,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sustainability() {
  const stats = [
    {
      icon: <FaLeaf />,
      value: "100%",
      label: "Organic Certified",
    },
    {
      icon: <FiClock />,
      value: "50+",
      label: "Years Farming",
    },
    {
      icon: <FiShield />,
      value: "0",
      label: "Chemical Pesticides",
    },
    {
      icon: <FiUsers />,
      value: "12k+",
      label: "Happy Customers",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGE */}
        <div className="relative">

          <img
            src="/images/b264067e-f507-4bb2-afdc-e349d8016b57.png"
            alt="Farmers"
            className="rounded-2xl w-full h-80 sm:h-96 object-cover"
          />

          {/* Floating Card */}
          <div className="absolute -bottom-4 right-4 bg-[#D49A08] text-white rounded-lg px-5 py-3 shadow-lg">
            <h3 className="text-2xl font-bold">50+</h3>
            <p className="text-sm">Years of Farming</p>
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div>

          <p className="uppercase tracking-widest text-sm text-[#2D6A2E] font-semibold">
            OUR COMMITMENT
          </p>

          <h2 className="font-dm text-3xl leading-tight mt-2">
            Growing With Nature,
            <br />
            Not Against It
          </h2>

          <p className="text-gray-600 mt-4 text-sm leading-6">
            Sustainability isn't just a buzzword for us — it's the foundation
            of everything we do. From regenerative soil practices to
            zero-waste packaging, every decision at UNO Green Harvest Farms is
            guided by our commitment to the land that feeds us.
          </p>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">

            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-[#F3F7F0] rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#C8E6A6] flex items-center justify-center text-[#2D6A2E] text-lg shrink-0">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {item.value}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}

          </div>

          {/* Button */}
          <Link
            to="/Sustainability"
            className="mt-6 inline-flex items-center gap-2 bg-[#2E6A22] hover:bg-[#25541b] transition text-white px-6 py-2.5 text-sm rounded-full font-semibold"
          >
            Learn About Our Practices
            <FiArrowRight />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Sustainability;