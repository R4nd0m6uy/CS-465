const mongoose = require('mongoose');
require('../models/auditLog');

const AuditLog = mongoose.model('auditlogs');

const getSafeLimit = (requestedLimit) => {
  const parsedLimit = Number.parseInt(requestedLimit, 10);

  if (Number.isNaN(parsedLimit)) {
    return 50;
  }

  return Math.min(Math.max(parsedLimit, 1), 100);
};

// GET: /api/audit/trips
const auditLogsList = async (req, res) => {
  try {
    const limit = getSafeLimit(req.query.limit);

    const auditLogs = await AuditLog.find({ collectionName: 'trips' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    return res.status(200).json(auditLogs);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving audit logs',
      code: 'AUDIT_LOG_RETRIEVAL_ERROR',
      error: err.message
    });
  }
};

// GET: /api/audit/trips/:tripCode
const auditLogsFindByTripCode = async (req, res) => {
  try {
    const tripCode = req.params.tripCode;

    if (!tripCode) {
      return res.status(400).json({ message: 'Trip code is required' });
    }

    const limit = getSafeLimit(req.query.limit);

    const auditLogs = await AuditLog.find({
      collectionName: 'trips',
      tripCode: tripCode.toUpperCase()
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    return res.status(200).json(auditLogs);
  } catch (err) {
    return res.status(500).json({
      message: 'Error retrieving trip audit logs',
      code: 'AUDIT_LOG_RETRIEVAL_ERROR',
      error: err.message
    });
  }
};

module.exports = {
  auditLogsList,
  auditLogsFindByTripCode
};
