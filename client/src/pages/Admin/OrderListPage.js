import React from 'react'
import { Link } from 'react-router-dom'
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice'
import { Loader } from '../../components';
import { FaTimes } from 'react-icons/fa';

export const OrderListPage = () => {
    const {data:orders,isLoading,error}=useGetAllOrdersQuery();
    return isLoading?<Loader/>:error?(<h1 className="text-red-500">{error?.data?.message || error?.error}</h1>): (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className='text-4xl font-semibold py-10'>Orders</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Order Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Paid
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delivered
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length ===0?(
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center">
                                    No orders found.
                                </td>
                            </tr>
                        ):(
                            orders.map((order,index)=>(
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order._id}
                                </th>
                                <td className="px-6 py-4">
                                    {order.user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {order.createdAt.substring(0,10)}
                                </td>
                                <td className="px-6 py-4">
                                    ${order.totalPrice}
                                </td>
                                <td className="px-6 py-4">
                                    {order.isPaid?(order.paidAt.substring(0,10)):(<FaTimes style={{color:'red'}}/>)}
                                </td>

                                <td className="px-6 py-4">
                                    {order.isDelivered?(order.deliveredAt.substring(0,10)):(<FaTimes style={{color:'red'}}/>)}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/order/${order._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</Link>
                                </td>
                            </tr>
                            ))
                        )
                    }

                  
                  
                </tbody>
            </table>
        </div>

    )
}
