const router = require('express').Router();
const userRoutes = require('./user-routes')
const thoughtRoutes = require('./thoughts-routes')




// adding prefix's to routes

router.use('/users', userRoutes);
router.use('/thoughts', userRoutes);




module.exports = router;