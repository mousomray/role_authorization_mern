const BlogRepo = require('../module/blog/repository/blogrepo')
const path = require('path');
const fs = require('fs');

class blogApiController {

    // Add Blog 
    async addBlog(req, res) {
        try {
            // Image Path Validation
            if (!req.file) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: ["Profile image is required"]
                });
            }
            const blogData = { ...req.body, image: req.file.path };
            const blog = await BlogRepo.createBlog(blogData);
            res.status(201).json({
                success: true,
                message: "Blog is created",
                blog
            })
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "An unexpected error occurred" };
            console.error(error);
            res.status(statusCode).json(message);
        }
    }


    // Blog list
    async showblog(req, res) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 2
            const totalData = await BlogRepo.countBlog();
            const totalPage = Math.ceil(totalData / limit)
            const nextPage = totalPage > page ? page + 1 : null
            const prevPage = page > 1 ? page - 1 : null

            const blogs = await BlogRepo.getBlogs(page, limit);
            res.status(200).json({
                message: "Blog retrieved successfully",
                blogs,
                pagination: {
                    page,
                    prevPage,
                    nextPage,
                    totalPage,
                    totalData,
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving blogs" });
        }
    }

    // Recent blog post
    async recentBlogs(req, res) {
        try {
            const recent = await BlogRepo.getBlogs();
            res.status(200).json({ success: true, message: "Recent blog fetched", recent, total: recent.length })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retreiving blogs" })
        }
    }

    // Single blog
    async singleBlog(req, res) {
        try {
            const id = req.params.id
            const blog = await BlogRepo.oneBlog(id)
            res.status(200).json({ message: "Single data fetched", blog })
        } catch (error) {
            console.log("Error fetching single blog...", error)
        }
    }

    // Update Data
    async updateBlog(req, res) {
        try {
            const id = req.params.id;
            // Deleting image from uploads folder start
            if (req.file) {
                const blog = await BlogRepo.oneBlog(id)
                const imagePath = path.resolve(__dirname, '../../', blog.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error('Error deleting image file:', err);
                        } else {
                            console.log('Image file deleted successfully:', blog.image);
                        }
                    });
                } else {
                    console.log('File does not exist:', imagePath);
                }
            }
            // Deleting image from uploads folder end
            const updateData = req.body
            if (req.file) {
                updateData.image = req.file.path;
            }
            const updatedBlog = await BlogRepo.updateBlog(id, updateData);
            if (!updatedBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating student data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // Delete blog
    async deleteBlog(req, res) {
        try {
            // Deleting image from uploads folder start
            const id = req.params.id
            const blog = await BlogRepo.oneBlog(id)
            const imagePath = path.resolve(__dirname, '../../', blog.image);
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    } else {
                        console.log('Image file deleted successfully:', blog.image);
                    }
                });
            } else {
                console.log('File does not exist:', imagePath);
            }
            // Deleting image from uploads folder end
            await BlogRepo.deleteBlog(id)
            res.status(200).json({ message: "Blog deleted successfully" })
        } catch (error) {
            console.log("Eror deleted blog", error);
        }
    }

    // Search with post data
    async searchPost(req, res) {
        try {
            const search = req.body.search;
            const blogs = await BlogRepo.postSearchBlog(search);
            res.status(200).json({ message: "Search data get successfully", blogs });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

    // Add comment for blog
    async addComment(req, res) {
        const id = req.params.id;
        try {
            const commentData = req.body
            console.log("Comment data", commentData)
            const updatedBlog = await BlogRepo.addCommentBlog(id, commentData);
            res.status(201).json({
                success: true,
                message: "Comment added successfully",
                blog: updatedBlog
            });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating student data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // Show comments 
    async showComment(req, res) {
        const id = req.params.id;
        try {
            const blog = await BlogRepo.oneBlog(id)
            res.status(200).json({ sucess: true, message: "Comment fetching successfully", blog })
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching comment", error });
        }
    }


}

module.exports = new blogApiController();








