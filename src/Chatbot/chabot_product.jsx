import { useState } from "react";

export function ScrollableProductCard({ products, addToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="w-full max-w-sm mx-auto mt-4 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="relative aspect-square mb-4">
          <img
            src={currentProduct.images[0] || "/placeholder.svg"}
            alt={currentProduct.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{currentProduct.name}</h3>
        <p className="text-[#FF8A00] font-bold mb-4">
          ₹{currentProduct.price.toLocaleString()}
        </p>
        <button
          onClick={() => addToCart(currentProduct)}
          className="w-full mb-4 bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white py-2 px-4 rounded-md transition-colors duration-200"
        >
          Add to Cart
        </button>
        <div className="flex justify-between items-center">
          <button
            onClick={prevProduct}
            className="rounded-full p-2 border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Previous product"
          >
            &#8592;
          </button>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} of {products.length}
          </span>
          <button
            onClick={nextProduct}
            className="rounded-full p-2 border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Next product"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
