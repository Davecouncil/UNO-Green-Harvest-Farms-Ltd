function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-[#CD9707] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </span>

      </div>

      {/* Product Details */}
      <div className="p-5">

        <h3 className="text-xl font-semibold text-gray-800">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-5">

          <span className="text-2xl font-bold text-[#1D4D2F]">
            ${product.price}
          </span>

          <button className="bg-[#CD9707] hover:bg-[#b68606] text-white px-4 py-2 rounded-full transition">
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;