const {MongoClient}  = require("mongodb")
const collections = {}
async function connect(){
    const  client = new MongoClient(process.env.CONN_STR)
    await client.connect();
    const productsCollection=client.db("shop").collection( "products");
    collections.products = productsCollection;
}


module.exports = {
    collections,
    connect,
}