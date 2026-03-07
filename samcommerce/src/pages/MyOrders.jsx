import React from 'react'

import orders from '../data/orders';


let headers = ['order_Id','Product Image', 'productName', 'price', 'seller', 'fileType', 'status', 'paymentMethod', 'orderDate', 'downloadLink']


function MyOrders() {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
      <h1 class="text-xl font-bold text-gray-900 pl-5 pb-5"> My Orders History</h1>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th scope="col" class="px-6 py-3 whitespace-nowrap" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>

          {
            orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.orderId}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img src={order.image} alt={order.productName} class="w-20 h-14 object-cover rounded-lg" />
                  </th>
                  <td class="px-6 py-4">
                    {order.productName}
                  </td>
                  <td class="px-6 py-4">
                    ₹{order.price}
                  </td>
                  <td class="px-6 py-4">
                    {order.seller}
                  </td>
                  <td class="px-6 py-4">
                    {order.fileType}
                  </td>
                  <td class="px-6 py-4">
                    {order.status}
                  </td>
                  <td class="px-6 py-4">
                    {order.paymentMethod}
                  </td>
                  <td class="px-6 py-4">
                    {order.orderDate}
                  </td>
                  <td class="px-6 py-4">
                    <a href={order.downloadLink} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Download</a>
                  </td>
                </tr>
              ))
            ) :
              <tr>
                <td colSpan={headers.length} class="text-center bg-gray-900 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  No Orders Found
                </td>
              </tr>
          }

        </tbody>
      </table>
    </div>

  )
}

export default MyOrders