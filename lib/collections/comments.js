Comments = new Meteor.Collection('comments');

Meteor.methods({
    'commentSubmit': function(comment){
        var user = Meteor.user();

        if(!user)
            return console.log('no login');

        var newComment = {
            postId: comment.postId,
            content: comment.content,
            userId: user._id,
            author: user.username,
            submited: new Date().getTime()
        };

        return Comments.insert(newComment);
    }
})