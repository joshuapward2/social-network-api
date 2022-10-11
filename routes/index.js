const router = require('express').Router();


// Importing all routes

const apiRoutes = require('./api/index.js');




// adding prefixes to api routes

router.use('/api', apiRoutes);


// Error handling

router.use((req, res)=> {
    return res.status(404).send("404 Route not found!")
})

// Error handling



module.exports = router;