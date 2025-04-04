import React from "react";

export default async function ProductCard({data}) {


  return (
    
      <div className="bg-white w-[44vw] md:w-[260px] rounded-2xl shadow-lg overflow-hidden  transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <img
          className="w-full h-[290px] object-cover"
          src={process.env.NEXT_PUBLIC_API_BASE_URL+"/images/product/"+data.main_image}
          alt="Product"
        />
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Experience ultimate comfort with the latest Nike Air Max sneakers.
          </p>
          <div className="md:flex  justify-between items-center mt-4">
            <span className="text-lg font-bold text-blue-600">₹{data.final_price}</span>
            <button className="bg-blue-600 text-[12px] mx-auto block mt-2 md:mt-1 md:text-[16px] text-white px-2 md:px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

  );
}
