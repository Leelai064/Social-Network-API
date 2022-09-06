const router = require('express').Router();
const {
  getSingleUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  newFriend,
  deleteFriend,

} = require('../../controllers/userController');

router.route('/')
.get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(newFriend).delete(deleteFriend)

module.exports = router;