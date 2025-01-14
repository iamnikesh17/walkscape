import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { CheckoutSteps } from '../components';

export const ShippingPage = () => {
  const {shippingAddress}=useSelector((state)=>state.cart);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [address,setAddress]=useState(shippingAddress?.address || '');
  const [city,setCity]=useState(shippingAddress?.city || '');
  const [postalCode,setPostalCode]=useState(shippingAddress?.postalCode || '');
  const [country,setCountry]=useState(shippingAddress?.country || '');

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(saveShippingAddress({address,city,postalCode,country}));
    navigate('/payment');
  }

  return (
    <>
      <CheckoutSteps step1 step2/>
     <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              id="address"
              name='address'
              onChange={(e)=>setAddress(e.target.value)}
              value={address}
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City Field */}
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium mb-1">City</label>
            <input
              type="text"
              id="city"
              name='city'
              onChange={(e)=>setCity(e.target.value)}
              value={city}
              placeholder="Enter your city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Postal Code Field */}
          <div>
            <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name='postalCode'
              onChange={(e)=>setPostalCode(e.target.value)}
              value={postalCode}
              placeholder="Enter your postal code"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country Field */}
          <div>
            <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
            <input
              type="text"
              id="country"
              name='country'
              onChange={(e)=>setCountry(e.target.value)}
              value={country}
              placeholder="Enter your country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
    </>
   
  );
};


