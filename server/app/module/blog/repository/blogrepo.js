const BlogModel = require('../model/blog');

class BlogRepo {

    // Add blog function
    async createBlog(blogData) {
        return BlogModel.create(blogData)
    }

    // Fetch blog for api where I add pagination
    async getBlogs(page, limit) {
        const skip = (page - 1) * limit;
        return await BlogModel.find().skip(skip).limit(limit);
    }

    // All blogs
    async allBlogs(req, res) {
        return await BlogModel.find();
    }

    // Handle post search
    async postSearchBlog(search) {
        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { subtitle: { $regex: search, $options: 'i' } }
            ]
        };
        return await BlogModel.find(query);
    }

    // Total blog 
    async countBlog() {
        return await BlogModel.countDocuments();
    }

    // Fetch single blog
    async oneBlog(id) {
        return await BlogModel.findById(id);
    }

    // Update blog 
    async updateBlog(id, blogData) {
        return await BlogModel.findByIdAndUpdate(id, blogData, {
            new: true,
            runValidators: true,
        })
    }

    // Delete blog 
    async deleteBlog(id) {
        return await BlogModel.findByIdAndDelete(id);
    }

    // Add comment mongo
    async addCommentBlog(id, commentData) {
        const blog = await BlogModel.findById(id);
        blog.comments.push(commentData);
        return blog.save();
    }
}

module.exports = new BlogRepo();















