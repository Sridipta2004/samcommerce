import React, { useState, useEffect } from 'react'

// import orders from '../data/orders.js'; // Replaced with dynamic

let headers = ['order_Id','Product Image', 'productName', 'price', 'seller', 'fileType', 'status', 'paymentMethod', 'orderDate', 'downloadLink']

function MyOrders() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/order/view", {
          headers: {
            "Authorization": token,
          },
        });
        const data = await response.json();
        if (data.orders) {
          const mappedOrders = data.orders.map((order) => ({
            orderId: order._id,
            image: order.product.banner ? `/uploads/${order.product.banner}` : '/vite.svg',
            productName: order.product.title,
            price: order.product.price,
            seller: order.product.user?.name || "Unknown",
            fileType: "ZIP",
            status: order.status,
            paymentMethod: order.paymentMethod,
            orderDate: new Date(order.createdAt).toLocaleDateString(),
            downloadLink: order.product.zip ? `/uploads/${order.product.zip}` : '#'
          }));
          setOrders(mappedOrders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen text-gray-500">
        <div>Please <a href="/login" className="text-blue-600 underline">login</a> to view your orders.</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
      <h1 className="text-xl font-bold text-gray-900 pl-5 pb-5"> My Orders History</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th scope="col" className="px-6 py-3 whitespace-nowrap" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.orderId}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <img src={order.image} alt={order.productName} className="w-20 h-14 object-cover rounded-lg" />
                </th>
                <td className="px-6 py-4">
                  {order.productName}
                </td>
                <td className="px-6 py-4">
                  ₹{order.price}
                </td>
                <td className="px-6 py-4">
                  {order.seller}
                </td>
                <td className="px-6 py-4">
                  {order.fileType}
                </td>
                <td className="px-6 py-4">
                  {order.status}
                </td>
                <td className="px-6 py-4">
                  {order.paymentMethod}
                </td>
                <td className="px-6 py-4">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4">
                  {order.downloadLink ? (
                    <a href={order.downloadLink} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-900 transition">
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No Download</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center bg-gray-50 px-6 py-12 text-gray-500">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MyOrders
