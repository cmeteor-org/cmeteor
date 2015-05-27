var cm;

Template.post.rendered = function() {
    var options = {
        element: $('#editor')[0]
    };
    var editor = new Editor(options);
    cm = editor.codemirror;
    var postId = Router.current().params['id'];
    Notifies.find({read:false, postId: postId, userId: Meteor.userId()}).forEach(function(notify){
        Notifies.update(notify._id, {$set: {read: true}});
    });
};

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
        var commentMsg = cm.getValue();
        // var post = Posts.findOne(location.pathname.replace(/\/post\//g, ''));
        var postId = Router.current().params['id'];
        Meteor.call('commentSubmit', commentMsg, postId, function(err){
            if(err){
                return flushMsg(err.reason);
            }
            cm.setValue('');
        });
    }
});