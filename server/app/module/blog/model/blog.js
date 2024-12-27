const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: [3, 'Title must be at least 3 characters']
    },
    subtitle: {
        type: String,
        required: "Subtitle is required",
        minlength: [3, 'Subtitle must be at least 3 characters long']
    },
    image: {
        type: String,
        required: "Enter image it is Required"
    },
    description: {
        type: String,
        required: "Description is required",
        minlength: [10, 'Description must be at least 10 characters']
    },
    author: {
        type: String,
        required: "Author is required"
    }
}, { timestamps: true });

const BlogModel = mongoose.model('blog', BlogSchema);

module.exports = BlogModel;