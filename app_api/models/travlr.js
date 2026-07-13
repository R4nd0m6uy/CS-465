const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
      index: true,
      match: [/^[A-Z0-9]{6,12}$/, 'Trip code must be 6 to 12 uppercase letters or numbers']
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    length: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    start: {
      type: Date,
      required: true
    },
    resort: {
      type: String,
      required: true,
      trim: true
    },
    perPerson: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d+(\.\d{2})?$/, 'Price must be numeric with optional cents']
    },
    image: {
      type: String,
      required: true,
      trim: true,
      match: [/^[\w.-]+\.(jpg|jpeg|png|webp)$/i, 'Image must be a valid image filename']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('trips', tripSchema);
