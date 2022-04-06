const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// const secret = process.env.JWT_SECRET || 'E9R8VYWNE98RYVN89W7RY4838'
const tokeen = process.env.JWT_SECRET || 'DJCN3W8URC823O7RYBCW3I7YRC23'

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const { token } = req.cookies;
    
    if(!token){
        return next(new ErrorHandler('Please login to acces this resource ' , 401 ))
    }
    
    const decodedData = jwt.verify(token , tokeen);
    
    req.user = await User.findById(decodedData.id);
    console.log(token);
    next();
});

exports.authorizeRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                
                new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource` ,
                 403)
                );
            }
            next();
        }
        
    }