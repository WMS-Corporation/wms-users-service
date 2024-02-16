const {verifyToken} = require("../src/routes/authMiddleware");
const jwt=require("jsonwebtoken");
const {collections, connectDB} = require("../src/config/dbConnection");
const {MongoClient} = require("mongodb");
const {User} = require("../src/entities/user");

const mockReq = {
    headers: {},
    user: {}
};
const mockRes = {
    status: jest.fn().mockReturnThis(),// Mock method to simulate HTTP response status
    json: jest.fn()// Mock method to send JSON response
};
const mockNext = jest.fn();

describe("verifyToken middleware", ()=>{
    beforeAll(async () => {
        await connectDB();
        let user= await collections.users.findOne();

        console.log(user.CodUser);
    });

    it("should return 401 if token is not provided", async()=>{
        await verifyToken (mockReq,mockRes,mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({message: "Token not provided"})
    })

    it("should return 401 if token is invalid", async()=>{
        mockReq.headers={ authorization: "invalid_token" }
        await verifyToken (mockReq,mockRes,mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({message: "Invalid token"})
    })

    it("should call next if token is valid", async()=>{
        const token = jwt.sign({ codUser: "000897" }, process.env.JWT_SECRET);
        mockReq.headers={ authorization: token };
        await verifyToken (mockReq,mockRes,mockNext);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(mockReq.user.Name).toEqual("Martin");
        expect(mockNext).toHaveBeenCalled();
    })

})