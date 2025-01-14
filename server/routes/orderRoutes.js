const express=require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { addOrderItems, myOrders, getOrderById, getAllOrders, updateToDelivered } = require("../controllers/orders/orderController");

const orderRoutes=express.Router();

orderRoutes.post("/",protect,addOrderItems);
orderRoutes.get("/my-orders",protect,myOrders);
orderRoutes.get("/:id",protect,getOrderById);
orderRoutes.get("/",protect,admin,getAllOrders);
orderRoutes.put("/:id/deliver",protect,admin,updateToDelivered);

module.exports=orderRoutes;