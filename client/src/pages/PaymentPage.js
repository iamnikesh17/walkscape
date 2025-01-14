import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import { CheckoutSteps } from '../components/Others/CheckoutSteps';

export const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const navigate=useNavigate();
  const dispatch=useDispatch();
 const {shippingAddress}=useSelector((state)=>state.cart);
  useEffect(()=>{
    if(!shippingAddress){
        navigate("/shipping")
    }
  },[shippingAddress,navigate])

  const handleSubmit=(e)=>{
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");

  }
  return (
    <>
      <CheckoutSteps step1 step2 step3/>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Select Payment Method</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                className="mr-2"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="CashOnDelivery"
                className="mr-2"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={!paymentMethod}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
    </>
   
  );
};


