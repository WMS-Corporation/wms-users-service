
const {loginUser} = require("../src/services/userServices");
const {connectDB} = require("../src/config/dbConnection");

const mockReq = {
    body: {
        username: 'Martin0075',
        password: 'bella'
    }
};
const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn()
};

describe('loginUser services testing', () => {

    beforeAll(async () => {
        await connectDB();
    });

    it('should return 200 and user data if login is successful', async () => {
        await loginUser(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Login successful', user: expect.any(Object) });
    });

    it('should return 401 if login credentials are invalid', async () => {
        mockReq.body={ username: 'Martin0077', password: 'Bella'}

        await loginUser(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

});