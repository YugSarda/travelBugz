import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    packageName: { 
        type: String, 
        required: [true, 'Package name is required'],
        trim: true
    },
    place: { 
        type: String, 
        required: [true, 'Place is required'],
        trim: true
    },
    duration: { 
        type: String, 
        required: [true, 'Duration is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'],
        trim: true
    },
    image: { 
        type: String,
        default: 'default-package.jpg'
    },
    activities: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true,
   
});



export default mongoose.model("Package", PackageSchema);