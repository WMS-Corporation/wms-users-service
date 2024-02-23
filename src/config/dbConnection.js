const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const collections={};
let client = null;

/**
 * Connects to the database.
 *
 * This function establishes a connection to the MongoDB database using the connection string
 * specified in the environment variables. It initializes the MongoDB client, connects to the
 * database, and sets up the users collection for further database operations.
 */
async function connectDB() {
    try {
        client = new MongoClient(process.env.DB_CONN_STRING);
        await client.connect();
        // Non chiamare disconnectDB() qui, a meno che tu non abbia un motivo specifico per farlo
        const db = client.db(process.env.DB_NAME);
        const usersCollection = db.collection(process.env.USER_COLLECTION);
        collections.users = usersCollection;
        //console.log(await collections.users.findOne({Username: "Martin0075"}))
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
    } catch (error) {
        console.error('Error during the connection to db: ', error);
    }
}

/**
 * Disconnects from the database.
 *
 * This function closes the connection to the MongoDB database.
 * If the client is not connected, it logs a message indicating that it's not connected.
 */
async function disconnectDB() {
    try {
        if (client !== null) {
            await client.close();
            console.log('Disconnected from the database');
        } else {
            console.log('Not connected to the database');
        }
    } catch (error) {
        console.error('Error during disconnection from the database: ', error);
    }
}

module.exports = {
    connectDB,
    disconnectDB,
    collections
};