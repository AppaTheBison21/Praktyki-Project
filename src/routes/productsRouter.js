const express = require("express")
const {controllerProducts} = require("../controllers/controllerProducts")

const router = express.Router()
router.use(express.json())

router.get("/", controllerProducts.findAll)
router.get("/:_id",controllerProducts.findById)
router.post("/",controllerProducts.addNewBook)
router.put("/:_id",controllerProducts.update)
router.delete("/:_id",controllerProducts.deleteById)

module.exports = {
    router,
}
