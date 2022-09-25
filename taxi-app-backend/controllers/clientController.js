const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Client = require('../models/client');

// @desc    Register new Client
// @route   POST /api/Clients
// @access  Public
const registerClient = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body
  if (!name || !email || !password || !phone) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if Client exists
  const ClientExists = await Client.findOne({ email }) 

  if (ClientExists) {
    res.status(400); 
    throw new Error('Client already exists')
  }

    // Check if Client exists
    const PhoneExists = await Client.findOne({ phone }) 

    if (PhoneExists) {
        res.status(400)
        throw new Error('Phone already used')
    }
  

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create Client
  const client = await Client.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  console.log('client created');

  if (client) {
    res.status(201).json({
      _id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      token: generateToken(client._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Client data')
  }
})

// @desc    Authenticate a Client
// @route   POST /api/Clients/login
// @access  Public
const loginClient = asyncHandler(async (req, res) => {
  const { phone, password } = req.body

  // Check for Client phone
  const client = await Client.findOne({ phone })

  if (client && (await bcrypt.compare(password, client.password))) {
    res.json({
      _id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      token: generateToken(client._id),
    })
  } else {
    res.status(400)
    throw new Error('Phone not registered.'); 
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
  registerClient,
  loginClient,
}