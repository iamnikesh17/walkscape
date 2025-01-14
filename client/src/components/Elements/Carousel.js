import React, { useState } from 'react'
import { useGetTopRatedProductsQuery } from '../../slices/productsApiSlice'
import { Loader } from './Loader'

export const Carousel = () => {
  const { data: products, isLoading, error } = useGetTopRatedProductsQuery()
  
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1)
  }

  const backendUrl = "http://localhost:8080";

  return isLoading ? (
    <Loader />
  ) : error ? (
    <h1 className="text-center text-red-500">{error?.data?.message || error?.error}</h1>
  ) : (
    <div id="default-carousel" className="relative w-full">
      {/* Carousel wrapper with increased height */}
      <div className="relative h-96 overflow-hidden rounded-lg md:h-[500px]">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'block' : 'hidden'
            }`}
            data-carousel-item
          >
            <div className="relative w-full h-full">
              <img
                src={`${backendUrl}${product.image}`}
                alt={product.name}
                className="absolute block w-full h-full object-cover top-0 left-0 rounded-lg transition-transform duration-700 ease-in-out"
              />
              {/* Light Overlay for subtle elegance */}
              <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex justify-center bottom-5 left-1/2 transform -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {products.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              currentIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-400 hover:bg-blue-500'
            }`}
            aria-current={currentIndex === index ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 left-5 z-30 flex items-center justify-center p-2 bg-white bg-opacity-40 rounded-full shadow-md opacity-70 hover:bg-opacity-60 transform -translate-y-1/2 transition-all duration-300"
        onClick={handlePrev}
      >
        <svg
          className="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <button
        type="button"
        className="absolute top-1/2 right-5 z-30 flex items-center justify-center p-2 bg-white bg-opacity-40 rounded-full shadow-md opacity-70 hover:bg-opacity-60 transform -translate-y-1/2 transition-all duration-300"
        onClick={handleNext}
      >
        <svg
          className="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  )
}
