const { connect, connection } = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
const connectionString = 'mongodb://127.0.0.1:27017/nosql_socialnetworkDB';

connect(connectionString);

module.exports = connection;
