// Meteor.methods for user
Meteor.methods({
    setPassword: function(password) {
        check(password, String);
        if (this.userId) {
            Accounts.setPassword(this.userId, password);
        } else {
            return false;
        }
    }

});

// Meteor.methods for post
Meteor.methods({
    postSubmit: function(title, content) {
        var user = Meteor.user();

        if (!validStringLength(title, 2, 50, throwError.bind(null, 403, '标题的长度应该在2-50之间！')))
            return false;
        if (!validStringLength(content, 10, 10000, throwError.bind(null, 403, '正文的长度应该在10-10000之间！')))
            return false;

        if (!user) {
            throwError(403, '必须登录！');
            return false;
        }
        var newPost = {
            title: title,
            content: content,
            userId: user._id,
            author: user.username,
            visitedCount: 0,
            submited: new Date().getTime(),
            lastModified: new Date().getTime(),
            commentedCount: 0
        };
        return Posts.insert(newPost);
    },
    postEdit: function(title, content, id) {
        var user = Meteor.user();
        var post = Posts.findOne(id);

        if (!validStringLength(title, 2, 50, throwError.bind(null, 403, '标题的长度应该在2-50之间！')))
            return false;
        if (!validStringLength(content, 10, 10000, throwError.bind(null, 403, '正文的长度应该在10-10000之间！')))
            return false;

        if (!user || post.userId !== user._id) {
            throwError(403, '没有权限修改！');
            return false;
        }

        Posts.update(post._id, {
            $set: {
                title: title,
                content: content,
                lastModified: new Date().getTime()
            }
        });

        Comments.find({
            postId: post._id
        }).forEach(function(comment) {
            Notifies.insert({
                userId: comment.userId,
                postId: post._id,
                postTitle: post.title,
                msgNum: 1,
                read: false,
                submited: new Date().getTime()
            });
        });
    }
});


// Meteor.methods for comment
Meteor.methods({
    'commentSubmit': function(content, postId) {
        var user = Meteor.user();
        if (!validStringLength(content, 1, 1000, throwError.bind(null, 403, '标题的长度应该在1-1000之间！')))
            return false;
        if (!user) {
            throwError(403, '必须登录！');
            return false;
        }

        var post = Posts.findOne(postId);
        if (!post) {
            throwError(404, '评论的文章不存在！');
            return false;
        }

        var newComment = {
            postId: postId,
            content: content,
            userId: user._id,
            author: user.username,
            submited: new Date().getTime()
        };

        return Comments.insert(newComment, function(err, result) {
            if (err) {
                throwError(500, '保存评论时出错！');
                return false;
            }
            Posts.update(postId, {
                $inc: {
                    commentedCount: 1
                }
            });

            if (newComment.userId !== post.userId) {
                Notifies.insert({
                    userId: post.userId,
                    postId: post._id,
                    postTitle: post.title,
                    msgNum: 0,
                    read: false,
                    submited: new Date().getTime()
                });
            }
        });

    }
})