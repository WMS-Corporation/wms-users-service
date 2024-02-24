const {findUserByUsername, createUser} = require("../src/repositories/userRepository");
const {connectDB, disconnectDB, collections} = require("../src/config/dbConnection");
const {User} = require("../src/entities/user");
const path = require("path");
const fs = require("fs");

describe('userRepository testing', () => {
    beforeAll(async () => {
        await connectDB()
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        collections.users.insertOne(userData)
    });

    it("should create a new user",async () =>{
        const result=await createUser(new User("000867","Pietro0096","$2b$10$StPwi72JFnkcPLkgGdJYDOvA.M5Jrj7HTlyj8L6PQaetOyk87/6lW","Pietro","Lelli","Operational"))
        expect(result).toBeDefined()
    })

    it('should find a user by username', async () => {
        const user = await findUserByUsername("Martin0075");
        expect(user._name).toEqual("Martin");
        expect(user._surname).toEqual("Marcolini");
    });

    it('should return null if user is not found', async () => {
        const username = 'nonexistentuser';
        const user = await findUserByUsername(username);

        expect(user).toBeNull();
    });

});