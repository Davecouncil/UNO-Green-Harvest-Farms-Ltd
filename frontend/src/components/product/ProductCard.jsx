function ProductCard({ product }) {
  return (
    
    <div className="group bg-white fade-up delay-1000 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 sm:h-60 lg:h-80  object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Hover Button */}
<div
  className="
    absolute left-0 right-0 bottom-4 flex justify-center
    opacity-100 translate-y-0
    md:opacity-0 md:translate-y-6
    md:group-hover:opacity-100
    md:group-hover:translate-y-0
    transition-all duration-300
  "
>
  <button 
//   className="bg-[#2D7A0F] hover:bg-[#25650d] text-white rounded-full px-4 sm:px-10 py-2 font-medium shadow-lg"
  className="bg-[#2D7A0F] text-white rounded-full
px-4 sm:px-8
py-2 sm:py-3
text-sm sm:text-base"
  >
    Add to Cart
  </button>
</div>

      </div>

      {/* Content */}
      <div className="p-3 sm:p-5">

        {/* Category */}
        <p className="uppercase text-xs tracking-wider text-gray-500 mb-2">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-dm text-lg sm:text-xl lg:text-2xl text-gray-900">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex justify-between items-end mt-5">

          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
            ${product.price}
            <span className="text-sm text-gray-400">
          {product.unit}
        </span>
          </span>

        
    
        </div>

      </div>

    </div>
  );
}
export default ProductCard;