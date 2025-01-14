const express=require("express");

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, createProductReview, getTopProucts } = require("../controllers/products/productController");
const { protect,admin } = require("../middleware/authMiddleware");

const productRoutes=express.Router();

productRoutes.get("/",getAllProducts)
productRoutes.get("/top",getTopProucts);
productRoutes.post("/",protect,admin,createProduct)
productRoutes.post("/:id/reviews",protect,createProductReview);
productRoutes.get("/:id",getSingleProduct);
productRoutes.put("/update/:id",protect,admin,updateProduct);
productRoutes.delete("/:id",protect,admin,deleteProduct);
module.exports=productRoutes;

