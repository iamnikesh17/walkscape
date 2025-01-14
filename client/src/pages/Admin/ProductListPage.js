import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDeleteProductMutation, useGetProductsQuery } from '../../slices/productsApiSlice'
import { Loader, Pagination } from '../../components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const ProductListPage = () => {
    const {pageNumber}=useParams();
    const {data,isLoading,error,refetch}=useGetProductsQuery({pageNumber});
    const products=data?.products;
    console.log(products)

  
    const [deleteProduct,{isLoading:deleteLoading}]=useDeleteProductMutation();


    const deleteHandler=async (id)=>{
      try {
        await deleteProduct(id);
        toast.success("Product Deleted");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }


  return isLoading?<Loader/>:error?<h1 className='text-red-500'>{error?.data?.message || error?.error}</h1>: (
    <>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Products</h1>
            <p className='text-gray-600 dark:text-gray-400 mt-1'>Browse our collection of products</p>
          </div>
          <Link to="/admin/products/create" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Create</Link>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Product Id</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Brand</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>

            { deleteLoading && <Loader/>}

            <tbody>

            {
                products.length===0?(
                    <h1 className='text-center text-6xl'>No Products</h1>
                ):(
                    products.map((product,index)=>(
                        <tr key={product._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-700`}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product._id}
                        </th>
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">{product.price}</td>
                        <td className="px-6 py-4">{product.brand}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <Link to={`/admin/products/${product._id}/edit`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <FaEdit/>
                          </Link>

                            <FaTrash onClick={()=>deleteHandler(product._id)} className='cursor-pointer text-red-500'/>
                        
                        </td>
                      </tr>
                    ))
                )
            }                    

              {/* Table Rows */}
            
            </tbody>
          </table>

          <Pagination page={data.page} pages={data.pages} isAdmin={true}/>
        </div>
      </div>
    </>
  )
}
