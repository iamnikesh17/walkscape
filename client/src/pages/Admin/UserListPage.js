import React from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../../components';
import { FaEdit, FaTrash ,FaTimes,FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/userApiSlice';

export const UserListPage = () => {
   
    const {data:users,isLoading,error,refetch}=useGetUsersQuery();
    const [deleteUser,{isLoading:deleteLoading}]=useDeleteUserMutation();


    const deleteHandler=async (id)=>{
        try {
            await deleteUser(id);
            toast.success("User Deleted")
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
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Users</h1>
          </div>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">User Id</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Admin</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>


            <tbody>

            {
                users.length===0?(
                    <h1 className='text-center text-6xl'>No Users</h1>
                ):(
                    users.map((user,index)=>(
                        <tr key={user._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-700`}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user._id}
                        </th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.isAdmin?<FaCheck style={{color:"green"}}/>:<FaTimes style={{color:"red"}}/>}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <Link to={`/admin/users/${user._id}/edit`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <FaEdit/>
                          </Link>

                            <FaTrash onClick={()=>deleteHandler(user._id)}  className='cursor-pointer text-red-500'/>
                        
                        </td>
                      </tr>
                    ))
                )
            }                    

              {
                deleteLoading && <Loader/>
              }
              {/* Table Rows */}
            
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
