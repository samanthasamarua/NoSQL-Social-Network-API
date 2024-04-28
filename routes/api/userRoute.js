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

// Find & create all user route
router.route('/').get(getUsers).post(createUser);

// Find, Delete & Update user by ID route
router.route('/:userId')
.get(getUserById) // GET request to retrieve a user by ID
.delete(deleteUserById) // Delete request to delete a User by ID
.put(updateUserById)

// Add & Delete Friend to user route
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);


module.exports = router;
