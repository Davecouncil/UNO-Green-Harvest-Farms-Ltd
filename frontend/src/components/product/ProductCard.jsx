function ProductCard({ product }) {
  return (
    <div className="group bg-white fade-up delay-1000 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 sm:h-52 lg:h-64 object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Hover Button */}
        <div
          className="
            absolute left-0 right-0 bottom-3 flex justify-center
            opacity-100 translate-y-0
            md:opacity-0 md:translate-y-6
            md:group-hover:opacity-100
            md:group-hover:translate-y-0
            transition-all duration-300
          "
        >
          <button className="bg-[#2D7A0F] hover:bg-[#25650d] transition text-white rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium shadow-md">
            Add to Cart
          </button>
        </div>

      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">

        {/* Category */}
        <p className="uppercase text-[10px] sm:text-xs tracking-wider text-gray-500 mb-1">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-dm text-sm sm:text-lg text-gray-900 truncate">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-3">
          <span className="text-base sm:text-xl font-bold text-black">
            ${product.price}
          </span>
          <span className="text-xs text-gray-400 ml-1">
            {product.unit}
          </span>
        </div>

      </div>

    </div>
  );
}

export default ProductCard;