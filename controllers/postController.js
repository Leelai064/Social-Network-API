const { User, Post } = require('../models');
const { Schema, Types } = require('mongoose');
module.exports = {
  getPost(req, res) {
    Post.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json(err));
  },
  getSinglePost(req, res) {
    Post.findOne({ _id: req.params.postId })
      .then((Post) =>
        !post
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createPost(req, res) {
    Post.create(req.body)
    .then((post) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { posts: post._id } },
            { new: true }
        );
    })
    .then((user) => 
    !user
    ? res
        .status(404)
        .json({ message: 'Post created, no user id found' })
    : res.json('Created the post')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
  // Update the User
  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId},
      { $set: req.body},
      { runValidators: true, new: true})
      .then((err, result) => {
        if(err) res.status(500);
        res.status(200).json(result);
      }
      )
  },
  deletPost(req, res){
    Post.findOneAndDelete(
        { _id: req.params.postId })
        .then((err, result) => {
            if (!result) {
                res.status(200).json({
                    message: `Post deleted: ${req.params.postId} successfully` 
                });
                console.log(`Post deleted: ${req.params.postId} successfully`);
              } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ error: 'Error 404' });
          }
        }
        );
  },
  addReaction(req, res){
    User.findOneAndUpdate(
        { _id: req.params.postId },
        { $push: { reactions: req.body } },
        { new: true})
        .then((err, result) => {
          if(err) res.status(500);
          res.status(200).json(result);
        });
  },
  deleteReaction(req, res) {
    User.findOneAndDelete(
        { _id: req.params.postId  },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true })
        .then((err, result) => {
          if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
          } else {
            console.log('Check the console for errors');
            res.status(500).json({ error: 'error 404' });
          }
        });
  }
}
