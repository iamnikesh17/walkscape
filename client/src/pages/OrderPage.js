import React from 'react';
import { useGetOrderDetailsQuery, useUpdateOrderDeliveredMutation } from '../slices/ordersApiSlice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from '../components';
import { toast } from 'react-toastify';

export const OrderPage = () => {
    const {id}=useParams();
    const {data:order,isLoading,error,refetch}=useGetOrderDetailsQuery(id);
    const [updateOrderDelivered,{isLoading:loadingDelivered}]=useUpdateOrderDeliveredMutation();
    const {userInfo}=useSelector((state)=>state.auth);

    const updateDeliveredHandler=async ()=>{
      try {
        await updateOrderDelivered(id);
        refetch();
        toast.success("Order Delivered")
      }
      catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }

  return isLoading?<h1>loading.....</h1>:error?<h1>{error?.data?.message || error?.error}</h1>: (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Section */}
          <div className="lg:w-2/3">
            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Info</h2>
              <p className="text-gray-600"><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
              <p className="text-gray-600"><strong>City:</strong> {order.shippingAddress.city}</p>
              <p className="text-gray-600"><strong>Country:</strong> {order.shippingAddress.country}</p>
                {
                  order.isDelivered? (<p className="text-gray-600"><strong>Delivered Status:</strong> delivered</p>
                  ):(<p className="text-grey-600"><strong>Delivered Status:</strong><span className='text-red-600'>not delivered</span></p>)
                }
              
            </div>

            {/* Payment Info */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Info</h2>
              <p className="text-gray-600"><strong>Payment Method:</strong> {order.paymentMethod}</p>
              {
                order.isPaid ? (<p className="text-gray-600"><strong>Payment Status:</strong>paid</p>
                ):(<p className="text-grey-600"><strong>Payment Status:</strong><span className='text-red-600'>not paid</span></p>)
              }
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Items</h2>

              {order.orderItems.length > 0? (
                order.orderItems.map((item,index)=>(
                    <div key={index} className="flex items-center gap-4 mb-4">
                    <img 
                      src={item.image}
                      alt={item.name} 
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium">{item.name}</p>
                      <p className="text-gray-500">{item.qty}</p>
                    </div>
                    <p className="text-gray-700">${item.price}</p>
                  </div>
                ))
              ):(
                    <h1>no order items</h1>
              )}

            
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Items Price:</p>
                <p className="text-gray-700">${order.itemsPrice}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Tax Price:</p>
                <p className="text-gray-700">${order.taxPrice}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Shipping Price:</p>
                <p className="text-gray-700">${order.shippingPrice}</p>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between items-center font-semibold text-lg">
                <p className="text-gray-700">Total Price:</p>
                <p className="text-gray-900">${order.totalPrice}</p>
              </div>

              {!userInfo.isAdmin && (
                    <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300">
                    Proceed to Payment
                  </button>
              )}

          

              {loadingDelivered && <Loader/>}

              {
                userInfo && userInfo.isAdmin && !order.deliveredAt && (
                  <button onClick={updateDeliveredHandler} className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300">
                    Mark As Delivered
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


