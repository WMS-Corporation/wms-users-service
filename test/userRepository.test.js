const {findUserByUsername, createUser, getUsers, findUserByCode, updateUserData, deleteUser} = require("../src/repositories/userRepository")
const {connectDB, collections, closeDB} = require("../src/config/dbConnection")
const {User} = require("../src/entities/user")
const path = require("path")
const fs = require("fs")

describe('userRepository testing', () => {
    beforeAll(async () => {
        await connectDB(process.env.DB_NAME_TEST_REPOSITORY);
    });

    beforeEach(async() => {
        await collections.users.deleteMany()
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        await collections.users.insertMany(userData)
    })
    afterAll(async () => {
        await closecome posso intitolare un commit che DB()
    });

    it("should create a new user", async () => {
        const result = await createUser(new User("Pietro0096", "$2b$10$StPwi72JFnkcPLkgGdJYDOvA.M5Jrj7HTlyj8L6PQaetOyk87/6lW", "Pietro", "Lelli", "Operational", "000867"))
        expect(result).toBeDefined()
    })

    it('should find a user by username', async () => {
        const user = await findUserByUsername("Martin0075")
        expect(user._name).toEqual("Martin")
        expect(user._surname).toEqual("Marcolini")
    });

    it('should return null if user is not found', async () => {
        const username = 'nonexistentuser'
        const user = await findUserByUsername(username)

        expect(user).toBeNull()
    });

    it('should return all the users', async() => {
        const result = await getUsers()
        expect(result.length).toEqual(await collections.users.countDocuments())
    })

    it('should return a user by userCode', async() => {
        const userCode = "000897"
        const user = await findUserByCode(userCode)
        expect(user._name).toEqual("Martin")
        expect(user._surname).toEqual("Marcolini")
    })

    it('should return null if there is no user with the specified user code', async () => {
        const userCode = '000965'
        const user = await findUserByCode(userCode)

        expect(user).toBeNull()
    });

    it('should return an updated user with new username', async() => {
        const filter = { _codUser: "000897" }
        const update = { $set: { _username: "Mutto97" } }

        const updatedUser = await updateUserData(filter, update)
        expect(updatedUser._username).toEqual("Mutto97")
    })

    it('should return null if the filter is not correct', async() => {
        const filter = { _codUser: "" }
        const update = { $set: { _username: "Mutto97" } }

        const updatedUser = await updateUserData(filter, update)
        expect(updatedUser).toBeNull()
    })

    it('should return null if the user has been deleted', async() => {
        const userCode = '000965'
        await deleteUser(userCode)
        const deletedUser = await findUserByCode(userCode)

        expect(deletedUser).toBeNull()
    })

});