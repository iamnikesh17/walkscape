import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateProductReviewMutation,
  useGetProductDetailQuery,
} from "../slices/productsApiSlice";
import { Loader, Meta, Rating } from "../components";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export const ProductDetail = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch product details based on the product id
  const { data, isLoading, error,refetch } = useGetProductDetailQuery(id);

  // Get the product from the response data
  const product = data?.product;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/");
  };

  const backendUrl = "http://localhost:8080";
  const imageUrl = `${backendUrl}${product?.image}`;

  const [createProductReview, { isLoading: loadingProductReview }] =
    useCreateProductReviewMutation();

  const submitHandler=async (e)=>{
    e.preventDefault();
    try {
      const res=await createProductReview({productId:id,rating,comment}).unwrap();
      refetch();
      toast.success(res.message);
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  }

  // Conditional rendering based on the API response state
  return (
    <div className="bg-gray-50 py-12 px-6">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <div>Error: {error?.data?.message || error.error}</div>
      ) : product ? (
        <>
        <Meta title={product.name}/>
          <div className="container mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={imageUrl}
                alt={product.name}
                className="rounded-xl shadow-xl object-cover w-full h-full transition-transform duration-500 transform hover:scale-105"
              />
            </div>

            {/* Product Information */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start space-y-6">
              <h1 className="text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                {product.name}
              </h1>

              {/* Rating and Category */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  <Rating rating={product.rating} />
                </div>
                <span className="text-gray-600 text-lg">Furniture</span>
              </div>

              {/* Price and Availability */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold text-blue-700">
                  ${product.price}
                </span>
                <span className="bg-green-100 text-green-700 text-sm py-1 px-4 rounded-full">
                  In Stock
                </span>
              </div>

              {/* Product Description */}
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Brand */}
              <p className="text-sm text-gray-500">
                <strong>Brand:</strong> {product.brand}
              </p>

              {/* Add to Cart Button */}

              <form class="max-w-sm">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  onChange={(e) => setQty(Number(e.target.value))}
                  value={qty}
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </form>

              <button
                onClick={addToCartHandler}
                className="mt-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 w-full lg:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {product.reviews.length === 0 ? (
            <h1 className="text-3xl text-red-500 my-4">No reviews</h1>
          ) : (
            <div className="w-1/2 mt-5">
              <h2 className="text-3xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <ul className="my-3">
                {/* Example review */}
                {product.reviews.map((review) => (
                  <li className="items-center gap-4 mb-4">
                    <div>
                      <strong>{review.name}</strong>
                      <span className="text-gray-600 text-sm">
                        {review.createdAt.substring(0, 10)}
                      </span>
                    </div>

                    <p className="text-gray-700">{review.comment}</p>
                    <Rating rating={review.rating} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={submitHandler} className="max-w-sm">
            <h2 className="text-3xl font-bold text-gray-900">Write a review</h2>
            <label
              for="countries"
              className="block my-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rating
            </label>
            <select
              id="countries"
              name="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Choose rating</option>
              <option value="1">very poor</option>
              <option value="2">poor</option>
              <option value="3">good</option>
              <option value="4">very good</option>
              <option value="5">Excellent</option>
            </select>

            <label
              for="message"
              className="block mb-2 my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <button
              type="submit"
              disabled={loadingProductReview}
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Submit
            </button>

            {
              loadingProductReview && <Loader/>
            }
          </form>
        </>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};
