import express from "express";
import Stripe from "stripe";
import { Order } from "../models/order.model.js"; // Import the Order model
import { Product } from "../models/product.model.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();
const stripe = new Stripe('sk_test_51OySR3SH9ySesKUUn99kqLkKB5FFsLGufFhCl9ZjHbThbDjFrSwLt6y4hjqk6rQ8eM4wVMk45RcObiCf2qiRRTdZ00qQic1COz');

router.post("/create-payment-intent",verifyUser, async (req, res) => {
    const { amount, items, customerEmail } = req.body;
  
    try {
      // Create a payment intent with the provided amount, currency, and items
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr', // Set currency to Indian Rupees (INR)
        description: 'Random Description ' + Math.floor(Math.random() * 1000), // Add a random description
        metadata: {
          // Add metadata to track the purchase, like items or order ID
          items,
          customerEmail,
        },
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  }
  );

  router.post("/payment-success",verifyUser, async (req, res) => {
    try {
      const orderData = req.body.order; // Assuming you receive the order details in the request body
  
      // Create a new order record in the Order model
      const newOrder = new Order({
        userId: orderData.userId,
        productId: orderData.productId,
        quantity: orderData.quantity,
        totalPrice: orderData.totalPrice,
        paymentStatus: 'completed', // Assuming the payment status is marked as completed
        // Add more fields as needed, such as shipping address, payment method, etc.
      });
  
      // Save the new order to the database
      await newOrder.save();
  
      // Update the product quantity in the Product model
      const product = await Product.findById(orderData.productId);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      product.quantity -= orderData.quantity;
      await product.save();
  
      res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Failed to place order' });
    }
  });
  
  export default router;