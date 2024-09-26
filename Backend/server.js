import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';

// Use `fileURLToPath` and `import.meta.url` to mimic `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const uri = 'mongodb+srv://filibiinfanax10:filibiinfanax@cluster0.vurfpiv.mongodb.net/myBusiness-Directory?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for the image
const sliderSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String, required: true }, // Store as base64
    contentType: { type: String, required: true }, // Content type of the image (e.g., 'image/jpeg')
});

// Define a schema for the Category

const categorySchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String, required: true }, // Store as base64
    contentType: { type: String, required: true }
});


// Create a model based on the schema category

const Category = mongoose.model('Category', categorySchema);

// Create a model based on the schema
const Slider = mongoose.model('Slider', sliderSchema);

// Function to insert an category (called manually)

async function insertCategory() {
    try {
        const imagePath = path.join(__dirname, '../frontend/assets/images/breakfast.png'); // Path to your image
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        const doc = {
            name: 'Daily Products',
            image: base64Image,
            contentType: 'image/jpeg',
        };

        const result = await Category.create(doc);
        console.log(`Category inserted successfully with id: ${result._id}`);
    } catch (error) {
        console.error('Error inserting category:', error);
    }
}
// Function to insert an image (called manually)
async function insertImage() {
    try {
        const imagePath = path.join(__dirname, '../frontend/assets/images/labtop.jpg'); // Path to your image
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');

        const doc = {
            name: 'Product Image',
            image: base64Image,
            contentType: 'image/jpeg',
        };

        const result = await Slider.create(doc);
        console.log(`Image inserted successfully with id: ${result._id}`);
    } catch (error) {
        console.error('Error inserting image:', error);
    }
}

// Set up Express
const app = express();
app.use(bodyParser.json());
// Enable CORS for cross-origin requests
app.use(cors({
    origin: ['http://localhost:8081', 'http://localhost:19006'], // Allow Expo and Web client origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

const PORT = process.env.PORT || 5000;

// Add a route to manually insert an category

app.get('/insert-category', async (req, res) => {
    try {
        await insertCategory();
        res.status(200).send('Category inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting category');
    }
});

// Route to get images from MongoDB
app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            console.log("Category not found");
        }
        res.status(200).send(
            categories.map(category => ({
                id: category._id,
                image: category.image, // Base64 image string
                contentType: category.contentType,
            }))
        );
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories');
    }
});

// Add a route to manually insert an image
app.get('/insert-image', async (req, res) => {
    try {
        await insertImage();
        res.status(200).send('Image inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting image');
    }
});

// Route to get images from MongoDB
app.get('/images', async (req, res) => {
    try {
        const images = await Slider.find();
        if (!images) {
            console.log("Image not found");
        }
        res.status(200).send(
            images.map(image => ({
                id: image._id,
                image: image.image, // Base64 image string
                contentType: image.contentType,
            }))
        );
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Error fetching images');
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
