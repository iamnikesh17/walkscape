const User = require("../../models/User");
const bcrypt=require("bcryptjs");
const appError = require("../../utils/appError");
const jwt=require("jsonwebtoken");
const generateToken = require("../../utils/generateToken");

const userRegister=async (req,res,next)=>{
    const { name, email, password } = req.body;
    try {
        const userExists=await User.findOne({email});
        if (userExists) {
            return next(appError("Email already exists", 400));
        }
        const newUser = await User.create({ name, email, password });

        generateToken(res,newUser._id);

        res.status(200).json({
            success:true,
            user:newUser
        })
    } catch (error) {
        next(appError(error.message,401))
    }
}



const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(appError("Invalid email", 401));
        }

        const hashPassword = await bcrypt.compare(password,user.password)
        if (!hashPassword) {
            return next(appError("Invalid password", 401));
        }

        const expiresIn=generateToken(res,user._id);
        res.status(200).json({
            user,
            expiresIn
        });
    } catch (error) {
        next(appError(error.message, 400));
    }
};


const userProfile=async (req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);
        if(!user){
            return next(appError("user not found",404))
        }

        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        next(appError(error.message,400))
    }
}

const updateUserProfile=async (req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);
        if(user){
            user.name=req.body.name || user.name;
            user.email=req.body.email || user.email;

            if(req.body.password){
                user.password=req.body.password;
            }

            const updatedUser=await user.save();

            res.status(200).json({
                success:true,
                user:updatedUser
            })
        }
        else{
            return next(appError("User not found",404))
        }
    } catch (error) {
        next(appError(error.message,400))
    }
}

// logout user
const userLogout=async (req,res,next)=>{
    try {
        res.cookie("jwt","",{
            expires:new Date(0),
            httpOnly:true,
            secure: process.env.NODE_ENV!=='development',
            sameSite: "strict"
        })

        res.status(200).json({
            success:true,
            msg:"Logged out successfully"
        })
    } catch (error) {
        next(appError(error.message,401))
    }
}


const getUsers=async (req,res,next)=>{
    try {
        const users=await User.find().select("-password");
        if(!users){
            return next(appError("No users found",404))
        }
        res.status(200).json(users);
    } catch (error) {
        next(appError(error.message))
    }
}

const getUserById=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id).select("-password");
        if(!user){
            return next(appError("User not found",404))
        }

        res.status(200).json(user);
    } catch (error) {
        next(appError(error.message))
    }
}

const deleteUser=async (req,res,next)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return next(appError("User not found",404))
        }
        res.status(200).json({
            message:"deleted successfully"
        })
    }catch(error){
            return next(appError(error.message))
        }
    }

    const updateUser=async (req,res,next)=>{
        try {
            const user=await User.findById(req.params.id);
            if(!user){
                return next(appError("User not found",404))
            }

            user.name=req.body.name || user.name;
            user.email=req.body.email || user.email;
            user.isAdmin=Boolean(req.body.isAdmin);

            const updatedUser=await user.save();

            res.status(200).json({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                isAdmin:updatedUser.isAdmin
            })

        } catch (error) {
            return next(appError(error.message))
            
        }
    }

module.exports = {
    userLogin,
    userProfile,
    userLogout,
    userRegister,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    };





