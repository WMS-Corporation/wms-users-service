const dotenv = require('dotenv')
const {loginUser, registerUser, getAll, getUserByCode, updateUserDataByCode, deleteUserByCode} = require("../src/services/userServices")
const {connectDB, collections, closeDB} = require("../src/config/dbConnection")
const path = require("path")
const fs = require("fs")

dotenv.config()
const password = process.env.PASSWORD_USER_TEST
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
};
const req = {
    body : "",
    user : "",
    params: ""
}

describe('User services testing', () => {

    beforeAll(async () => {
        await connectDB(process.env.DB_NAME_TEST_SERVICES);
        await collections.counter.deleteMany()
        await collections.counter.insertOne({count : 1})
    });

    beforeEach(async() => {
        await collections.users.deleteMany()
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        await collections.users.insertMany(userData)
        req.body = ""
        req.user = ""
        req.params = ""
    })

    afterAll(async () => {
        await closeDB()
    });

    it('it should return 401 if the data are invalid', async () => {
        const res = mockResponse()
        const username = 'Michele0096'
        const req = {
            body: {
                _username: username,
                _password: "",
                _name: "",
                _surname: "",
                _type: ""
            }
        };

        await registerUser(req, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user data'})
    });

    it('it should return 200 if registration is successful', async () => {
        const res = mockResponse()
        const username = 'Michele0096'
        const req = {
            body: {
                _username: username,
                _password: password,
                _name: "Michele",
                _surname: "Laddaga",
                _type: "Operational"
            }
        };

        await registerUser(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
    });

    it('it should return 401 if the user already exists', async () => {
        const res = mockResponse()
        const username = 'Martin0075'
        const req = {
            body: {
                _username: username,
                _password: password,
                _name: "Michele",
                _surname: "Laddaga",
                _type: "Operational"
            }
        };

        await registerUser(req, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'User already exists'})
    });

    it('it should return 200 if login is successful', async () => {
        const res = mockResponse()
        const req = {
            body: {
                _username: 'Martin0075',
                _password: password
            }
        };
        await loginUser(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    });

    it('it should return 401 if login credentials are invalid', async () => {
        const res = mockResponse()
        const req = {
            body: {
                _username: 'Martin0077',
                _password: password
            }
        };

        await loginUser(req, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' })
    });

    it('it should return 200 and all users that are stored', async() => {
        const res = mockResponse()
        const req = {
            body: {}
        };

        await getAll(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 200 and the user with the userCode specified', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000897"
            }
        };

        await getUserByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if the userCode is wrong', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000877"
            }
        };

        await getUserByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "User not found"})
    })

    it('it should return 401 if the userCode is not specified', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: ""
            }
        };
        await getUserByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid user data"})
    })

    it('it should return 200 and the user updated with a new password', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000897"
            },
            body:{
                _password: process.env.NEW_PASSWORD_USER_TEST
            }
        };

        await updateUserDataByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if updating user password with not exists user code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000877"
            }, body:{
                _password: process.env.NEW_PASSWORD_USER_TEST
            }
        };

        await updateUserDataByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "User not found"})
    })

    it('it should return 401 if updating user password without specified user code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: ""
            }, body:{
                _password: process.env.NEW_PASSWORD_USER_TEST
            }
        };
        await updateUserDataByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid user data"})
    })

    it('it should return 200 and the user updated with a new username', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000897"
            },
            body:{
                _username: "Mutto98"
            }
        };

        await updateUserDataByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if updating username without correct user code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000877"
            }, body:{
                _username: "Mutto98"
            }
        };

        await updateUserDataByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "User not found"})
    })

    it('it should return 401 if updating username without specified the user code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: ""
            }, body:{
                _username: "Mutto98"
            }
        };
        await updateUserDataByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid user data"})
    })

    it('it should return 200 and the code of the user that has been deleted', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000897"
            }
        };

        await deleteUserByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if deleting user without correct user code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: "000877"
            }
        };

        await deleteUserByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "User not found"})
    })

    it('it should return 401 if deleting user without specified the user code', async () => {
        const res = mockResponse()
        const req = {
            params: {
                codUser: ""
            }
        };
        await deleteUserByCode(req, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid user data"})
    })

});