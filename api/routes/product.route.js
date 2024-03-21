import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { addProduct,getProducts } from '../controllers/product.controller.js'


const router = express.Router()

router.post("/add",verifyUser,addProduct)
router.get("/getproducts", getProducts);


export default router