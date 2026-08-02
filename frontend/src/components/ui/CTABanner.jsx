// components/CtaBanner.jsx
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function CtaBanner({ title, description, buttonText, buttonLink }) {
  return (
    <section className="bg-[#2E6A22] py-20 text-center">
      <div className="max-w-3xl mx-auto px-6">

        <h2 className="font-dm text-4xl text-white mb-4">
          {title}
        </h2>

        <p className="text-white/90 text-base leading-7 mb-8">
          {description}
        </p>

        <Link
          to={buttonLink}
          className="inline-flex items-center gap-2 bg-[#D69B06] hover:bg-[#c38d04] transition text-white px-8 py-3.5 rounded-full font-semibold"
        >
          {buttonText}
          <FiArrowRight />
        </Link>

      </div>
    </section>
  );
}

export default CtaBanner;