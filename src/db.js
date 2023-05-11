const {MongoClient} = require("mongodb");
const  client = new MongoClient(process.env.CONN_STR)



async function connect(){
    await client.connect();
}

module.exports = {
    connect,
    client
}