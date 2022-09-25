const express = require('express')
const router = express.Router()
const {
  getRatio,
  setRatio,
} = require('../controllers/ratioController'); 

router.get('/', getRatio)
router.put('/new', setRatio)

module.exports = router