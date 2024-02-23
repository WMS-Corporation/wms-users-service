
const bcrypt = require("bcryptjs");
const {createUserFromData} = require("../factories/userFactory");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {findUserByUsername, createUser} = require("../repositories/userRepository");


/**
 * Registers a new user.
 *
 * This function handles the registration process for a new user.
 * It checks if the provided user data is valid and not already exists in the system.
 * If the user is successfully registered, it returns a success message along with a token for authentication.
 * If the user data is invalid or already exists, it returns an error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const registerUser=asyncHandler(async(req,res) =>{
    const user=createUserFromData(req.body);

    if (!user.codUser || !user.username || !user.password || !user.name || !user.surname) {
        console.log("Invalid user data")
        return res.status(401).json({ message: 'Invalid user data' })
    }

    const userExists = await findUserByUsername(user.username);
    if(!userExists){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password=hashedPassword;
        const resultInsert=await createUser(user)
        if(resultInsert){
            console.log("create user")
            res.status(200).json({ message: 'Registration successful', user, token: generateToken(user.codUser)})
        }
        else{
            return res.status(401).json({ message: 'Invalid user data' })
        }
    }else{
        console.log("User already exists")
        return res.status(401).json({ message: 'User already exists' })
    }
})

/**
 * Logs in a user.
 *
 * This function handles the login process for a user.
 * It checks if the provided username exists in the system and if the password matches.
 * If the login is successful, it returns a success message along with a token for authentication.
 * If the username or password is invalid, it returns an error message.
 *
 * @param {Object} req - The request object containing the username and password.
 * @param {Object} res - The response object.
 */
const loginUser= asyncHandler(async(req, res) =>{
    const {Username, Password}=req.body
    const userData= await findUserByUsername(Username)
    if(userData){
        const crypt = await bcrypt.compare(Password, userData._password)
        if(crypt){
            const user= createUserFromData(userData)
            console.log("Login successful")
            return res.status(200).json({ message: 'Login successful', user, token: generateToken(user.codUser) })
        }else{
            console.log("Invalid email or password")
            return res.status(401).json({ message: 'Invalid email or password' })

        }
    }
    else{
        console.log("Invalid email or password")
        return res.status(401).json({ message: 'Invalid email or password' })
    }
})

/**
 * Generates a JWT token for authentication.
 *
 * This function generates a JSON Web Token (JWT) for authentication purposes.
 * It signs the token with the provided user ID and a secret key, and sets an expiration time of 30 days.
 *
 * @param {string} id - The user ID to include in the token.
 * @returns {string} The generated JWT token.
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports={loginUser, generateToken,registerUser}