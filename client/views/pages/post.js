Template.post.helpers({
    post: function(){
        var post = Posts.findOne(location.pathname.replace(/\/post\//g, ''));
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
    'click #btn-comment-submit': function(e){
        e.preventDefault();
        clearErrors();
        var el = $('#ta-post-comment');

        Meteor.call('commentSubmit', el.val(), Posts.findOne()._id, function(err){
            if(err){
                return throwError(err.reason);
            }
            el.val('');
        });
    }
})