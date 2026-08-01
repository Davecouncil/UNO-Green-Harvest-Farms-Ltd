 import ProductCard from "./ProductCard";

 function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {products.map(product => (
                <ProductCard
                    key={product._id}
                    product={product}
                />
            ))}

        </div>
    );
}
export default ProductGrid;