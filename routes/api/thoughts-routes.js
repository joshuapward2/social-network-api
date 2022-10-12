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
  


// GET all /api/thoughts
router
.route('/')
.get(getAllThoughts)
router.route('/:userId').post(addThought)
//  /api/thoughts/:id

router.route('/:id').get(getThoughtsById)
router.route('/:id').put(updateThoughts)


// Routes by id at /api/thoughts/:id
router
.route('/delete/:userid/:thoughtsid')
.put(updateThoughts)
.delete(removeThoughts);


// Reactions routes
router.route('/:userId/:thoughtsId/:reactionsId').delete(removeReation);
router.route('/:userId/:thoughtsId/:reactionsId').post(addReaction);

module.exports = router;

