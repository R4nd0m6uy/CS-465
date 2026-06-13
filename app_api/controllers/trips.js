const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

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
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

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

    const updatedTrip = await Trip.findOneAndUpdate(
      { code: tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      {
        new: true,
        runValidators: true
      }
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({ message: `Trip code ${tripCode} not found` });
    }

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
