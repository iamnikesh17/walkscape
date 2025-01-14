
const Order = require("../../models/Order");
const appError = require("../../utils/appError")


// create new order
const addOrderItems=async (req,res,next)=>{
    try {
        const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;

        if(orderItems && orderItems.length===0){
            return next(appError("No order items",400))
        }

        const order=new Order({
            orderItems:orderItems.map((x)=>({...x,product:x._id,_id:undefined})),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const orderCreated=await order.save();

        res.status(201).json(orderCreated);
    } catch (error) {
        next(appError(error.message))
    }
}

// get my orders

const myOrders=async (req,res,next)=>{
    try {
        const orders=await Order.find({user:req.user._id});
        res.status(200).json(orders);
    } catch (error) {
        next(appError(error.message))
    }
}


// get order by Id

const getOrderById=async (req,res,next)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user","name email");
        if(order){
            res.status(200).json(order);
        }
        else{
            return next(appError("Order not found",404))
        }
    } catch (error) {
        next(appError(error.message))
        
    }
}

const getAllOrders=async (req,res,next)=>{
    try {
        const orders=await Order.find().populate("user","name email");
        res.status(200).json(orders);
    } catch (error) {
        next(appError(error.message))
    }
}

const updateToDelivered=async (req,res,next)=>{
    try {
        const order=await Order.findById(req.params.id);
        if(order){
            order.isDelivered=true;
            order.deliveredAt=Date.now();
            const updatedOrder=await order.save();

            res.status(200).json(updatedOrder);
        }
    } catch (error) {
        next(appError(error.message))
    }
}

module.exports={
    addOrderItems,
    myOrders,
    getOrderById,
    getAllOrders,
    updateToDelivered,
 
}

