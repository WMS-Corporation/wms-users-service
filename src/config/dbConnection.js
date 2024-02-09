const MongoClient = require('mongodb').MongoClient;

const collections={};
async function connectDB(){
    try{
        const client = new MongoClient('mongodb://127.0.0.1:27017');
        await client.connect();
        const db = client.db('WMS');
        const usersCollection = db.collection('User');
        collections.users= usersCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
    }catch (error) {
        console.error('Error during the connection to db: ', error)
    }
}

module.exports = {
    connectDB,
    collections
};