const { User } = require('../src/entities/user');
const path = require("path");
const fs = require("fs");
const {createUserFromData} = require("../src/factories/userFactory");
describe('User testing', () => {
    let user;

    beforeAll(() => {
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json')
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))
        user = createUserFromData(userData[0])
    });

    it('should return the correct codUser', () => {
        expect(user.codUser).toBe('000897');
    });

    it('should return the correct username', () => {
        expect(user.username).toBe('Martin0075');
    });

    it('should return the correct password', () => {
        expect(user.password).toBe('$2y$10$mrpe.j2q/FaYrm9FBI/DfuFZMqiXRdLPkK0jHBFkJKAms2BVZwF12');
    });

    it('should return the correct name', () => {
        expect(user.name).toBe('Martin');
    });

    it('should return the correct surname', () => {
        expect(user.surname).toBe('Marcolini');
    });

    it('should return the correct type', () => {
        expect(user.type).toBe('Admin');
    });

    it('should set codUser correctly', () => {
        user.codUser = '000678';
        expect(user.codUser).toBe('000678');
    });

    it('should set username correctly', () => {
        user.username = 'Jane0098';
        expect(user.username).toBe('Jane0098');
    });

    it('should set password correctly', () => {
        const newPassword = 'newpassword123';
        user.password = newPassword;
        expect(user.password).toBe(newPassword);
    });

    it('should set name correctly', () => {
        user.name = 'Jane';
        expect(user.name).toBe('Jane');
    });

    it('should set surname correctly', () => {
        user.surname = 'Smith';
        expect(user.surname).toBe('Smith');
    });

    it('should set type correctly', () => {
        user.type = 'operational';
        expect(user.type).toBe('operational');
    });
});