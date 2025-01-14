import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
export const DropdownLoggedIn = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate(); 

    const {userInfo}=useSelector((state)=>state.auth);

    const [logoutUser]=useLogoutUserMutation();
    
    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());

            navigate("/login");
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    }
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <ul>
        <li>
          <Link
            to="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            {userInfo.name}
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            onClick={logoutHandler}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>  )
}
