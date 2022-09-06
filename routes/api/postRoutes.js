const router = require('express').Router();

const { getAllThoughts, 
    getSinglePost, 
    createPost, updatePost, deletePost, createReaction, deleteReaction } = require('../../controllers/postController');

router.route('/')
.get(getAllThoughts)
.post(createThought);

router.route('/:posttId')
.get(getSinglePost)
.put(updatePost)
.delete(deletePost);

router.route('/:postId/reactions/:reactionId')
.delete(deleteReaction);

router.route('/:thoughtId/reactions')
.post(createReaction);


module.exports = router;