const express = require('express')
const router = express.Router()
const {
  loginAdmin,
  createAdmin,
} = require('../controllers/adminController'); 
const { requireSystemAdmin } = require('../middleware/adminAuth'); 

router.post('/', loginAdmin); 
router.post('/new', requireSystemAdmin, createAdmin); 

module.exports = router