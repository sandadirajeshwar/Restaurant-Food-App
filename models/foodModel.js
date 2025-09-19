const mongoose = require('mongoose');

// user schema
const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        imageUrl: {
            type: String,
            default: "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png",
        },
        foodTags: {
            type: String,
        },
        category: {
            type: String,
        },
        code: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        restarent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restarent",
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5,
        },
        ratingCount: {
            type: String,
        },
    },
    { timestamps: true}
);

// export the model
module.exports = mongoose.model("Foods", foodSchema);