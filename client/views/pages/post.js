Template.post.helpers({
    post: function(){
        var post = Posts.findOne();
        if(!post)
            return Router.go('notFound');
        post.fromNow = moment(post.submited).fromNow();
        return post;
    },
    comments: function(){
        var comments = Comments.find().fetch();

        for(var i in comments){
            var comment = comments[i];
            comment.fromNow = moment(comment.submited).fromNow();
        }
        return comments;
    }
});

Template.post.events({
    'click #btn-submit': function(e){
        var content = $('#ta-comment');

        var comment = {
            postId: Posts.findOne()._id,
            content: content.val()
        };

        Meteor.call('commentSubmit', comment, function(err, commentId){
            console.log('comment ok ' + commentId);
            content.val('');
        });
    }
})