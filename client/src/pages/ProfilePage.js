import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateprofileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Loader } from "../components";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";


export const ProfilePage = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const {data:orders,isLoading,error}=useGetMyOrdersQuery();

    const dispatch=useDispatch();

    const {userInfo}=useSelector((state)=>state.auth);
    const [updateProfile,{isLoading:loadingUpdateProfile}]=useUpdateprofileMutation();

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    },[userInfo,userInfo.name,userInfo.email])


    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            toast.error("password not matched")
        }
        else {
            try {
                const res=await updateProfile({_id:userInfo._id,name,email,password}).unwrap();
                dispatch(setCredentials({...res.user}))
                toast.success("Profile updated successfully");
                
            } catch (error) {
                toast.error(error?.data?.message || error?.error)
            }
        }
    }
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:gap-20">
          
          {/* Left Section - Profile Form */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Confirm your password"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
              >
                Update Profile
              </button>
              {loadingUpdateProfile && <Loader/>}

            </form>
          </div>

          {/* Right Section - Order History */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md mt-8 md:mt-0">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order History</h2>
            <div className="space-y-4">
              
              {/* Example Order Item */}
              {
                    isLoading ? <Loader/>: error?<h1>{error?.data?.message || error?.error}</h1>:(
                        orders?.map((order,index)=>(
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
             
                            <div>
                              <p className="text-gray-700 font-medium">Order #{order._id}</p>
                              <p className="text-gray-500">Date: {order.createdAt.substring(0,10)}</p>
                              <p className="text-gray-500">Total: ${order.totalPrice}</p>
                              <p className="text-gray-500">Paid: {order.isPaid ? (<strong className="text-red-500">paid</strong>):(<strong className="text-blue-800">Case on delievery</strong>)}</p>
                              <p className="text-gray-500">Delivered Status: {order.isDelivered ? (<strong className="text-green-700">Delievered</strong>):(<strong className="text-blue-600">Processing</strong>)}</p>
                            </div>
                            <Link to={`/order/${order._id}`} className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                              View Details
                            </Link>
            
                          </div>
                        ))
                    )
                }
           

              {/* Add more orders as needed */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

