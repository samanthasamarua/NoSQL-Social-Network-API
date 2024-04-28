const  { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate('thoughts friends');

      if (!users) {
        return res.status(404).json({ error: 'Users not found' });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// GET a single user by its _id and populated thought and friend data
async getUserById(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate('thoughts friends');

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Include friend count in the response
    res.json({
      ...user.toJSON(),
      friendCount: user.friendCount // Include the friendCount virtual field
    });
  } catch (error) {
    console.error('Error fetching user by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

  // Create a new user
  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      
      // Create the new user
      const newUser = await User.create({ username, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // PUT to update a user by its _id
  async updateUserById(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(400).json({ error: 'Invalid data' });
    }
  },
  
  // DELETE to remove user by its _id
  async deleteUserById(req, res) {
    const { userId } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the friend already exists in the user's friend list
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ error: 'Friend already exists in the user\'s friend list' });
      }

      // Add the friend to the user's friend list
      user.friends.push(friendId);
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.error('Error adding friend:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the friend exists in the user's friend list
      if (!user.friends.includes(friendId)) {
        return res.status(400).json({ error: 'Friend not found in the user\'s friend list' });
      }

      // Remove the friend from the user's friend list
      user.friends = user.friends.filter(friend => friend.toString() !== friendId);
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
