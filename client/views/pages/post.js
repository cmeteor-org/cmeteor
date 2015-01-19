Template.post.helpers({
    post: function(){
        // var post = Posts.findOne(location.pathname.replace(/\/post\//g, ''));
        var post = Posts.findOne(Router.current().params['id']);
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
        root.clearErrors();
        var el = $('#ta-post-comment');
        // var post = Posts.findOne(location.pathname.replace(/\/post\//g, ''));
        var post = Posts.findOne(Router.current().params['id']);
        Meteor.call('commentSubmit', el.text(), post._id, function(err){
            if(err){
                return root.throwError(err.reason);
            }
            el.text('');
        });
    }
});

Template.post.rendered = function(){
    // var postId = location.pathname.replace(/\/post\//g, '');
    var postId = Router.current().params['id'];
    Notifies.find({read:false, postId: postId, userId: Meteor.userId()}).forEach(function(notify){
        Notifies.update(notify._id, {$set: {read: true}});
    });
}