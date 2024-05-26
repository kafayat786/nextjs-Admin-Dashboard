import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">Price: ${product.price}</p>
        {/* Add other product details as needed */}
      </div>
    </div>
  );
};

export default ProductCard;
