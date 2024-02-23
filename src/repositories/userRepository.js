const {collections} = require("../config/dbConnection");
const asyncHandler = require("express-async-handler");

/**
 * Finds a user by username.
 *
 * This function queries the database to find a user based on the provided username.
 *
 * @param {string} username - The username of the user to find.
 * @returns {Object|null} The user object if found, or null if not found.
 */
const findUserByUsername=asyncHandler(async (username) => {
    return await collections?.users?.findOne({ _username: username })
});

/**
 * Creates a new user.
 *
 * This function inserts a new user into the database.
 *
 * @param {Object} user - The user object to create.
 * @returns {Object} The result of the user creation operation.
 * @throws {Error} If failed to create user.
 */
const createUser=asyncHandler(async (user) => {
    const result = await collections?.users?.insertOne(user);
    if (result) {
        return result;
    } else {
        throw new Error('Failed to create user');
    }
});


module.exports={findUserByUsername, createUser}