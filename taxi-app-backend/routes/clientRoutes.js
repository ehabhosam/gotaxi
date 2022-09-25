const express = require('express')
const router = express.Router()
const {
  registerClient,
  loginClient,
} = require('../controllers/clientController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerClient)
router.post('/login', loginClient)

module.exports = router