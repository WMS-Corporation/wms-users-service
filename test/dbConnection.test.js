const { MongoClient } = require('mongodb');
const { connectDB, collections, closeDB} = require('../src/config/dbConnection');
const dotenv = require('dotenv');
const {describe, it, expect, beforeAll, afterAll} = require('@jest/globals')
dotenv.config();
describe('Database Connection', () => {
    let connection;
    let db;
    let usersCollection;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_CONN_STRING);
        db = connection.db(process.env.DB_NAME);
        usersCollection = db.collection(process.env.USER_COLLECTION);
    });

    afterAll(async () => {
        await connection.close();
        await closeDB()
    });

    it('should connect to the database and collection', async () => {
        await connectDB(process.env.DB_NAME);
        expect(db.databaseName).toBe("WMS");
        expect(collections.users).toBeDefined();
        expect(collections.users.collectionName).toBe(usersCollection.collectionName);

    });

});
