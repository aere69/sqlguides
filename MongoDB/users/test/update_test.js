const assert = require('assert');
const User = require('../src/user');

describe('Updating Records.', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({name:'Joe', postCount: 0});
        joe.save()
            .then(() => done());
    });

    //Helper function - avoid repetitive code.
    function assertName(operation, done) {
        operation
            .then(() => User.find({}))  // retreive all users in collection
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    };

    it('Instance set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('Instance update', (done) => {
        assertName(joe.updateOne({ name: 'Alex' }), done);
    });

    it('Model UpdateOne', (done) => {
        assertName(
            User.updateOne({name: 'Joe'}, {name: 'Alex'}),
            done
        );
    });

    it('Model UpdateMany', (done) => {
        assertName(
            User.updateMany({name: 'Joe'}, {name: 'Alex'}),
            done
        );
    });
    
    it('Model FindOneAndUpdate', (done) => {
        assertName(
            User.findOneAndUpdate({name:'Joe'}, {name: 'Alex'}),
            done
        );
    });
    
    it('Model FindByIdAndUpdate', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name:'Alex'}),
            done
        );
    });
    
    // xit : tells mocha not to run the test.
    // Mark it as pending. Working on it.
    it('Likes count incremented by one for all', (done) => {
        User.updateMany(
            { name: 'Joe'}, 
            { $inc: { likes: 1 } }
        )
            .then(() => User.findOne({name:'Joe'}))
            .then((user) => {
                assert(user.likes === 1);
                done();
            });
    });
});