const mongoose = require('mongoose');
require('../models/auditLog');

const Trip = mongoose.model('trips');
const AuditLog = mongoose.model('auditlogs');

const buildTripPayload = (req) => ({
  code: req.body.code,
  name: req.body.name,
  length: req.body.length,
  start: req.body.start,
  resort: req.body.resort,
  perPerson: req.body.perPerson,
  image: req.body.image,
  description: req.body.description
});

const toPlainObject = (document) => {
  if (!document) {
    return null;
  }

  if (typeof document.toObject === 'function') {
    return document.toObject();
  }

  return document;
};

const getRequestActor = (req) => {
  if (req.auth) {
    return req.auth.email || req.auth.name || req.auth.id || req.auth._id || 'authenticated-user';
  }

  return 'unknown';
};

const recordTripAudit = async (req, action, beforeTrip, afterTrip) => {
  const before = toPlainObject(beforeTrip);
  const after = toPlainObject(afterTrip);
  const referenceTrip = after || before;

  try {
    await AuditLog.create({
      action,
      collectionName: 'trips',
      documentId: referenceTrip && referenceTrip._id ? referenceTrip._id : undefined,
      tripCode: referenceTrip && referenceTrip.code ? referenceTrip.code : req.params.tripCode,
      performedBy: getRequestActor(req),
      before,
      after,
      metadata: {
        method: req.method,
        route: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('user-agent')
      }
    });
  } catch (auditErr) {
    console.error('Audit log write failed:', auditErr.message);
  }
};

// GET: /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }

    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving trips',
      error: err.message
    });
  }
};

// GET: /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    if (!tripCode) {
      return res.status(400).json({ message: 'Trip code is required' });
    }

    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip code ${tripCode} not found` });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving trip',
      error: err.message
    });
  }
};

// POST: /api/trips
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create(buildTripPayload(req));

    await recordTripAudit(req, 'CREATE', null, newTrip);

    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(400).json({
      message: 'Error creating trip',
      error: err.message
    });
  }
};

// PUT: /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    if (!tripCode) {
      return res.status(400).json({ message: 'Trip code is required' });
    }

    const existingTrip = await Trip.findOne({ code: tripCode }).exec();

    if (!existingTrip) {
      return res.status(404).json({ message: `Trip code ${tripCode} not found` });
    }

    const updatedTrip = await Trip.findOneAndUpdate(
      { code: tripCode },
      buildTripPayload(req),
      {
        new: true,
        runValidators: true
      }
    ).exec();

    await recordTripAudit(req, 'UPDATE', existingTrip, updatedTrip);

    return res.status(200).json(updatedTrip);
  } catch (err) {
    return res.status(400).json({
      message: 'Error updating trip',
      error: err.message
    });
  }
};

// DELETE: /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    if (!tripCode) {
      return res.status(400).json({ message: 'Trip code is required' });
    }

    const deletedTrip = await Trip.findOneAndDelete({ code: tripCode }).exec();

    if (!deletedTrip) {
      return res.status(404).json({ message: `Trip code ${tripCode} not found` });
    }

    await recordTripAudit(req, 'DELETE', deletedTrip, null);

    return res.status(200).json({
      message: `Trip code ${tripCode} deleted`,
      trip: deletedTrip
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error deleting trip',
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
