const router = require('express').Router();

// Importing Routes
const appRoutes = require('./appRoutes');
const userRoutes = require('./userRoutes');

// Mounting Routes
router.use('/apps', appRoutes);
router.use('/users', userRoutes);

module.exports = router;
