const jwt = require('jsonwebtoken'); 
const asyncHandler = require('express-async-handler'); 
const Admin = require('../models/admin'); 



//  requireSystemAdmin : returns true if the token is a system-admin token. 
const requireSystemAdmin = asyncHandler(async (req, res, next) => {
  let token; 

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]; 

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 

      // Get user from the token
      req.admin = await Admin.findById(decoded.id).select('-password');
      console.log(req.admin);
      if (req.admin.role === 'system-admin'){
          next()
      } else {
        res.status(401)
        throw new Error('Not authorized')
      }
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})


// verifyIsAdmin: returns true if the token is an admin (system or helper) token. 
const verifyIsAdmin = asyncHandler(async (req, res, next) => {
  let token; 

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]; 

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 

      // Get user from the token
      req.isAdmin = await Admin.exists({ _id: decoded.id }); 
      if (req.isAdmin){
          next()
      } else {
        res.status(401)
        throw new Error('Not authorized')
      }
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})


module.exports = { requireSystemAdmin, verifyIsAdmin }