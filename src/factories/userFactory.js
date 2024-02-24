const {User} = require("../entities/user");

/**
 * Creates a user object from user data.
 *
 * This function creates a user object from the provided user data.
 *
 * @param {Object} userData - The user data to create the user object from.
 * @returns {User} The created user object.
 */
function createUserFromData(userData) {
    return new User(userData._codUser, userData._username, userData._password, userData._name, userData._surname, userData._type);
}

module.exports={createUserFromData}