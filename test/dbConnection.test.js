const { MongoClient } = require('mongodb');
const { connectDB, collections } = require('../src/config/dbConnection');

describe('Database Connection', () => {
    let connection;
    let db;
    let usersCollection;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://127.0.0.1:27017');
        db = connection.db('WMS');
        usersCollection = db.collection('User');
    });

    it('should connect to the database and collection', async () => {
        await connectDB();

        expect(db.databaseName).toBe("WMS");
        expect(collections.users).toBeDefined();
        expect(collections.users.collectionName).toBe(usersCollection.collectionName);

    });

});
