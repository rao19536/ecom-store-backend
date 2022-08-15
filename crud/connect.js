const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'Ecommerce-store'
async function dbConnect() {
    await client.connect()
    console.log('backend Wrokeing fine')
    return client.db(dbName)
}

module.exports = dbConnect;

//   dbConnect()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());