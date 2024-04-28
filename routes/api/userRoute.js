// Import express library
const router = require('express').Router();

// Import controller functions
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
  
} = require('../../controllers/userController');

// /users
router.route('/').get(getUsers).post(createUser);

// /users/:userId
router.route('/:userId')
.get(getUserById) // GET request to retrieve a user by ID
.delete(deleteUserById) // Delete request to delete a User by ID
.put(updateUserById)

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);


module.exports = router;
