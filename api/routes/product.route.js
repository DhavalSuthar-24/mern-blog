import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { addProduct,getProducts } from '../controllers/product.controller.js'
import { Product } from '../models/product.model.js'
import { Order } from '../models/order.model.js'

const router = express.Router()

router.post("/add",verifyUser,addProduct)
router.get("/getproducts", getProducts);
router.post('/payment', verifyUser, async (req, res) => {
    try {
      const order = req.body.order;
  
      // Ensure that the user is authenticated before processing the payment
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Decrease product quantity
      const product = await Product.findById(order.productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      product.quantity -= order.quantity;
      await product.save();
  
      // Create order record (if needed) and update its status, etc.
  
      // Process payment with Stripe
  
      res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Payment failed' });
    }
  });
  