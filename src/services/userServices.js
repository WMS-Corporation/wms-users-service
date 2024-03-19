
const bcrypt = require("bcryptjs");
const {createUserFromData} = require("../factories/userFactory");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {findUserByUsername, createUser, getUsers, findUserByCode, updateUserData, deleteUser, generateUniqueUserCode} = require("../repositories/userRepository");

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
const registerUser = asyncHandler(async(req, res) => {
    const user = createUserFromData(req.body);
    if (!user.username || !user.password || !user.name || !user.surname) {
        return res.status(401).json({ message: 'Invalid user data' })
    }

    const userExists = await findUserByUsername(user.username);
    if(!userExists){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        user.codUser = await generateUniqueUserCode()
        const resultInsert = await createUser(user)
        if(resultInsert){
            res.status(200).json({ message: 'Registration successful', user, token: generateToken(user.codUser)})
        }else{
            return res.status(401).json({ message: 'Invalid user data' })
        }
    }else{
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
const loginUser = asyncHandler(async(req, res) => {
    const {_username, _password} = req.body
    const userData = await findUserByUsername(_username)
    if(userData){
        const crypt = await bcrypt.compare(_password, userData._password)
        if(crypt){
            const user = createUserFromData(userData)
            return res.status(200).json({ message: 'Login successful', user, token: generateToken(user.codUser) })
        }else{
            return res.status(401).json({ message: 'Invalid email or password' })

        }
    }else{
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
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

/**
 * Retrieves user information.
 *
 * This function handles the retrieval of user information.
 * It returns the user data for the currently logged-in user.
 *
 * @param {Object} req - The request object containing the user session information.
 * @param {Object} res - The response object.
 * @returns {Object} The HTTP response with the user data in JSON format.
 */
const getMe = asyncHandler(async(req, res) => {
    return res.status(200).json(req.user)
})

/**
 * Retrieves all users.
 *
 * This function handles the retrieval of all users from the database.
 * It calls the getUsers function to fetch the user data.
 * If the retrieval is successful, it returns the user data with HTTP status code 200 (OK).
 * If the retrieval fails (e.g., invalid user data), it returns an error message with HTTP status code 401 (Unauthorized).
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The HTTP response containing either the user data or an error message in JSON format.
 */
const getAll = asyncHandler(async(req, res) => {
    const result = await getUsers()
    if(result){
        res.status(200).json(result)
    } else {
        res.status(401).json({message: 'Invalid user data'})
    }
})

/**
 * Retrieves user by user code.
 *
 * This function handles the retrieval of a user based on the provided user code.
 * It extracts the user code from the request parameters.
 * If the user code is provided, it calls the findUserByCode function to search for the user in the database.
 * If the user is found, it returns the user data with HTTP status code 200 (OK).
 * If the user is not found, it returns an error message with HTTP status code 401 (Unauthorized).
 * If the user code is invalid or missing, it returns an error message with HTTP status code 401 (Unauthorized).
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The HTTP response containing either the user data or an error message in JSON format.
 */
const getUserByCode = asyncHandler(async (req, res) => {
    const codUser = req.params.codUser
    if(codUser){
        const user = await findUserByCode(codUser)
        if(user){
            res.status(200).json(user)
        } else{
            res.status(401).json({message: 'User not found'})
        }
    }else{
       res.status(401).json({message:'Invalid user data'})
    }
})

/**
 * Updates user data based on user code.
 * This function updates a user's data using the provided user code.
 * It extracts the user code from the request parameters.
 * If a valid user code is provided, it retrieves the user data using the findUserByCode function.
 * Upon finding the user, it hashes the new password using bcrypt.
 * Subsequently, it updates the user data in the database and returns the updated user data with an HTTP status code of 200 (OK).
 * If the user is not found, it returns an error message with an HTTP status code of 401 (Unauthorized).
 * In case of an invalid or missing user code, it returns an error message with an HTTP status code of 401 (Unauthorized).
 @param {Object} req - The request object containing user data.
 @param {Object} res - The response object used to send the response.
 @returns {Object} The HTTP response containing either the updated user data or an error message in JSON format.
 */
const updateUserDataByCode = asyncHandler(async (req, res) => {
    const codUser = req.params.codUser
    if(codUser){
        const user = await findUserByCode(codUser)
        if(user){
            const newData = req.body
            if(Object.prototype.hasOwnProperty.call(req.body, '_password')){
                const salt = await bcrypt.genSalt(10)
                newData._password = await bcrypt.hash(newData._password, salt)
            }
            const filter = { _codUser: codUser }
            const update = { $set: newData }
            const updatedUser = await updateUserData(filter, update)
            res.status(200).json(updatedUser)
        } else{
            res.status(401).json({message: 'User not found'})
        }
    }else{
        res.status(401).json({message:'Invalid user data'})
    }
})

/**
 * Deletes user by user code.
 *
 * This function deletes a user based on the provided user code.
 * It extracts the user code from the request parameters.
 * If the user code is provided, it retrieves the user data using findUserByCode function.
 * If the user is found, it deletes the user from the database and returns the deleted user code with HTTP status code 200 (OK).
 * If the user is not found, it returns an error message with HTTP status code 401 (Unauthorized).
 * If the user code is invalid or missing, it returns an error message with HTTP status code 401 (Unauthorized).
 *
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object used to send the response.
 * @returns {Object} The HTTP response containing either the deleted user code or an error message in JSON format.
 */
const deleteUserByCode = asyncHandler(async (req, res) => {
    const codUser = req.params.codUser
    if(codUser){
        const user = await findUserByCode(codUser)
        if(user){
            const userCode = user._codUser
            await deleteUser(userCode)
            res.status(200).json(userCode)
        } else{
            res.status(401).json({message: 'User not found'})
        }
    }else{
        res.status(401).json({message:'Invalid user data'})
    }
})

module.exports = {loginUser,
    generateToken,
    registerUser,
    getMe,
    getAll,
    getUserByCode,
    updateUserDataByCode,
    deleteUserByCode}