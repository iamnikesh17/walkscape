import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";


const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(order)=>({
                url:ORDER_URL,
                method: "POST",
                body:{...order},
                credentials:"include"
            })
        }),
        getOrderDetails:builder.query({
            query:(orderId)=>({
                url:`${ORDER_URL}/${orderId}`,
                method: "GET",
                credentials:"include"
            })
        }),
        getMyOrders:builder.query({
            query:()=>({
                url:`${ORDER_URL}/my-orders`,
                method: "GET",
                credentials:"include"
            }),
            keepUnusedDataFor:5
        }),
        getAllOrders:builder.query({
            query:()=>({
                url:`${ORDER_URL}`,
                method: "GET",
                credentials:"include"
            }),
            keepUnusedDataFor:5
        }),
        updateOrderDelivered:builder.mutation({
            query:(orderId)=>({
                url:`${ORDER_URL}/${orderId}/deliver`,
                method:"PUT",
                credentials:"include"
            })
        })
    })
})

export const { useCreateOrderMutation,useGetOrderDetailsQuery,useGetMyOrdersQuery,useGetAllOrdersQuery,useUpdateOrderDeliveredMutation }=ordersApiSlice;