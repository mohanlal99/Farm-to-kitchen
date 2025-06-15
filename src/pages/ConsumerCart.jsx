import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "../styles/index.css";

const ConsumerCart = () => {
  const { user } = useContext(AuthContext);
  const cart = user?.cart || [];

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.total_price || 0),
    0
  );
  const saved = (total - subtotal).toFixed(2);

  console.log(subtotal);
  console.log(total);
  console.log(saved);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-green-600">
          Hey, {user?.fullname?.split(" ")[0]}! 👋
        </h1>
        <Link
          to={"/market"}
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-xl">
          Browse Fresh Produce
        </Link>
      </div>

      {cart.length === 0 ? (
        <>
          <p className="text-gray-600 mb-6">
            Your cart is empty right now. But don’t worry, fresh produce is just
            a few clicks away!
          </p>
          <div className="text-center mt-8">
            <ShoppingCart
              className="animate-moveRightToLeft mx-auto"
              size={90}
            />
            <p className="text-lg text-gray-700 font-semibold mt-4">
              It looks like you haven’t added anything yet.
            </p>
            <p className="text-gray-500 mt-2">
              Start shopping now to fill your cart with fresh, local produce!
            </p>
          </div>
        </>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white text-sm md:text-base">
              <tr>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-center">Qty</th>
                <th className="py-3 px-6 text-center">Price (₹)</th>
                <th className="py-3 px-6 text-center">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                const price = parseFloat(item.price) || 0;
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 text-sm md:text-base">
                    <td className="py-4 px-6 flex items-center gap-4">
                      <img
                        src={item.product_images?.[0]}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-xs text-gray-500">
                          By {item.username}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">{item.quantity}</td>
                    <td className="py-4 px-6 text-center">
                      ₹{price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center font-semibold">
                      ₹{item?.total_price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md max-w-xl ml-auto">
            <div className="flex justify-between mb-3">
              <span className="font-medium text-gray-700">
                Cart Subtotal (You pay):
              </span>
              <span className="font-semibold text-green-700">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">
                Actual Price (Without Discount):
              </span>
              <span className="text-gray-600">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-gray-600">You Save:</span>
              <span className="text-red-600">₹{saved}</span>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 text-lg font-semibold">
              Place Order & Generate Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerCart;
