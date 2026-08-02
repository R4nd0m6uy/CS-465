const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');
const ctrlAuditLogs = require('../controllers/auditLogs');

const authenticateJWT = require('../middleware/authenticateJWT');
const validateTrip = require('../middleware/validateTrip');

router
  .route('/register')
  .post(ctrlAuth.register);

router
  .route('/login')
  .post(ctrlAuth.login);

router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(authenticateJWT, validateTrip, ctrlTrips.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(authenticateJWT, validateTrip, ctrlTrips.tripsUpdateTrip)
  .delete(authenticateJWT, ctrlTrips.tripsDeleteTrip);


router
  .route('/audit/trips')
  .get(authenticateJWT, ctrlAuditLogs.auditLogsList);

router
  .route('/audit/trips/:tripCode')
  .get(authenticateJWT, ctrlAuditLogs.auditLogsFindByTripCode);

module.exports = router;
