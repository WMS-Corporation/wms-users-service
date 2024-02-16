const jwt=require("jsonwebtoken");
const {collections} = require("../config/dbConnection");
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');

/**
 * Middleware for JWT token verification.
 * This middleware verifies the presence and validity of the JWT token in the Authorization header of HTTP requests.
 * If the token is valid, the token payload is decoded and stored in the req (request) object of Express,
 * making it available for use in subsequent route handlers.
 * If the token is not present or not valid, an authentication error (401 Unauthorized) is returned.
 *
 * @param {Object} req - Express request (req) object
 * @param {Object} res - Express response (res) object
 * @param {Function} next - Next middleware function in the route handling chain
 */
dotenv.config()
const verifyToken= asyncHandler(async(req, res, next) =>{
    const token=req.headers.authorization;

    if(!token){
        return res.status(401).json({message: "Token not provided"});
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Invalid token"});
        }
        req.user = await collections?.users?.findOne({CodUser: decoded.codUser});
        console.log(req.user?.Name)
        next();
    })
} )

module.exports={verifyToken};