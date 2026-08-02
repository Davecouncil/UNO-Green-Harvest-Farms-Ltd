import { Link } from "react-router-dom";

import {
  Sprout,
  Apple,
  Milk,
  Wheat,
  Beef,
  Wrench,
} from "lucide-react";

function ProductCategories({ products }) {
  const iconMap = {
    Vegetables: Sprout,
    Fruits: Apple,
    "Dairy & Eggs": Milk,
    "Grains & Cereals": Wheat,
    Livestock: Beef,
    "Farm Equipment": Wrench,
  };

  const colorMap = {
    Vegetables: "bg-green-100 text-green-700",
    Fruits: "bg-yellow-100 text-yellow-700",
    "Dairy & Eggs": "bg-stone-200 text-stone-700",
    "Grains & Cereals": "bg-lime-100 text-lime-700",
    Livestock: "bg-orange-100 text-orange-700",
    "Farm Equipment": "bg-stone-200 text-stone-700",
  };

  const categories = Object.entries(
    products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {})
  );

  return (
    <section className="bg-[#F4F8F1] py-14">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-8">
          <p className="uppercase tracking-widest text-sm text-[#CD9707] font-semibold">
            Explore Our Range
          </p>

          <h2 className="text-3xl font-dm mt-1">
            Browse By Category
          </h2>

          <p className="text-gray-600 text-sm mt-3 max-w-2xl mx-auto">
            From fresh vegetables to farm equipment, find everything you need
            for a sustainable lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(([category, count]) => {
            const Icon = iconMap[category] || Sprout;

            return (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="bg-white rounded-xl p-5 text-center hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    colorMap[category] || "bg-green-100 text-green-700"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <h3 className="font-dm text-base">{category}</h3>

                <p className="text-gray-500 text-xs mt-1">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ProductCategories;