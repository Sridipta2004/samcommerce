import React, { useState, useEffect } from 'react'

// import wishlist from '../data/wishlist.js'; // Replaced with dynamic

function Wishlist() {
  const token = localStorage.getItem("token");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOrderProduct = async (productId) => {
    if (!token) {
      alert("Please login first!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/order/add/${productId}`, {
        method: "POST",
        headers: {
          "Authorization": token,
        },
      });
      const data = await response.json();
      if (data.success) {
        alert("Added to orders! ✓");
      } else {
        alert(data.message || "Failed to order");
      }
    } catch (err) {
      alert("Error adding to order");
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/wishlist/all-items", {
          headers: {
            "Authorization": token,
          },
        });
        const data = await response.json();
        if (data.wishlists) {
          const mappedItems = data.wishlists.map((w) => ({
            id: w._id,
            productId: w.product._id,
            image: w.product.banner ? `/uploads/${w.product.banner}` : '/vite.svg',
            name: w.product.title,
            description: w.product.description,
            seller: w.product.user?.name || "Unknown",
            price: w.product.price
          }));
          setWishlistItems(mappedItems);
        } else {
          setWishlistItems([]);
        }
      } catch (err) {
        console.error("Fetch wishlist error:", err);
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [token]);

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading wishlist...</div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen text-gray-500">
        <div>Please <a href="/login" className="text-blue-600 underline">login</a> to view your wishlist.</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Your wishlist is empty. Add items from Sams page!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              {/* Thumbnail */}
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-20 object-cover rounded-lg"
                onError={(e) => { e.target.src = '/vite.svg'; }}
              />

              {/* Info */}
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-sm text-gray-400 mt-1">By {item.seller}</p>
              </div>

              {/* Price + Buttons */}
              <div className="flex flex-col items-end gap-2">
                <span className="text-green-600 font-bold text-lg">₹{item.price}</span>
                <div className="flex flex-row gap-2">
                  <button 
                    onClick={() => handleOrderProduct(item.productId)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-900 transition"
                  >
                    Buy Now
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition" onClick={() => alert('Remove functionality coming soon!')}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
