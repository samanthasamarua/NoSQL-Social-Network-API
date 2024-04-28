// Import the necessary dependencies and controllers
const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThoughtById,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// Find all and create thought routes
router.route('/').get(getAllThoughts).post(createThought);

// Find, delete and update thoughts by user id routes
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);

// Create reactions based on user's thought route
router.route('/:thoughtId/reactions').post(createReaction);

// Delete reaction 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
// Export the router
module.exports = router;