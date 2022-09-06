const router = require('express').Router();

const { getPosts, 
    getSinglePost, 
    createPost, 
    updatePost, 
    deletePost, 
    // createReaction, 
    deleteReaction } = require('../../controllers/postController');

router.route('/')
.get(getPosts)
.post(createPost);

router.route('/:posttId')
.get(getSinglePost)
.put(updatePost)
.delete(deletePost);

router.route('/:postId/reactions/:reactionId')
.delete(deleteReaction);

// router.route('/:postId/reactions')
// .post(createReaction);


module.exports = router;