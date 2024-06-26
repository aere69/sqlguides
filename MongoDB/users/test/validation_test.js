const assert = require('assert');
const User = require('../src/user');

describe('Validating records.', () => {
    it('Requires a user name', (done) => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert (message === 'Name is required');
        done();
    });

    it('Requires user\`s name longer than 2 characters', (done) => {
        const user = new User({name:'Al'});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters');
        done();
    });

    it('Disallows invalid records from beign saved', (done) => {
        const user = new User({name:'Al'});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters');
                done();
            });
    });
});