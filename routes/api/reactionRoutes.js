const router = require('express').Router();
const {
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController.js');

router.route('/:id/reactions').post(addReaction);

router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router; 