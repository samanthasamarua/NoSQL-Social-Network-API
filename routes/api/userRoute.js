// Import express library
const router = require('express').Router();

// Import controller functions
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(updateUserById);

// /api/users/:userId
router.route('/:userId')
.get(getUserById) // GET request to retrieve a user by ID
.delete(deleteUserById); // Delete request to delete a User by ID


module.exports = router;
