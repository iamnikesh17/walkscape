const notFound= (req,res,next)=>{
    const error=new Error(`Not Found -${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler=(err,req,res,next)=>{
    let status=err.status || "error";
    let message=err.message;
    let statusCode=err.statusCode || 500;
    let stack=err.stack

    if(err.name==="CastError" && err.kind==="ObjectId"){
        message="Resource not Found";
        statusCode=404;
    }

    res.status(statusCode).json({
        status,
        message,
        stack

    })
}


module.exports={
    notFound,
    errorHandler
}



