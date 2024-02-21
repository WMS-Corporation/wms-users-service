const {verifyToken} = require("../src/routes/authMiddleware");
const jwt=require("jsonwebtoken");
const {connectDB} = require("../src/config/dbConnection");



describe("verifyToken middleware", ()=>{
    beforeAll(async () => {
        await connectDB();
    });


    it("should return 401 if token is not provided", async()=>{
        const mockReq = {
            headers: {},
            user: null
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),// Mock method to simulate HTTP response status
            json: jest.fn()// Mock method to send JSON response
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
        const mockRes = {
            status: jest.fn().mockReturnThis(),// Mock method to simulate HTTP response status
            json: jest.fn()// Mock method to send JSON response
        };
        const mockNext = jest.fn();
        mockReq.headers={ authorization: "invalid_token" }
        await verifyToken (mockReq,mockRes,mockNext)
        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({message: "Invalid token"})
    })

    // it("should call next if token is valid", async()=>{
    //     const mockReq = {
    //         headers: {},
    //         user: null
    //     };
    //     const mockRes = {
    //         status: jest.fn().mockReturnThis(),// Mock method to simulate HTTP response status
    //         json: jest.fn()// Mock method to send JSON response
    //     };
    //     const mockNext = jest.fn();
    //     const token = jwt.sign({ codUser: "000897" }, process.env.JWT_SECRET);
    //     mockReq.headers={ authorization: token };
    //     await verifyToken (mockReq,mockRes,()=>{
    //         expect(mockReq.user.Name).toEqual("Martin");
    //     });
    //
    //
    //
    // })

})