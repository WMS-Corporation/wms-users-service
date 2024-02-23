const {collections} = require("../config/dbConnection");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const findUserByUsername = async (username) => {
    try {
        console.log(username)
        return await collections?.users?.findOne({ Username: username });
    } catch (error) {
        console.error('Error finding user by username: ', error);
        throw error;
    }
};

const createUser=asyncHandler(async (user) => {
    const result = await collections?.users?.insertOne(user);
    if (result) {
        console.log('User created successfully');
        return result;
    } else {
        throw new Error('Failed to create user');
    }
});


module.exports={findUserByUsername, createUser}