const {verifyToken} = require("../src/routes/authMiddleware");
const jwt=require("jsonwebtoken");
const {connectDB, collections} = require("../src/config/dbConnection");
const {MongoClient} = require("mongodb");
const path = require("path");
const fs = require("fs");
const {generateToken} = require("../src/services/userServices");

const mockRes = {
    status: jest.fn().mockReturnThis(),// Mock method to simulate HTTP response status
    json: jest.fn()// Mock method to send JSON response
};

describe("verifyToken middleware", ()=>{
    beforeAll(async () => {
        await connectDB(process.env.DB_NAME_TEST);

        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        collections.users.insertOne(userData)
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
        const token=generateToken("000899")
        mockReq.headers={ authorization: `Bearer ${token}` }
        await verifyToken (mockReq,mockRes,mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({message: "Invalid token"})
    })

    it("should call next if token is valid", async()=>{
        const mockReq = {
            headers: {},
            user: null
        };
        //const token = jwt.sign({ codUser: "000897" }, process.env.JWT_SECRET);
        const token=generateToken("000897")
        mockReq.headers={ authorization: `Bearer ${token}` };
        await verifyToken (mockReq,mockRes,()=>{
            expect(mockReq.user._name).toEqual("Martin");
        });
    })

})