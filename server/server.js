const path=require("path");
const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const cookieParser=require('cookie-parser');
const dbConnect = require("./config/dbConnect");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
dotenv.config();

dbConnect();

const app=express();
// middlewares


app.use(cors({
    origin: "http://localhost:10000", // Frontend's URL
    credentials: true // This allows sending and receiving cookies
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



// routes
app.use("/api/v1/products",productRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/orders",orderRoutes);
app.use('/api/v1/uploads',uploadRoutes)



app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
else{
    app.get('/',(req,res)=>{
        res.send('API is running...');
    });
}


// global error handler
app.use(notFound);
app.use(errorHandler);





// listen to the port  
const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is up and ruuning on port ${PORT}`);
})

// 2ULnSBHte8b54WWM

// mongodb+srv://neekeshsunam10:2ULnSBHte8b54WWM@proshop-v1.yyj4h.mongodb.net/proshop-v1?retryWrites=true&w=majority&appName=proshop-v1

// mongodb+srv://neekeshsunam10:2ULnSBHte8b54WWM@proshop-v1.yyj4h.mongodb.net/


