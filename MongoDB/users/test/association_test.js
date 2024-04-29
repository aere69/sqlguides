const assert = require('assert');
const User = require('../src/user')
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({name:'Joe'});
        blogPost = new BlogPost({
            title: 'First Post',
            content: 'The description of the First Post.'
        });
        comment = new Comment({
            content: 'This is the comment for te first Post'
        });

        //create associations.
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        // Execute all saves in parallel
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    // it.only run only this test. 
    it('Saves a relation between a user and a blogPost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'First Post');
                done();
            });
    });

    it('Saves a full relation tree', (done) => {
        User.findOne({name:'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'First Post');
                assert(user.blogPosts[0].comments[0].content === 'This is the comment for te first Post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});