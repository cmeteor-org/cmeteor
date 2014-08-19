Posts = new Meteor.Collection('posts');

Meteor.methods({
    postSubmit: function(title, content){
        var user = Meteor.user();

        if(!validStringLength(title, 2, 28, throwError.bind(null, 403, '标题的长度应该在2-28之间！')))
            return false;
        if(!validStringLength(content, 10, 10000, throwError.bind(null, 403, '正文的长度应该在10-10000之间！')))
            return false;

        if(!user){
            throwError(403, '必须登录！');
            return false;
        }
        var newPost = {
            title: title,
            content: content,
            userId: user._id,
            author: user.username,
            visitedCount: 0,
            submited: new Date().getTime()
        };
        return Posts.insert(newPost);
    }
});