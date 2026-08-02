const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['CREATE', 'UPDATE', 'DELETE']
    },
    collectionName: {
      type: String,
      required: true,
      default: 'trips'
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId
    },
    tripCode: {
      type: String,
      trim: true,
      index: true
    },
    performedBy: {
      type: String,
      trim: true,
      default: 'unknown'
    },
    before: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    after: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ collectionName: 1, tripCode: 1 });

mongoose.model('auditlogs', auditLogSchema);
