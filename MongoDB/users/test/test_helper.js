const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

// Run before any test just once
before((done) => {
    // Mongoose and MongoDB will create the DB in case
    // the Database does not exist!
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Error',error);
        });
});

// Run before each test runs
beforeEach((done) => {
    // Empty Database to start clear.
    // Get tables
    const { users, comments, blogposts} = mongoose.connection.collections;
    // Drop tables
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                // Ready to run next test!
                done();
            });
        });
    });
});