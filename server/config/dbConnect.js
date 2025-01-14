const mongoose=require("mongoose");
const dbConnect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected succesfully")
    } catch (error) {
        console.log("db connection unsuccessful")
    }
}

module.exports=dbConnect


 