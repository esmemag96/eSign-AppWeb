// FILE: modeSchema.js
/**
 * Model: Sale
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;
// Sale Schema.
const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    documents: [ { 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'documents' }],
    documentsInvitation: [{ 
      type : mongoose.Schema.Types.ObjectId, 
      ref: 'documents' }]
  });
// Export the model.
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

// Make the query and bring one user by the username from the DB
module.exports.getUserByUsername = function (username, callback) {
  const query = {
    username: username
  }
  User.findOne(query, function(err, resad){
    if (err) throw err;
    callback(null, resad);
});
  
}

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getUserBydocs = function (id, callback) {
  User.findById(id).populate('documents').populate('documentsInvitation').exec((err, classes) => {
    if (err) throw err;
    callback(null, classes);
  });

}