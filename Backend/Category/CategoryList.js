import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    images: {
        type: [{
            image: { type: String, required: true, match: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm },
            contentType: { type: String, required: true },
        }],
        default: []
    }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

export default mongoose.model('Category', CategorySchema);
