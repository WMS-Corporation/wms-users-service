const { MongoClient } = require('mongodb');
const { connectDB, collections } = require('../src/config/dbConnection');
const path = require('path');

describe('Database Connection', () => {
    let connection;
    let db;
    let usersCollection;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_CONN_STRING);
        db = connection.db(process.env.DB_NAME);
        
        await db.createCollection(process.env.USER_COLLECTION);
        
        usersCollection = db.collection(process.env.USER_COLLECTION);

        const jsonFilePath = path.resolve(__dirname, '../Resources/MongoDB/User.json');
        const userData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        await usersCollection.insertOne(userData);
    });

    it('should connect to the database and collection', async () => {
        await connectDB();

        expect(db.databaseName).toBe("WMS");
        expect(collections.users).toBeDefined();
        expect(collections.users.collectionName).toBe(usersCollection.collectionName);

    });

});
