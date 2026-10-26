const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name must be provided"],
        },
        price: {
            type: Number,
            required: [true, "price must be provided"],
        },
        features: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 4.8
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        // {
        //     timestamps: true,
        // }
        company: {
            type: String,
            enum: {
                values: ["apple", "samsung", "dell", "mi"],
                message: `{VALUE} id not supported`,
            }
        }
    },
);


module.exports = mongoose.model('Product', productSchema);