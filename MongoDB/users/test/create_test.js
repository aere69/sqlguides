const assert = require('assert');
const User = require('../src/user');

describe('Creating Records', () => {
    it ('Saves a User', (done) => {
        const joe = new User({name:'Joe'});
        joe.save()
            .then(() => {
                // Has the Joe record been saved?
                // User Schema property isNew === true if record has not been saved to the DB
                assert(!joe.isNew);
                done();
            });
    });
});