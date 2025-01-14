import React, { useEffect, useState } from "react";
import { useLoginUserMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
export const Login = () => {
    const [userLogin,{isLoading}]=useLoginUserMutation();
    const {userInfo}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {search}=useLocation();
    const sp=new URLSearchParams(search);
    const redirect=sp.get("redirect") || "/";
    useEffect(()=>{
        if(userInfo){
          navigate(redirect)
        }  
    },[userInfo,redirect,navigate])

    const [user,setUser]=useState({
        email: '',
        password: ''
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUser({...user,[name]:value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        try {
          const res=await userLogin(user).unwrap();
          dispatch(setCredentials(res))
          navigate('/');
        } catch (error) {
          toast.error(error?.data?.message || error?.error);
        }
    
    
      
    
    }

  
  
    
  return (
    <form  onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          id="password"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
   
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>

      {isLoading && <h1>loading.....</h1>}
    </form>
  );
};
