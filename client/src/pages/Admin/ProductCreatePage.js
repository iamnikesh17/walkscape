import React, { useState } from "react";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";

export const ProductCreatePage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const navigate = useNavigate();
  const [createProduct, { isLoading: createProductLoading, error }] =useCreateProductMutation();
  
  const [uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation();

  const Product = {
    name,
    price,
    image,
    description,
    countInStock,
    brand,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle product creation logic here
    try {
      const result = await createProduct({ ...Product });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product created succesfully");
        navigate("/admin/productslist");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const result = await uploadProductImage(formData).unwrap();
      toast.success(result.message);
      setImage(result.image)
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return createProductLoading ? (
    <Loader />
  ) : error ? (
    <h1 className="text-red-300">{error?.data?.message || error?.error}</h1>
  ) : (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Create New Product
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              htmlFor="image"
            >
              setImage
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product image url"
            />

            <input
              type="file"
              onChange={uploadFileHandler}
              className="w-full px-4 py-2 my-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
            />

            {
              loadingUpload && <Loader />
            }
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          {/* Count in Stock */}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              htmlFor="countInStock"
            >
              Count in Stock
            </label>
            <input
              type="number"
              id="countInStock"
              name="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter stock count"
              required
            />
          </div>

          {/* Brand */}
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product brand"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createProductLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};
