import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/userApiSlice';
import { Loader } from '../../components';
import { toast } from 'react-toastify';


export const UserEditPage = () => {
  const { id } = useParams();
  
  // Fetch user details
  const { data: user, isLoading, error } = useGetUserDetailsQuery(id);
  const [updateUser,{isLoading:updateLoading}]=useUpdateUserMutation();
  const navigate=useNavigate();
  // Local state to manage form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Update state when user data is fetched
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);


  const handleSubmit=async (e)=>{
    e.preventDefault();

    try {
      await updateUser({name,email,isAdmin,id:user._id});
      navigate('/admin/userlist');
      toast.success("user updated");
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <h1>{error?.data?.message || error?.error}</h1>
  ) : (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit User</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter email"
            />
          </div>

          {/* Admin Field */}
          <div className="mb-4">
            <label htmlFor="admin" className="block text-gray-700 font-medium mb-2">
              Admin
            </label>
            <select
              id="admin"
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value === 'true')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {updateLoading && <Loader/>}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
            disabled={updateLoading}
              type="submit"
              className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
