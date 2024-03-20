const router = require('express').Router()
const {getThoughts, getSingleThought, createThoughts, deleteThoughts} = require('../../controllers/thoughtControllers')

router.route('/').get(getThoughts).post(createThoughts)
module.exports = Router