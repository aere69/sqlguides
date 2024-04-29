const assert = require('assert');
const User = require('../src/user')
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
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
    it('user clean up blogPosts on delete', (done) => {
        joe
            .deleteOne()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});