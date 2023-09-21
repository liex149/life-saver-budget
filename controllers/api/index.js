const router = require('express').Router();
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes')

router.use('/user', userRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
