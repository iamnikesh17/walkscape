const mongoose=require("mongoose");
const dotenv=require("dotenv");
const products=require("./data/products");
const users=require("./data/users");
const dbConnect=require("./config/dbConnect");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
dotenv.config();

dbConnect();


const importData=async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers=await User.insertMany(users);
        const adminUser=createdUsers[0]._id;
        
        const sampleProducts=products.map((product)=>{
            return {...product,user:adminUser}
        });

        await Product.insertMany(sampleProducts);
        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

const destroyData=async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}



if(process.env[2]==="-d"){
    destroyData();
}
else
{
    importData();
}