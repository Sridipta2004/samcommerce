import React from "react";
import { toast } from "react-toastify";

function Publish() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Product Published Successfully 🚀");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row-reverse overflow-hidden max-w-4xl w-full my-10">

        {/* Left Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-extrabold text-blue-800">
            Publish Your Product 🚀
          </h2>
          <p className="text-sm mt-2 text-gray-600">
            Share your amazing product with SamCommerce users!
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium">
                Product Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                className="w-full px-4 py-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="desc" className="block text-gray-700 font-medium">
                Product Description
              </label>
              <textarea
                id="desc"
                placeholder="Enter description"
                className="w-full px-4 py-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-gray-700 font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                min="0"
                placeholder="Enter price"
                className="w-full px-4 py-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Cover Image */}
            <div>
              <label htmlFor="image1" className="block text-gray-700 font-medium">
                Upload Cover Image
              </label>
              <input
                type="file"
                id="image1"
                accept="image/*"
                className="w-full px-4 py-2 mt-2 border rounded-lg cursor-pointer bg-gray-50 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Resources */}
            <div>
              <label htmlFor="image2" className="block text-gray-700 font-medium">
                Upload Resources
              </label>
              <input
                type="file"
                id="image2"
                accept="application/zip,application/x-zip-compressed,multipart/x-zip"
                className="w-full px-4 py-2 mt-2 border rounded-lg cursor-pointer bg-gray-50 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 transition duration-300 text-white font-semibold rounded-lg px-4 py-3 mt-4 shadow-md"
            >
              Upload Now ➡️
            </button>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block md:w-1/2 p-8 pr-0 ">
          <img
            src="https://plus.unsplash.com/premium_photo-1683732137653-9121ba5e8ede"
            // 
            alt="Publish"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Publish;