const router = require('express').Router();


// Importing all routes

const apiRoutes = require('./api');




// adding prefixes to api routes

router.use('/api,', apiRoutes);



// Error handling

res.status(404).send("404 Route not found!")


module.exports = router;