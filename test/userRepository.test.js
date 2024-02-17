const {findUserByUsername} = require("../src/repositories/userRepository");
const {connectDB} = require("../src/config/dbConnection");

describe('userRepository testing', () => {
    beforeAll(async () => {
        await connectDB();
    });

    it('should find a user by username', async () => {
        const username = 'Martin0075';
        const expectedUser = {
            "CodUser": "000897",
            "Username": "Martin0075",
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