const {request, response, json} = require('express');
const express = require("express")
const app = express()
const port = 5555
const { connect, client } = require("./connect/connectDB");
const {router} = require("./routes/productsRouter")
const bodyParser = require('body-parser')
connect().then(() => {
    console.info("connected to db");
        app.use(bodyParser.json())
        app.use("/products",router)
        app.listen(port, () => {
            console.log(`http://0.0.0.0:`, port)

        })
    }

).catch(e => console.error(e))

module.exports ={app}