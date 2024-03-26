import { errorHandler } from "../utils/error.js";
import { Product } from "../models/product.model.js";

export const addProduct = async (req, res, next) => {
    try {
        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return next(errorHandler(400, "You are not an admin"));
        }

        // Check if all required fields are provided
        const { title, content, image,image1,image2,price } = req.body;
        if (!title || !content || !image) {
            return next(errorHandler(400, "All fields are required"));
        }

        // Generate slug from the title
        const slug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');

        // Create a new product instance
        const newProduct = new Product({
            title,
            content,
            image,
            image1,
            image2,
            slug,
            price,
            userId: req.user._id // Assuming userId is provided in the request body or session
        });

        // Save the new product to the database
        const product = await newProduct.save();
        
        // Return the newly created product
        res.status(201).json(product);
    } catch (error) {
        // Pass any error to the error handling middleware
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const products = await Product.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.productId && { _id: req.query.productId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalProducts = await Product.countDocuments();

        // You can include additional logic specific to products if needed

        res.status(200).json({
            products,
            totalProducts,
        });
    } catch (error) {
        next(error);
    }
}
