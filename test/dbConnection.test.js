const { MongoClient } = require('mongodb');
const { connectDB, collections } = require('../src/config/dbConnection');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();
describe('Database Connection', () => {
    let connection;
    let db;
    let usersCollection;


    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_CONN_STRING);
        db = connection.db(process.env.DB_NAME);
        
        usersCollection = db.collection(process.env.USER_COLLECTION);

        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        await usersCollection.insertOne(userData);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should connect to the database and collection', async () => {
        await connectDB();
        console.log("Num doc: ", await collections?.users?.countDocuments())
        expect(db.databaseName).toBe("WMS");
        expect(collections.users).toBeDefined();
        expect(collections.users.collectionName).toBe(usersCollection.collectionName);

    });

});
