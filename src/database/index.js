const mongoose = require('mongoose');

mongoose.connext('mongoose://localhost/noderest', { useMongoClient: true });
mongoose.Promise = global.Promise;


module.exports = mongoose;