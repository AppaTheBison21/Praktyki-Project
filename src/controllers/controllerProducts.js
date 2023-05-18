const  {request, response} = require('express');
const {collections} =  require("../connect/connectDB")
const {ObjectId} = require("mongodb");

const controllerProducts ={
    findAll: async (req, res,next) => {
        try {
            const products = (await collections.products.find({}).toArray())

            res.status(200).send(products);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    findById: async (req, res,next) => {
        const id = req.params._id
        try {
            const products = await collections.products.findOne({_id: new ObjectId(id)})
            if (products) {
                res.status(200).send(products);
            }
        }catch (error){
            res.status(404).send(`Unable to find product with id: ${req.params._id}`)
        }

    },
    addNewBook:async(req, res,next)=> {
        try {
            const newProduct = req.body;
            console.log("Body ", newProduct)
            const result = await collections.products.insertOne(newProduct);

            res.status(201).send(`Successfully created a new product with id ${result.insertedId}`)
        }catch (error){
            console.error(error);
            res.status(400).send(error.message);
        }

    },
    update:async(req, res,next)=>{
        const id = req.params._id
        try {
            const updatedProduct = req.body;
            const tf = {_id: new ObjectId(id)};
            const result = await collections.products.updateOne(tf, {$set: updatedProduct});
            res.status(201).send(`Successfully created a new product with id ${result.upsertedId}`)
        }catch (error){
            console.error(error.message)
            res.status(500).send(error.message)
        }

    },
    deleteById:async(req, res,next)=> {
        const id = req.params._id
        try {
            const query = {_id: new ObjectId(id)};
            const result = await collections.products.deleteOne(query);

            if (result && result.deletedCount) {
                res.status(202).send(`Successfully removed product with id ${id}`);
            } else if (!result) {
                res.status(400).send(`Failed to remove product with id ${id}`);
            } else if (!result.deletedCount) {
                res.status(404).send(`Product with id ${id} does not exist`);
            }
        } catch (error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
}
module.exports = {
    controllerProducts
}