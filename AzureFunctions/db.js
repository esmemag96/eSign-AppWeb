const mongoose = require('mongoose');
const DATABASE = process.env.MongodbAtlas;

mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }
  return mongoose.connect(DATABASE, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};
