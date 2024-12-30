const express = require('express');
const routeLabel = require('route-label');
const blogController = require('../../webservice/blogApiController');
const uploadImage = require('../../helper/imagehandler') // Image area
const { UserAuth } = require('../../middleware/user_auth/auth')
const checkPermission = require('../../middleware/user_auth/checkPermission'); // Form RBAC

// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.post('createblog', '/createblog', UserAuth, checkPermission(['create_blog']), uploadImage.single('image'), blogController.addBlog)
namedRouter.get('blogs', '/blogs', UserAuth, checkPermission(['view_blog']), blogController.showblog)
namedRouter.get('recentblogs', '/recentblogs', UserAuth, blogController.recentBlogs)
namedRouter.get('singleblog', '/singleblog/:id', UserAuth, blogController.singleBlog)
namedRouter.put('updateblog', '/updateblog/:id', uploadImage.single('image'), UserAuth, checkPermission(['edit_blog']), blogController.updateBlog)
namedRouter.delete('deleteblog', '/deleteblog/:id', UserAuth, checkPermission(['delete_blog']), blogController.deleteBlog)
namedRouter.post('searchPost', '/blogs/search', UserAuth, blogController.searchPost)
namedRouter.post('addcomment', '/addcomment/:id', UserAuth, blogController.addComment);
namedRouter.get('showcomment', '/showcomment/:id', UserAuth, blogController.showComment);

module.exports = router;   