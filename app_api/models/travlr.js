const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Trip code is required'],
      trim: true,
      uppercase: true,
      unique: true,
      index: true,
      match: [/^[A-Z0-9]{4,16}$/, 'Trip code must be 4 to 16 uppercase letters or numbers']
    },
    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true,
      index: true
    },
    length: {
      type: String,
      required: [true, 'Trip length is required'],
      trim: true
    },
    start: {
      type: Date,
      required: [true, 'Trip start date is required']
    },
    resort: {
      type: String,
      required: [true, 'Resort is required'],
      trim: true
    },
    perPerson: {
      type: String,
      required: [true, 'Per-person price is required'],
      trim: true,
      match: [
        /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$|^\$?\d+(\.\d{2})?$/,
        'Per-person price must be a valid price, such as 799.00 or $799.00'
      ]
    },
    image: {
      type: String,
      required: [true, 'Image filename is required'],
      trim: true,
      match: [/^[\w.-]+\.(jpg|jpeg|png|webp)$/i, 'Image must be a valid image filename']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters']
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('trips', tripSchema);
