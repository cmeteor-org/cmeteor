Posts = new Meteor.Collection('posts');

Meteor.methods({
    submit: function(post){
        var user = Meteor.user();

        if(!user)
            return console.log('no login');

        var newPost = {
            title: post.title,
            content: post.content,
            userId: user._id,
            author: user.username,
            submited: new Date().getTime()
        };

        return Posts.insert(newPost);
    }
});