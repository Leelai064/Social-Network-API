const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', postRoutes);

module.exports = router;