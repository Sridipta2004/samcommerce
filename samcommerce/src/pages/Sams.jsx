import React, { useEffect, useState } from "react";

function Sams() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/product/all");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        if (data.success) {
          // Map backend data to frontend format
          const mappedProducts = data.products.map(product => ({
            id: product._id,
            name: product.title,
            description: product.description,
            price: product.price,
            image: product.banner ? `/uploads/${product.banner}` : '/vite.svg', // Fallback image
            seller: product.user?.name || "Unknown Seller",
            ownerId: product.user?._id?.toString(),
            fileType: "ZIP" // Since zip is always provided
          }));
          setProducts(mappedProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Fetch products error:", err);
        setError(err.message);
        setProducts([]); // Fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen text-red-500">
        <div>Error: {error}. Please ensure backend is running.</div>
      </div>
    );
  }

  const handleDelete = async (productId) => {
    if (!token) {
      console.error("No token, cannot delete");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/product/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        console.log("Product deleted successfully");
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!token) {
      alert("Please login first!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/wishlist/add-item/${productId}`, {
        method: "POST",
        headers: {
          "Authorization": token,
        },
      });
      const data = await response.json();
      if (data.success) {
        alert("Added to wishlist! ✓");
      } else {
        alert(data.message || "Failed to add wishlist");
      }
    } catch (err) {
      alert("Error adding to wishlist");
    }
  };

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Marketplace</h1>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products available yet. Be the first to publish!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.src = '/vite.svg'; // Fallback on image error
                }}
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-green-600">
                    ₹{item.price}
                  </span>
                  <span className="text-sm text-gray-400">
                    By {item.seller}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full flex-1">
                    {item.fileType}
                  </span>
                  {isAuthenticated ? (
                    <div className="flex gap-1 flex-1">
                      <button 
                        onClick={() => handleAddToWishlist(item.id)}
                        className="px-3 py-1 text-xs bg-pink-200 text-pink-700 hover:bg-pink-300 rounded-lg transition flex-1 text-center"
                      >
                        ♥ Love
                      </button>
                      <button 
                        onClick={() => handleOrderProduct(item.id)}
                        className="px-3 py-1 text-xs bg-green-200 text-green-700 hover:bg-green-300 rounded-lg transition flex-1 text-center"
                      >
                        Order
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="px-3 py-1 text-xs bg-red-600 text-black hover:bg-red-700 rounded-lg transition flex-1 text-center"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex-1">
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sams;

