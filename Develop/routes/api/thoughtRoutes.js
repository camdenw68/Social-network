const router = require('express').Router()
const {getThoughts, getSingleThought, createThoughts, deleteThoughts, updateThoughts, addReaction, deleteReaction} = require('../../controllers/thoughtControllers')

router.route('/').get(getThoughts).post(createThoughts)
router.route('/:thoughtsId:').get(getSingleThought).put(updateThoughts).delete(deleteThoughts)
router.route('/thoughtsId/reaction').post(addReaction)
router.route('/:thoughtsId/reaction/:reactionid').delete(deleteReaction)
module.exports = router