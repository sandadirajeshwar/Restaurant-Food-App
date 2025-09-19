const mongoose = require('mongoose');

// user schema
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        imageUrl: {
            type: String,
            default: "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png",
        },
    },
    { timestamps: true}
);

// export the model
module.exports = mongoose.model("Category", categorySchema);