const mongoose = require('mongoose');
// const {dbHost,dbName,dbPass,dbPort,dbUser} = require('../app/config');

//  mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
mongoose.connect('mongodb+srv://adminadmin:adminadmin123@cluster0.fo6zk.mongodb.net/foodStore?retryWrites=true&w=majority',{ useNewUrlParser: true})

const db = mongoose.connection;


module.exports = db;