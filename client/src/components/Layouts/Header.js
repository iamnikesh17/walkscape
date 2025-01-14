import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiUser, FiKey } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownLoggedOut } from '../Others/DropdownLoggedOut';
import { DropdownLoggedIn } from '../Others/DropdownLoggedIn';
import { Link, useLocation } from 'react-router-dom';
import { checkTokenExpiry } from '../../slices/authSlice';
import { Search } from '../Elements/Search';

export const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location=useLocation();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsAdminDropdownOpen(false);
  };

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    dispatch(checkTokenExpiry());
  }, [dispatch]);



  useEffect(()=>{
    setIsDropdownOpen(false);
    setIsAdminDropdownOpen(false);
  },[location])

  return (
    <header className="bg-white shadow-md py-4 px-6 lg:px-12">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">BrandLogo</Link>
        </div>

        {/* Search bar expanding large area */}
        <div className="flex-grow px-6">
          <Search />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <Link to="/cart" className="relative cursor-pointer">
            <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition duration-300" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0}
            </span>
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative cursor-pointer">
            <FiUser
              className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition duration-300"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (userInfo ? <DropdownLoggedIn /> : <DropdownLoggedOut />)}
          </div>

          {/* Admin Icon with Dropdown */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative cursor-pointer">
              <FiKey
                className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition duration-300"
                onClick={toggleAdminDropdown}
              />
              {isAdminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  <Link to="/admin/orderlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  <Link to="/admin/userlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Users
                  </Link>
                  <Link to="/admin/productslist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Products
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
