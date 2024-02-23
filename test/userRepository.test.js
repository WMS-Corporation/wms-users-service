const {findUserByUsername, createUser} = require("../src/repositories/userRepository");
const {connectDB, disconnectDB, collections} = require("../src/config/dbConnection");
const {MongoClient} = require("mongodb");
const path = require("path");
const fs = require("fs");

const username = 'Pietro0096'
const expectedUser = {
    "CodUser": "000867",
    "Username": username,
    "Password": "$2b$10$StPwi72JFnkcPLkgGdJYDOvA.M5Jrj7HTlyj8L6PQaetOyk87/6lW",
    "Name": "Pietro",
    "Surname": "Lelli",
    "Type": "Operational"
};

describe('userRepository testing', () => {
    beforeAll(async () => {
        await connectDB()
    });

    it("should create a new user",async () =>{
        const result=await createUser(expectedUser)
        expect(result).toBeDefined()
    })

    it('should find a user by username', async () => {
        const user = await findUserByUsername(username);
        expect(user).toEqual(expect.objectContaining(expectedUser));
    });

    it('should return null if user is not found', async () => {
        const username = 'nonexistentuser';
        const user = await findUserByUsername(username);

        expect(user).toBeNull();
    });

});