const {findUserByUsername, createUser} = require("../src/repositories/userRepository");
const {connectDB, disconnectDB, collections} = require("../src/config/dbConnection");
const {MongoClient} = require("mongodb");
const path = require("path");
const fs = require("fs");
const {User} = require("../src/entities/user");

const username = 'Pietro0096'
const expectedUser = {
    "_codUser": "000867",
    "_username": username,
    "_password": "$2b$10$StPwi72JFnkcPLkgGdJYDOvA.M5Jrj7HTlyj8L6PQaetOyk87/6lW",
    "_name": "Pietro",
    "_surname": "Lelli",
    "_type": "Operational"
};

describe('userRepository testing', () => {
    beforeAll(async () => {
        await connectDB()
    });

    it("should create a new user",async () =>{
        const result=await createUser(new User("000867",username,"$2b$10$StPwi72JFnkcPLkgGdJYDOvA.M5Jrj7HTlyj8L6PQaetOyk87/6lW","Pietro","Lelli","Operational"))
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