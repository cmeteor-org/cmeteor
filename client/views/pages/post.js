Template.post.helpers({
    post: function(){
        var post = Posts.findOne();
        if(!post)
            Router.go('notFound');
        return Posts.findOne();
    },
    comments: function(){
        return Comments.find().fetch();
    }
});

Template.post.events({
    'click #btn-submit': function(e){
        var content = $('#ta-comment').val();

        var comment = {
            postId: Posts.findOne()._id,
            content: content
        };

        Meteor.call('commentSubmit', comment, function(err, commentId){
            console.log('comment ok ' + commentId);
        });
    }
})