const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');


const thoughtController = {
    // GET all thoughts
    getAllThoughts: async (req, res) => {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

      // GET a single thought by its _id
  getThoughtById: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error('Error fetching thought by id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

    // POST to create a new thought
  createThought: async (req, res) => {
    const { thoughtText, username, userId } = req.body;
    try {
      const newThought = await Thought.create({ thoughtText, username, userId });
      // Push the created thought's _id to the associated user's thoughts array field
      await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });
      res.status(201).json(newThought);
    } catch (error) {
      console.error('Error creating thought:', error);
      res.status(400).json({ error: 'Invalid data' });
    }
  },
  // PUT to update a thought by its _id
  updateThoughtById: async (req, res) => {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error updating thought:', error);
      res.status(400).json({ error: 'Invalid data' });
    }
  },
  // DELETE to remove a thought by its _id
  deleteThoughtById: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      // Remove the thought from associated users' thoughts array field
      await User.updateMany({}, { $pull: { thoughts: thoughtId } });
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      console.error('Error deleting thought:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  // POST to create a reaction stored in a single thought's reactions array field
  createReaction: async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error creating reaction:', error);
      res.status(400).json({ error: 'Invalid data' });
    }
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction: async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error deleting reaction:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = thoughtController;