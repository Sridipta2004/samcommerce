import React from 'react'
import wishlist from '../data/wishlist'

function Wishlist() {
  return (
    <div>
      <h1 className='font-bold'>My Wishlist</h1>
      <div className="p-10 flex flex-col gap-4">
        {wishlist.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
          >
            {/* Thumbnail */}
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-20 object-cover rounded-lg"
              loading='eager'
            />

            {/* Info */}
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
              <p className="text-sm text-gray-400 mt-1">By {item.seller}</p>
            </div>

            {/* Price + Button */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-green-600 font-bold text-lg">₹{item.price}</span>
              <div className="flex flex-row gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
                  Buy Now
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Wishlist