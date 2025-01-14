import { createSlice } from "@reduxjs/toolkit";

const initialState=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):{cartItems:[],itemsPrice:0,taxPrice:0,totalPrice:0,shippingAddress:{},paymentMethod:"PayPal"};
export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            const existingItem=state.cartItems.find(x=>x._id===item._id);
            if(existingItem){
                state.cartItems=state.cartItems.map((x)=>x._id===existingItem._id?item:x)
            }
            else{
                state.cartItems=[...state.cartItems,item]
            }

            // calculate the item price

            state.itemsPrice=state.cartItems.reduce((acc,item)=>{
                return acc+item.price*item.qty
            },0)

            state.shippingPrice=state.itemsPrice > 100?0:10;
            state.taxPrice=state.itemsPrice*0.1;

            state.totalPrice=state.itemsPrice+state.shippingPrice+state.taxPrice;

            localStorage.setItem("cart",JSON.stringify(state));
        },
        removeCartItem:(state,action)=>{
            const item=action.payload;
            state.cartItems=state.cartItems.filter((x)=>x._id!==item._id);
            // calculate the item price

            state.itemsPrice=state.cartItems.reduce((acc,item)=>{
                return acc+item.price*item.qty
            },0)

            state.shippingPrice=state.itemsPrice > 100?0:10;
            state.taxPrice=state.itemsPrice*0.1;

            state.totalPrice=state.itemsPrice+state.shippingPrice+state.taxPrice;

            localStorage.setItem("cart",JSON.stringify(state));
        },
        saveShippingAddress:(state,action)=>{
            state.shippingAddress=action.payload;

            state.itemsPrice=state.cartItems.reduce((acc,item)=>{
                return acc+item.price*item.qty
            },0)

            state.shippingPrice=state.itemsPrice > 100?0:10;
            state.taxPrice=state.itemsPrice*0.1;

            state.totalPrice=state.itemsPrice+state.shippingPrice+state.taxPrice;

            localStorage.setItem("cart",JSON.stringify(state));
        },
        savePaymentMethod:(state,action)=>{
            state.paymentMethod=action.payload;
            state.itemsPrice=state.cartItems.reduce((acc,item)=>{
                return acc+item.price*item.qty
            },0)

            state.shippingPrice=state.itemsPrice > 100?0:10;
            state.taxPrice=state.itemsPrice*0.1;

            state.totalPrice=state.itemsPrice+state.shippingPrice+state.taxPrice;

            localStorage.setItem("cart",JSON.stringify(state));
        },
        clearCart:(state,action)=>{
            state.cartItems=[];
            state.itemsPrice=0;
            state.taxPrice=0;
            state.totalPrice=0;
            state.shippingAddress={};
            state.paymentMethod="PayPal";
            localStorage.removeItem("cart");
        }
    }
});

export const {addToCart,removeCartItem,saveShippingAddress,savePaymentMethod,clearCart}=cartSlice.actions;

export const cartReducer=cartSlice.reducer






