const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

const authenticateJWT = require('../middleware/authenticateJWT');

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
