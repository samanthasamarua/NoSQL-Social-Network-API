// Imports the schema, model and mongoose objects from the mongoose package
const { Schema, model } = require('mongoose');

// Imports the Reaction model
const Reaction = require('./Reaction')

// Mongoose schema - Defines the structure of the Thought document
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought is Required",
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: true,
    },

    // array of nested documents created with the reactionSchema
    reactions: [Reaction],
  },
  {
    // Specifies virtual properties
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual property called reactionCount
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;