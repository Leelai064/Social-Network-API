const router = require('express').Router();

const { getAllPosts, 
    getSinglePost, 
    createPost, 
    updatePost, 
    deletePost, 
    createReaction, 
    deleteReaction } = require('../controllers/postController');

router.route('/')
.get(getAllPosts)
.post(createPost);

router.route('/:posttId')
.get(getSinglePost)
.put(updatePost)
.delete(deletePost);

router.route('/:postId/reactions/:reactionId')
.delete(deleteReaction);

router.route('/:postId/reactions')
.post(createReaction);


module.exports = router;