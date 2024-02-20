const {findUserByUsername} = require("../src/repositories/userRepository");
const {connectDB, disconnectDB} = require("../src/config/dbConnection");

describe('userRepository testing', () => {
    beforeAll(async () => {
        await connectDB();
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