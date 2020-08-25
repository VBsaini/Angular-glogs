const mongoose = require("mongoose");
const Blog = require("./blog");
const pLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Blog,
        },
    ],
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
    },
});
userSchema.plugin(pLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;
