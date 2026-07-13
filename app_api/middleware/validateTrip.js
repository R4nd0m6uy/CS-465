const requiredFields = [
  'code',
  'name',
  'length',
  'start',
  'resort',
  'perPerson',
  'image',
  'description'
];

const tripCodePattern = /^[A-Z0-9]{4,16}$/;
const pricePattern = /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$|^\$?\d+(\.\d{2})?$/;
const imagePattern = /^[\w.-]+\.(jpg|jpeg|png|webp)$/i;

const normalizeText = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim();
};

const validateTrip = (req, res, next) => {
  const errors = [];

  requiredFields.forEach((field) => {
    req.body[field] = normalizeText(req.body[field]);

    if (!req.body[field]) {
      errors.push(`${field} is required`);
    }
  });

  if (req.body.code) {
    req.body.code = req.body.code.toUpperCase();

    if (!tripCodePattern.test(req.body.code)) {
      errors.push('code must be 4 to 16 uppercase letters or numbers');
    }
  }

  if (req.body.start && Number.isNaN(Date.parse(req.body.start))) {
    errors.push('start must be a valid date');
  }

  if (req.body.perPerson && !pricePattern.test(req.body.perPerson)) {
    errors.push('perPerson must be a valid price, such as $799.00 or 799.00');
  }

  if (req.body.image && !imagePattern.test(req.body.image)) {
    errors.push('image must be a valid image filename ending in jpg, jpeg, png, or webp');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Trip validation failed',
      errors
    });
  }

  return next();
};

module.exports = validateTrip;
