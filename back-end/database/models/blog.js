const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    content: {
        type: String,
    },
    heading: {
        type: String,
    },
    img: {
        type: String,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
    },
});
const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
