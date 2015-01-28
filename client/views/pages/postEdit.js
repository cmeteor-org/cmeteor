var postEditor = null;
Template.postEdit.rendered = function() {
    postEditor = cEdor('ta-post-content');  //the cMeteorEditor for postEdit
    var onePost = Posts.findOne(Router.current().params['id']);
    $('#ta-post-title').val(onePost.title);
    postEditor.editor.setValue(onePost.content);
};
//
//Template.postEdit.helpers({
//    post: function(){
//        return Posts.findOne(Router.current().params['id']);
//    }
//});

Template.postEdit.events({
    'click #btn-post-edit': function(e){
        e.preventDefault();
        clearErrors();
        var title = $('#ta-post-title').val();
        var content = postEditor.editor.getValue();
        if(!validStringLength(title, 2, 28, throwError.bind(null, '标题的长度应该在2-28之间！'))) {
            return false
        }
        if(!validStringLength(content, 10, 10000, throwError.bind(null, '正文的长度应该在10-10000之间！'))) {
            return false
        }

        var postId = Posts.findOne(Router.current().params['id'])._id;
        Meteor.call('postEdit', title, content, postId, function(err){
            if(err)
                return root.throwError(err.reason);
            Router.go('post', {id: postId});
        });
    },
    'click #btn-post-preview': function(e){
        e.preventDefault();
        clearErrors();
        var btn = $(e.target);
        var $preview = $('#p-post-preview');
        var $content = $('#ta-post-content');
        if(btn.attr('value') === 'preview'){
            $preview.show().html(postEditor.mk(postEditor.editor.getValue()));
            $content.hide();
            btn.attr('value', 'modify');
            btn.text('修改');
        }else if(btn.attr('value') === 'modify'){
            $preview.hide();
            $content.show();
            btn.attr('value', 'preview');
            btn.text('预览');
        }
    }
});