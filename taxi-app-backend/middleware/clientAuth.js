const jwt = require('jsonwebtoken'); 
const asyncHandler = require('express-async-handler'); 
const Client = require('../models/client'); 

const verifyClient = asyncHandler(async (req, res, next) => {
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
          const isClient = Client.exists({ _id: decoded.id })
          if (isClient){
            req.isClient = true;
            next()
          } else {
            res.status(401)
            throw new Error('This process can be done from a client only.')
          }
        } catch (error) {
          console.log(error)
          res.status(401)
          throw new Error('An error occurred')
        }
      }
    
      if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
      }
})

module.exports = { verifyClient }