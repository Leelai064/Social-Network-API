const { User, Thought } = require('../models');



module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Error 404: User does not match this ID. Please try again!' })
          : res.status(200).json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },


    //update user by _id
    updateUser(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Error 404: User does not match this ID. Please try again!' })
              : res.json(user)).catch((err) => res.status(500).json(err));
  },


  // Delete a user and remove them from the thought
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Error 404: User cannot be found' })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but post have been made yet',
            })
          : res.json({ message: 'User has been deleted! Please create a new one' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Friend Requests! Starts Here
  newFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user matches this ID' })
          : User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { friends: req.params.userId } },
            { runValidators: true, new: true }
        )
)
.then(() => res.json({ message: 'You are now friends:' }))
.catch((err) => res.status(500).json(err))
   },


  // DELETE
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { assignmentId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user matches this ID' })
          : User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } },
            { runValidators: true, new: true }                   
        )
)
.then(() => res.json({ message: 'You friend has been removed:' }))
.catch((err) => res.status(500).json(err));
}

}
//Delete ends here!