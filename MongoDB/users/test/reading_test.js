const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of the Database', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => { done(); });
    });

    it('Find all users with name of joe', (done) => {
        User.find({name: 'Joe'})
            .then((users) => {
                // Mongoose assigns an _id when a new instance is created.
                // _id in MongoDB is encapsulated as an Object. (i.e. ObjectId("xxxxxxx")
                // in order To compare _id must convert to string with toString() 
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('Find a user with a specific id', (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });
});