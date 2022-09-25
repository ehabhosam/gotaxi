const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/admin'); 

// @desc    Creating help-admin
// @route   POST /api/admin
// @access  system-admin role only ( apply adminAuthMiddleware )
const createAdmin = asyncHandler(async (req, res) => {
    console.log(req.msg); 
    console.log('reached creation funciton')
  const { username, password } = req.body

  if (!username || !password ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if Admin exists
  const AdminExists = await Admin.findOne({ username }); 

  if (AdminExists) {
    res.status(400); 
    throw new Error('Admin already exists'); 
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create Admin
  const admin = await Admin.create({
    username,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
        username: admin.name,
        token: generateToken(admin._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Admin data')
  }
})

// @desc    Authenticate an admin
// @route   POST /api/admin/login
// @access  for system-admin and help-admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  // Check for admin username
  const admin = await Admin.findOne({ username })

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      username: admin.name,
      token: generateToken(admin._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
    createAdmin,
    loginAdmin,
}