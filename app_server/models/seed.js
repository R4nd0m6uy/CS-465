const fs = require('fs');
const path = require('path');
const mongoose = require('./db');

const Trip = mongoose.model('trips');

const tripsPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

const seedDB = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);

    console.log(`Seeded ${trips.length} trips into MongoDB.`);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDB();
