let config = require('./config');

let mongoose = require('mongoose');

module.exports = function(){

    // Connect to the database
    mongoose.connect(config.ATLASDB);

    let mongodb = mongoose.connection;
    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('==== Connected to MongoDB ====');
    });

    return mongodb;
}