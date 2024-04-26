const assert = require('assert');
const User = require('../src/user');

describe('Delete Users from the Database', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('Remove Model/Schema Instance', (done) => {
        joe
            .deleteOne()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('RemoveOne Class/Schema', (done) => {
        // remove records that match a given criteria
        User.deleteOne({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Remove Class/Schema', (done) => {
        // remove records that match a given criteria
        User.deleteMany({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('FindOneAndRemove Class/Schema', (done) => {
        User.findOneAndDelete({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('FindByIdAndRemove Class/Schema', (done) => {
        User.findByIdAndDelete(joe._id)
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
});