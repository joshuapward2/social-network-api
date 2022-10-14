const router = require('express').Router();

// bringing all methods over
const {
    getAllThoughts,
    getThoughtsById,
    addThought,
    updateThoughts,
    removeThoughts,
    removeReation,
    addReaction
  } = require('../../controllers/thought-controller');
  


// GET all and POST by ID
router
.route('/').get(getAllThoughts)
router.route('/:id').get(getThoughtsById)


//PUT and Post


router.route('/:id').put(updateThoughts)
router.route('/:userId').post(addThought)


// Routes deleting and updating
router
.route('/delete/:userid/:thoughtsId')
.put(updateThoughts)
.delete(removeThoughts);


// Reactions routes
router.route('/:userId/:thoughtsId/:reactionsId').delete(removeReation);
router.route('/:userId/:thoughtsId/:reactionsId').post(addReaction);

module.exports = router;