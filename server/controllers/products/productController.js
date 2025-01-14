const Product = require("../../models/Product");
const appError = require("../../utils/appError");


const getAllProducts=async (req,res,next)=>{
    try {
        const pageSize=8;
        const page=Number(req.query.pageNumber) || 1;

        const keyword=req.query.keyword ? {
            name:{
                $regex:req.query.keyword,
                $options:"i"
            }
        }:{};


        const count=await Product.countDocuments({...keyword});
        const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
        console.log(products);
        console.log(page);
        console.log(req.query.page)
        res.status(200).json({
            success:true,
            products,
            page,
            pages:Math.ceil(count/pageSize)
        })
        
    } catch (error) {
        // res.status(500).json({msg:error.message})
        next(appError(error.message,400))
    }
}




const getSingleProduct=async (req,res,next)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(!product) return res.status(404).json({msg:"Product not found"})
        res.status(200).json({
            success:true,
            product
        })
        
    } catch (error) {
        next(appError("resource not found",404))
    }
}

// create new product

const createProduct=async (req,res,next)=>{
    try {
        const {name,price,description,countInStock,brand,image}=req.body;
     

        const newProduct=await Product.create({
            user:req.user._id, // get logged in user id from req.user
            name,
            price,
            description,
            countInStock,
            image,
            brand,
        })

        res.status(201).json(newProduct)
    } catch (error) {
        next(appError(error.message,400))
    }
}


const updateProduct=async (req,res,next)=>{
    console.log(req.params.id)

    try {
        const {name,price,description,countInStock,brand,image}=req.body;

        const product=await Product.findById(req.params.id);
        if(product){
            product.name=name;
            product.price=price;
            product.description=description;
            product.countInStock=countInStock;
            product.brand=brand;
            product.image=image;

            const updatedProduct=await product.save();
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        next(appError(error.message))
    }
}

const deleteProduct=async (req,res,next)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(product){
            await Product.deleteOne({_id:product._id})
            res.status(200).json({message:"Product deleted successfully"})
        }
        else{
            return next(appError("Product not found",404))
        }
    } catch (error) {
        next(appError(error.message));
    }
}

const createProductReview=async (req,res,next)=>{
    try {
     
        const {comment,rating}=req.body;
    
        const product =await Product.findById(req.params.id);
        if(product){
            const alreadyReviewed=product.reviews.find(r=>r.user.toString()===req.user._id.toString());
            if(alreadyReviewed){
                return next(appError("product already reviewed"));
            }

            const review={
                user:req.user._id,
                comment,
                rating,
                name:req.user.name
            }

        
            product.reviews.push(review);
            console.log(product.reviews);
            product.numReviews=product.reviews.length;
            product.rating=product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.reviews.length;

        
            await product.save();

            res.status(201).json({message:"review added"})
        }
        else{
            return next(appError("Product not found",404))
        }

    } catch (error) {
        next(appError(error.message));
    }
}

const getTopProucts=async (req,res,next)=>{
    try {
        const products=await Product.find({}).sort({rating:-1}).limit(3);
        res.status(200).json(products)
    } catch (error) {
        next(appError(error.message))
    }
 
}



module.exports={
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProucts,
 
}