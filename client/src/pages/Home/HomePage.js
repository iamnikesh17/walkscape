import React from "react";
import { Carousel, Meta, Pagination, ProductCard } from "../../components";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useParams } from "react-router-dom";

export const HomePage = () => {
  const {pageNumber,keyword}=useParams();

  const { data, isLoading, error } = useGetProductsQuery({keyword,pageNumber}); // "data" contains the whole response
  const products = data?.products; // Access the "products" array from the response
  console.log(products); // Now this should correctly log the array of products
  

  return (
    <div>
      {isLoading ? (
        <h1>loading....</h1>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
        <Meta title="proshop-v1"/>
        {!keyword && <Carousel /> }
          <h1 className="text-4xl text-center p-3">Latest Products</h1>

          <div className="flex flex-col md:flex-row justify-around items-center flex-wrap">
            {products?.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div>No products available</div> // Fallback if no products exist
            )}
          </div>

          <Pagination page={data.page} pages={data.pages} />
        </>
      )}
    </div>
  );
};
