import React from 'react';
import { Rating } from './Rating';
import {Link} from "react-router-dom";
export const ProductCard = ({product}) => {
  const { name, image, price, rating,description,numReviews} = product;
  const backendUrl = "http://localhost:8080";
  const imageUrl = `${backendUrl}${image}`;
  
  return (
    <div className="max-w-xs my-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 hover:scale-105">
      <div className="relative">
        <Link to={`/product-detail/${product._id}`}>
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={imageUrl}
            alt="Product"
          />
        </Link>
       
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Sale
        </span>
      </div>

      <div className="p-4">
      <Link to={`/product-detail/${product._id}`}>
        <h3 className="text-gray-800 text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
          {name}
        </h3>
      </Link>

      

        <p className="text-gray-600 text-sm mb-3">
          {description}
        </p>

        <div className="flex justify-between items-center mb-3">
          <div className="text-lg font-bold text-green-600">${price}</div>

          <div className="flex items-center">
            <div className="flex text-yellow-400">
                <Rating rating={rating}/>
            </div>
            <span className="ml-2 text-gray-500 text-sm">({numReviews})</span>
          </div>
        </div>

       
      </div>
    </div>
  );
};
