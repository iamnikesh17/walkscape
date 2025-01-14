import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const { cartItems, totalPrice, itemsPrice, taxPrice, shippingPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate=useNavigate();

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const checkoutHandler=()=>{
    navigate("/login?redirect=/shipping");
  }
  const backendUrl = "http://localhost:8080";


  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">Your Shopping Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <h1 className="text-center text-3xl font-semibold text-gray-700">Your cart is empty</h1>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md flex items-center p-6">
                  <img
                    src={`${backendUrl}${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <div className="mt-2">
                      <form>
                        <label className="text-sm text-gray-600">Quantity:</label>
                        <select
                          name="quantity"
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                          className="ml-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </form>
                    </div>
                    <p className="mt-3 text-gray-900 font-medium">${item.price} per item</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">${item.price * item.qty}</p>
                    <button onClick={()=>dispatch(removeCartItem(item))} className="text-red-500 mt-3 hover:underline">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-lg text-gray-700">
                <span>Subtotal:</span>
                <span>${itemsPrice}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-700">
                <span>Shipping:</span>
                <span>${shippingPrice}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-700">
                <span>Tax Price:</span>
                <span>${taxPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            <button onClick={checkoutHandler} className="w-full bg-indigo-600 text-white font-semibold py-3 mt-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


