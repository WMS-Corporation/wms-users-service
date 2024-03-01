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
const findUserByUsername = asyncHandler(async (username) => {
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
const createUser = asyncHandler(async (user) => {
    const result = await collections?.users?.insertOne(user);
    if (result) {
        return result;
    } else {
        throw new Error('Failed to create user');
    }
});

/**
 * Retrieves all users.
 *
 * This function handles the retrieval of all users from the database.
 *
 * @returns {Array|null} An array containing user data if retrieval is successful, otherwise null.
 */
const getUsers = asyncHandler(async () => {
    const result = await collections?.users?.find().toArray();
    return result
})

/**
 * Finds a user by user code.
 *
 * This function handles the retrieval of a user based on the provided user code.
 *
 * @param {string} codUser - The user code to search for.
 * @returns {Object|null} The user data if found, otherwise null.
 */
const findUserByCode = asyncHandler(async (codUser) => {
    return await collections?.users?.findOne({ _codUser: codUser })
});

/**
 * Updates user data based on a filter.
 *
 * This function updates user data based on the provided filter criteria and the update object.
 *
 * @param {Object} filter - The filter criteria to find the user(s) to update.
 * @param {Object} update - The update object containing the fields to update and their new values.
 * @returns {Object|null} The updated user data if the user is found, otherwise null.
 */
const updateUserData = asyncHandler(async(filter, update) => {
    const options = { returnOriginal: false}
    await collections?.users?.findOneAndUpdate(filter, update, options)
    return await collections?.users?.findOne(filter)
})

/**
 * Deletes a user based on user code.
 *
 * This function deletes a user based on the provided user code.
 *
 * @param {string} codUser - The user code of the user to be deleted.
 * @returns {Object} The result of the deletion operation.
 */
const deleteUser = asyncHandler(async (codUser) => {
    return await collections?.users?.deleteOne({_codUser: codUser})
})

module.exports = {findUserByUsername,
    createUser,
    getUsers,
    findUserByCode,
    updateUserData,
    deleteUser}