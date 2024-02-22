const {verifyToken} = require("../src/routes/authMiddleware");
const jwt=require("jsonwebtoken");
const {connectDB, collections} = require("../src/config/dbConnection");
const {MongoClient} = require("mongodb");
const path = require("path");
const fs = require("fs");

const mockRes = {
    status: jest.fn().mockReturnThis(),// Mock method to simulate HTTP response status
    json: jest.fn()// Mock method to send JSON response
};

describe("verifyToken middleware", ()=>{
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


    it("should return 401 if token is not provided", async()=>{
        const mockReq = {
            headers: {},
            user: null
        };
        const mockNext = jest.fn();
        await verifyToken (mockReq,mockRes,mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({message: "Token not provided"})
    })

    it("should return 401 if token is invalid", async()=>{
        const mockReq = {
            headers: {},
            user: null
        };
        const mockNext = jest.fn();
        mockReq.headers={ authorization: "invalid_token" }
        await verifyToken (mockReq,mockRes,mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({message: "Invalid token"})
    })

    it("should call next if token is valid", async()=>{
        const mockReq = {
            headers: {},
            user: null
        };
        const token = jwt.sign({ codUser: "000897" }, process.env.JWT_SECRET);
        mockReq.headers={ authorization: token };
        await verifyToken (mockReq,mockRes,()=>{
            expect(mockReq.user.Name).toEqual("Martin");
        });
    })

})