const mongoose = require('mongoose');

// Mongoose and MongoDB will create the DB in case it
// does not exist!
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
    .once('open', () => console.log('Good to go!'))
    .on('error', (error) => {
        console.warn('Error',error);
    });