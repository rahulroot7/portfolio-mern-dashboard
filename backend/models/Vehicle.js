const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  docType: {
    type: String,
    required: true
  },
  frontImg: {
    type: String,
    required:true,
  },
  backImg: {
    type: String 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
