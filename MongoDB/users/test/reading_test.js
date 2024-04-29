const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of the Database', () => {

    let joe, sue, tom, ann;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        sue = new User({ name: 'Sue' });
        tom = new User({ name: 'Tom' });
        ann = new User({ name: 'Ann' });

        Promise.all([joe.save(), sue.save(), tom.save(), ann.save()])
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

    it('Can Skip & Limit result set (filtering/pagination)', (done) => {
        // Users : Joe, Sue, Tom, Ann
        User.find({})
            .sort({name: 1}) // Sort Ascendig. -1 for descending
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Sue');
                done();
            })
    });
});