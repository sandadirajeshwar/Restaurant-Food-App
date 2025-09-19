const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "user name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        address: {
            type: Array,
        },
        phone: {
            type: String,
            required: [true, "phone number is required"],
        },
        usertype: {
            type: String,
            required: [true, "user type is required"],
            default: "client",
            enum: ["client", "admin", "vendor", "driver"],
        },
        profile: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fuser-avatar%2Fuser-avatar-male-5.html&psig=AOvVaw2wlUUJRg5g35XxnNmKxdnQ&ust=1758269872028000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOitlevv4Y8DFQAAAAAdAAAAABAE",
        },
        answers: {
            type: String,
            required: [true, "answer is required"],
        },
    },
    { timestamps: true}
);

// export the model
module.exports = mongoose.model("User", userSchema);