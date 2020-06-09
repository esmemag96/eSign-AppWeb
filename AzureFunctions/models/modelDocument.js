// FILE: modeSchema.js
/**
 * Model: Sale
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Sale Schema.
const documents = new mongoose.Schema({
  userid: {
    type : mongoose.Schema.Types.ObjectId, 
    required: true
  },
  url: {
    type: String, 
    required: true
  },
  nameBlob: {
    type: String, 
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  users: [ { 
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'User' }],
  paymentAmount:{
    type: Number, 
    requiered: true
  },
  paymentDone:{
    type: Boolean,
    required: true
  }
});
// Export the model.
module.exports = mongoose.model('documents', documents);