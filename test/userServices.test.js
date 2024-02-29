const dotenv = require('dotenv')
const {loginUser, registerUser, getAll, getUserByCode, updateUserPasswordByCode, updateUsernameByCode} = require("../src/services/userServices")
const {connectDB, disconnectDB, collections, db} = require("../src/config/dbConnection")
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

describe('User services testing', () => {

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        await connectDB(process.env.DB_NAME_TEST)
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json')
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))
        collections.users.insertOne(userData)
    });

    afterAll(async () =>{
        process.env.NODE_ENV = 'production';
    })

    it('should return 401 if the data are invalid', async () => {
        const res=mockResponse()
        const username = 'Michele0096'
        const mockReq = {
            body: {
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

    it('should return 200 if registration is successful', async () => {
        const res=mockResponse()
        const username = 'Michele0096'
        const mockReq = {
            body: {
                _username: username,
                _password: password,
                _name: "Michele",
                _surname: "Laddaga",
                _type: "Operational"
            }
        };

        await registerUser(mockReq, res)

        expect(res.status).toHaveBeenCalledWith(200)
    });

    it('should return 401 if the user already exists', async () => {
        const res=mockResponse()
        const username = 'Martin0075'
        const mockReq = {
            body: {
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

    it('should return 200 if login is successful', async () => {
        const res=mockResponse()
        const mockReq = {
            body: {
                _username: 'Martin0075',
                _password: password
            }
        };
        await loginUser(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(200)
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

    it('it should return 200 and all users that are stored', async() =>{
        const res=mockResponse()
        const mockReq = {
            body: {}
        };

        await getAll(mockReq, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 200 and the user with the userCode specified', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: "000897"
            }
        };

        await getUserByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if the userCode is wrong', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: "000877"
            }
        };

        await getUserByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "User not found"})
    })

    it('it should return 401 if the userCode is not specified', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: ""
            }
        };
        await getUserByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid user data"})
    })

    it('it should return 200 and the user updated with a new password', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: "000897"
            },
            body:{
                password: process.env.NEW_PASSWORD_USER_TEST
            }
        };

        await updateUserPasswordByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if updating user password with not exists user code', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: "000877"
            },body:{
                password: process.env.NEW_PASSWORD_USER_TEST
            }
        };

        await updateUserPasswordByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "User not found"})
    })

    it('it should return 401 if updating user password without specified user code', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: ""
            },body:{
                password: process.env.NEW_PASSWORD_USER_TEST
            }
        };
        await updateUserPasswordByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid user data"})
    })

    it('it should return 200 and the user updated with a new username', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: "000897"
            },
            body:{
                username: "Mutto98"
            }
        };

        await updateUsernameByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).not.toBeNull()
    })

    it('it should return 401 if updating username without correct user code', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: "000877"
            },body:{
                username: "Mutto98"
            }
        };

        await updateUsernameByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "User not found"})
    })

    it('it should return 401 if updating username without specified the user code', async ()=>{
        const res=mockResponse()
        const mockReq = {
            params: {
                codUser: ""
            },body:{
                username: "Mutto98"
            }
        };
        await updateUsernameByCode(mockReq, res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({message: "Invalid user data"})
    })

});