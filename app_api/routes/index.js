const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

const jwtSecret = process.env.JWT_SECRET || 'devSecretChangeMe';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header required'
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Bearer token required'
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.auth = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

router
  .route('/register')
  .post(ctrlAuth.register);

router
  .route('/login')
  .post(ctrlAuth.login);

router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(authenticateJWT, ctrlTrips.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(authenticateJWT, ctrlTrips.tripsUpdateTrip)
  .delete(authenticateJWT, ctrlTrips.tripsDeleteTrip);

module.exports = router;
