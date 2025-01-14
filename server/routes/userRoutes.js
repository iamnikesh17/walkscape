const express=require("express");
const { userLogin, userProfile, userLogout, userRegister, updateUserProfile, getUsers, updateUser, getUserById, deleteUser} = require("../controllers/users/userController");
const { protect,admin } = require("../middleware/authMiddleware");

const userRoutes=express.Router();


userRoutes.post("/login",userLogin);
userRoutes.get("/profile",protect,userProfile);
userRoutes.post("/logout",protect,userLogout);
userRoutes.post("/register",userRegister);
userRoutes.put("/profile",protect,updateUserProfile);

userRoutes.get("/",protect,admin,getUsers);
userRoutes.put("/:id",protect,admin,updateUser);
userRoutes.get("/:id",protect,admin,getUserById);
userRoutes.delete("/:id",protect,admin,deleteUser);
module.exports=userRoutes;