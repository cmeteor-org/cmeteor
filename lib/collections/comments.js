Comments = new Meteor.Collection('comments');

Meteor.methods({
    'commentSubmit': function(content, postId){
        var user = Meteor.user();

        if(!validStringLength(content, 1, 1000, throwError.bind(null, 403, '标题的长度应该在1-1000之间！')))
            return false;
        if(!user){
            throwError(403, '必须登录！');
            return false;
        }

        var newComment = {
            postId: postId,
            content: content,
            userId: user._id,
            author: user.username,
            submited: new Date().getTime()
        };

        return Comments.insert(newComment);
    }
})