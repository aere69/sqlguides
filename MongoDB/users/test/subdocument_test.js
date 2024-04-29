const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('Can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'The Post Title' }]
        });
        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'The Post Title');
                done();
            })

    });

    it('Can Add Subdocuments to existing record', (done) => {
        // Create a user with no posts
        const joe = new User({
            name: 'Joe',
            posts: []
        });
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                // Add post to the user
                user.posts.push({title: 'New Post'});
                // return has to be explicit because it is nested
                // on a promise.
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            })
    });

    it('Can Delete Subdocuments of existing record', (done) => {
        //Create a user with a post
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'Initial Post'}]
        });
        // Save the user to the database
        joe.save()
            .then(() => User.findOne({name:'Joe'}))
            .then((user) => {
                //Get the first post
                const post =  user.posts[0];
                // Remove the post from the list of posts
                user.posts.pull(post);
                // Save/Persist the user without the post
                return user.save()
            })
            .then(() => User.findOne({name:'Joe'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
})