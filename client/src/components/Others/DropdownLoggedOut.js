import React from "react";
import { Link } from "react-router-dom";
export const DropdownLoggedOut = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <ul>
        <li>
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
