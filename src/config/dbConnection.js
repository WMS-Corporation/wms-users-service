const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');


const collections={};
async function connectDB(){
    dotenv.config();
    try{
        const client = new MongoClient(process.env.DB_CONN_STRING);
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const usersCollection = db.collection(process.env.USER_COLLECTION);
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