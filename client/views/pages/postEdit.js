var cm;


Template.postEdit.rendered = function() {
    var options = {
        element: $('#editor')[0]
    };
    var editor = new Editor(options);
    cm = editor.codemirror;
};

Template.postEdit.helpers({
    postObj: function() {
        return Posts.findOne(Router.current().params['id']);
    }
});

Template.postEdit.events({
    'click #btn-post-edit': function(e){
        e.preventDefault();
        var title = $('#ta-post-title').val();
        var content = cm.getValue();
        // var content = postEditor.editor.getValue();
        if (title.length < 2 || title.length > 28) {
            return flushMsg('标题的长度应该在2-28之间！');
        }

        if (content.length < 10 || content.length > 10000) {
            return flushMsg('正文的长度应该在10-10000之间！');
        }

        var postId = Router.current().params['id'];
        Meteor.call('postEdit', title, content, postId, function(err){
            if(err){
                return flushMsg(err.reason);
            }
            Router.go('post', {id: postId});
        });
    }
});