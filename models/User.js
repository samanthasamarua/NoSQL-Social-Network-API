const { Schema, model } = require('mongoose');


// Define the schema for the User model
const userSchema = new Schema({

// Define the username field
  username: {
    type: String,
    unique: true, // Ensures username is unique
    required: true, // Username is required
    trim: true 
  },
// Define the email field
  email: {
    type: String,
    required: true, // Ensure email is required
    unique: true, // Email is unique
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Validates email format
  },

  // Define the thoughts field as an array of ObjectIds referencing the Thought model
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],

  // Define the friends field as an array of ObjectIds
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Define virtual for friendCount
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
