const router = require('express').Router();
const userRoutes = require('./user-routes')



// adding prefix's to routes

router.use('/users', userRoutes);




module.exports = router;