import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const userApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser:builder.mutation({
            query: (credentials) => ({
                url: USER_URL+"/login",
                method: "POST",
                body: credentials,
                credentials:"include"
            }),

        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method: "POST",
                credentials:"include"
            })
        }),
        registerUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/register`,
                method: "POST",
                body:data,
                credentials:"include"
            }),
        }),
        updateprofile:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/profile`,
                method: "PUT",
                body:data,
                credentials:"include"
            })
        }),
        
        getUsers:builder.query({
            query:()=>({
                url:USER_URL,
                method: "GET",
                credentials:"include"
            }),
            keepUnusedDataFor:5
        }),

        deleteUser:builder.mutation({
            query:(userId)=>({
                url:`${USER_URL}/${userId}`,
                method: "DELETE",
                credentials:"include"
            })
        }),

        getUserDetails:builder.query({
            query:(userId)=>({
                url:`${USER_URL}/${userId}`,
                method: "GET",
                credentials:"include"
            }),
            providesTags:['Users'],
            keepUnusedDataFor:5
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/${data.id}`,
                method: "PUT",
                body:data,
                credentials:"include"
            })
        })
    }),
})

export const { useLoginUserMutation,useLogoutUserMutation,useRegisterUserMutation,useUpdateprofileMutation,useGetUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation }=userApiSlice;

