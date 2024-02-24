const dotenv = require('dotenv')
const {loginUser, registerUser} = require("../src/services/userServices")
const {connectDB, disconnectDB, collections} = require("../src/config/dbConnection")
const {MongoClient} = require("mongodb")
const path = require("path")
const fs = require("fs")

dotenv.config()
const password=process.env.PASSWORD_USER_TEST
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
};

describe('loginUser services testing', () => {

    beforeAll(async () => {
        await connectDB()
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json')
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))
        collections.users.insertOne(userData)
    });

    it('should return 401 if the data are invalid', async () => {
        const res=mockResponse()
        const username = 'Michele0096'
        const mockReq = {
            body: {
                _codUser: "000866",
                _username: username,
                _password: "",
                _name: "",
                _surname: "",
                _type: ""
            }
        };

        await registerUser(mockReq, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user data'})
    });

    it('should return 200 and user data if registration is successful', async () => {
        const res=mockResponse()
        const username = 'Michele0096'
        const mockReq = {
            body: {
                _codUser: "000866",
                _username: username,
                _password: password,
                _name: "Michele",
                _surname: "Laddaga",
                _type: "Operational"
            }
        };

        await registerUser(mockReq, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'Registration successful', user: expect.any(Object), token:expect.any(String) })
    });

    it('should return 401 if the user already exists', async () => {
        const res=mockResponse()
        const username = 'Martin0075'
        const mockReq = {
            body: {
                _codUser: "000897",
                _username: username,
                _password: password,
                _name: "Michele",
                _surname: "Laddaga",
                _type: "Operational"
            }
        };

        await registerUser(mockReq, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'User already exists'})
    });

    it('should return 200 and user data if login is successful', async () => {
        const res=mockResponse()
        const mockReq = {
            body: {
                _username: 'Martin0075',
                _password: password
            }
        };
        await loginUser(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', user: expect.any(Object), token:expect.any(String) })
    });

    it('should return 401 if login credentials are invalid', async () => {
        const res=mockResponse()
        const mockReq = {
            body: {
                _username: 'Martin0077',
                _password: password
            }
        };

        await loginUser(mockReq, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' })
    });

});