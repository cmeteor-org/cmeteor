Comments = new Meteor.Collection('comments');

Meteor.methods({
    'commentSubmit': function(content, postId){
        var user = Meteor.user();
        var post = Posts.findOne(postId);

        if(!post){
            throwError(403, '评论的文章不存在！');
            return false;            
        }
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

        return Comments.insert(newComment, function(err, result){
            if(err){
                throwError(403, '保存评论时出错！');
                return false;
            }
            Posts.update(postId, {$inc: {commentedCount: 1}});
        });

    }
})