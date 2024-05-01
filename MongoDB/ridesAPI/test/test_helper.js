const mongoose = require('mongoose');

// Establish connection to DB
before((done) => {
    mongoose.connect('mongodb://localhost/rides_test');    
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err);
        });
});

// Clear tables
beforeEach((done) => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
        .then(() => drivers.createIndex({ 'location': '2dsphere' }))
        .then(() => done())
        //First time we run it will error table does not exist.
        .catch(() => done()); 
});