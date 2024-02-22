const dotenv = require('dotenv');
const {loginUser} = require("../src/services/userServices");
const {connectDB, disconnectDB} = require("../src/config/dbConnection");
const {MongoClient} = require("mongodb");
const path = require("path");
const fs = require("fs");

dotenv.config();
const password=process.env.PASSWORD_USER_TEST;
//const password='bella';

// const mockRes = {
//     status: jest.fn(() => mockRes),
//     json: jest.fn()
// };
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('loginUser services testing', () => {

    // beforeEach(async () => {
    //     await connectDB();
    // });

    // let connection;
    // let db;
    // let usersCollection;


    beforeAll(async () => {
        await connectDB();
        let connection = await MongoClient.connect(process.env.DB_CONN_STRING);
        let db = connection.db(process.env.DB_NAME);

        let usersCollection = db.collection(process.env.USER_COLLECTION);

        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        await usersCollection.insertOne(userData);
    });

    // afterEach(async () => {
    //     jest.clearAllMocks();
    //     console.log("clear");
    //     //await disconnectDB();
    // })

    it('should return 200 and user data if login is successful', async () => {
        const res=mockResponse()
        const mockReq = {
            body: {
                username: 'Martin0075',
                password: password
            }
        };


        await loginUser(mockReq, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', user: expect.any(Object) });
    });

    it('should return 401 if login credentials are invalid', async () => {
        const res=mockResponse()
        const mockReq = {
            body: {
                username: 'Martin0077',
                password: password
            }
        };

        await loginUser(mockReq, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

});