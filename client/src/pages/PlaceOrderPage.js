import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { clearCart } from '../slices/cartSlice';

export const PlaceOrderPage = () => {
    const [createOrder,{isLoading,error}]=useCreateOrderMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems,itemsPrice,shippingPrice,taxPrice,totalPrice, shippingAddress, paymentMethod } = useSelector((state) => state.cart);

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping");
        } else if (!paymentMethod) {
            navigate("/payment");
        }
    }, [shippingAddress, paymentMethod, navigate]);

    const placeOrderHandler=async ()=>{
        try {
            const res=await createOrder({
                orderItems:cartItems,
                shippingAddress:shippingAddress,
                paymentMethod:paymentMethod,
                itemsPrice:itemsPrice,
                shippingPrice:shippingPrice,
                taxPrice:taxPrice,
                totalPrice:totalPrice
            }).unwrap();

            dispatch(clearCart());
            navigate(`/order/${res._id}`);
        }
         catch (error) {
            toast(error?.data?.message || error?.error)
        }
    }

    return (
        <>
            {isLoading && (<h1>Loading.....</h1>)}

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Shipping & Payment Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
                        {/* Shipping Address */}
                        <div className="border-b border-gray-200 pb-4 mb-6">
                            <h1 className="text-2xl font-bold mb-2">Shipping</h1>
                            <p className="text-gray-600"><strong>Address:</strong> {shippingAddress.address} {shippingAddress.city} {shippingAddress.postalCode}</p>
                        </div>

                        {/* Payment Method */}
                        <div className="border-b border-gray-200 pb-4 mb-6">
                            <h1 className="text-2xl font-bold mb-2">Payment Method</h1>
                            <p className="text-gray-600"><strong>Method:</strong> {paymentMethod}</p>
                        </div>

                        {/* Order Items */}
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Order Items</h1>
                            <div className="space-y-6">

                                {
                                    cartItems.length===0?(<h2>Your cart is empty</h2>):(
                                        cartItems.map((item,index)=>(
                                            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg shadow-sm p-4">
                                            <div className="flex items-center">
                                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                                                <h2 className="ml-4 text-lg font-semibold">{item.name}</h2>
                                            </div>
                                            <div className="text-right text-gray-600">
                                                {item.qty} X ${item.price} = ${item.qty*item.price}
                                            </div>
                                        </div>
                                        ))
                                    )
                                }

                              
                                {/* Add more product items similarly */}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-lg font-semibold">Items:</span>
                                <span className="text-lg font-semibold">${itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-lg font-semibold">Shipping:</span>
                                <span className="text-lg font-semibold">${shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-lg font-semibold">Tax:</span>
                                <span className="text-lg font-semibold">${taxPrice}</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-4">
                                <span className="text-lg font-semibold">Total:</span>
                                <span className="text-lg font-bold text-green-600">${totalPrice}</span>
                            </div>

                            {
                                error && (
                                    <div className="flex justify-between border-t border-gray-200 pt-4">
                                    <span className="text-lg font-semibold">Error:</span>
                                    <span className="text-lg font-bold text-green-600">${error?.data?.message}</span>
                                </div>
                                )
                            }
                        </div>
                        <button  onClick={placeOrderHandler} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
