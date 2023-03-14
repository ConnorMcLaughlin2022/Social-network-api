const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
} = require('../../controllers/thoughtController');
router.route('/').get(getThoughts).post(createThought);

// /apetThoughts/:commentId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;