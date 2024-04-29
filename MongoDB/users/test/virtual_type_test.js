const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
    it('postCount return number of posts', (done) => {
        const joe =  new User({
            name: 'Joe',
            posts: [{title: 'The Post Title'}]
        });
        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});
