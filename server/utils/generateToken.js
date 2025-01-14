
const jwt=require("jsonwebtoken")
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, "anykey", { expiresIn: '2d' });
    const expiresIn = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        maxAge: expiresIn, // cookie expiration time
    });

    // Return expiration time to be saved in localStorage
    return expiresIn;
};

module.exports=generateToken;