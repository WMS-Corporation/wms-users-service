const {User} = require("../entities/user");

function createUserFromData(userData) {
    return new User(userData.CodUser, userData.Username, userData.Password, userData.Name, userData.Surname, userData.Type);
}

module.exports={createUserFromData}