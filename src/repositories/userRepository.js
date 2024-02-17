const {collections} = require("../config/dbConnection");


const findUserByUsername = async (username) => {
    try {
        return await collections?.users?.findOne({ Username: username });
    } catch (error) {
        console.error('Error finding user by username: ', error);
        throw error;
    }
};


module.exports={findUserByUsername}