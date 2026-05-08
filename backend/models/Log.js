const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  promptHash: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['Success', 'Blocked'],
    required: true
  },
  reason: {
    type: String, // Filled if status is Blocked (e.g., 'Triggered keyword: violence')
    default: null
  },
  watermarkId: {
    type: String, // Filled if status is Success
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now,
    immutable: true // Immutable audit log requirement
  }
});

module.exports = mongoose.model('Log', LogSchema);
