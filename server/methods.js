// Meteor.methods for user
Meteor.methods({
    setPassword: function(password) {
        check(password, String);
        if (this.userId) {
            Accounts.setPassword(this.userId, password);
        } else {
            return false;
        }
    },
    isRegisted: function(uname) {
        check(uname, String);
        var user = Meteor.users.findOne({username: uname}, {fields: {username: 1}});
        if (!user) {
          return false
        }
        return true
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
            submited: getTime(),
            lastModified: getTime(),
            commentedCount: 0
        };
        return Posts.insert(newPost);
    },
    postEdit: function(title, content, id) {
        var user = Meteor.user();
        var post = Posts.findOne(id);
        var currentUserId = this.userId;
        if (!validStringLength(title, 2, 50, throwError.bind(null, 403, '标题的长度应该在2-50之间！')))
            return false;
        if (!validStringLength(content, 10, 10000, throwError.bind(null, 403, '正文的长度应该在10-10000之间！')))
            return false;

        if (!currentUserId || post.userId !== currentUserId) {
            throwError(403, '没有权限修改！');
            return false;
        }

        Posts.update(post._id, {
            $set: {
                title: title,
                content: content,
                lastModified: getTime()
            }
        });

        var comemntsArr = Comments.find({postId: post._id}, {fields: {userId: 1}}).fetch();
        if (comemntsArr.length !== 0) {
            Notifies.insert({
                commentUserName: user.username,
                commenetUserId: user.userId,
                userId: comemntsArr[0].userId,
                postId: post._id,
                postTitle: post.title,
                msgNum: 1,
                read: false,
                submited: getTime()
            });
        }
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
            submited: getTime()
        };
        return Comments.insert(newComment, function(err) {
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
                    commentUserName: user.username,
                    commenetUserId: user._id,
                    userId: post.userId,
                    postId: post._id,
                    postTitle: post.title,
                    msgNum: 0,
                    read: false,
                    submited: getTime()
                });
            }
        });

    }
});