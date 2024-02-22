const {findUserByUsername} = require("../src/repositories/userRepository");
const {connectDB, disconnectDB, collections} = require("../src/config/dbConnection");
const {MongoClient} = require("mongodb");
const path = require("path");
const fs = require("fs");

describe('userRepository testing', () => {
    beforeAll(async () => {
        let connection = await MongoClient.connect(process.env.DB_CONN_STRING);
        let db = connection.db(process.env.DB_NAME);

        let usersCollection = db.collection(process.env.USER_COLLECTION);

        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        await usersCollection.insertOne(userData);
        collections.users=usersCollection;
        //connectDB();
    });
    // afterAll(async () => {
    //     // Closing the DB connection allows Jest to exit successfully.
    //     await disconnectDB();
    // });

    it('should find a user by username', async () => {
        const username = 'Martin0075';
        const expectedUser = {
            "CodUser": "000897",
            "Username": username,
            "Password": "$2y$10$mrpe.j2q/FaYrm9FBI/DfuFZMqiXRdLPkK0jHBFkJKAms2BVZwF12",
            "Name": "Martin",
            "Surname": "Marcolini",
            "Type": "Admin"
        };
        const user = await findUserByUsername(username);

        expect(user).toEqual(expect.objectContaining(expectedUser));
    });

    it('should return null if user is not found', async () => {
        const username = 'nonexistentuser';
        const user = await findUserByUsername(username);

        expect(user).toBeNull();
    });

});