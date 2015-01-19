Template.postEdit.helpers({
    post: function(){
        return Posts.findOne(Router.current().params['id']);
    },
    markdown_data: function(){
        return Session.get('markdown_data');
    }
});

Template.postEdit.events({
    'click #btn-post-edit': function(e){
        e.preventDefault();
        root.clearErrors();
        var title = $('#ta-post-title').val();
        var content = $('#ta-post-content').text();
        if(!validStringLength(title, 2, 28, root.throwError.bind(null, '标题的长度应该在2-28之间！'))) {
            return false
        }
        if(!validStringLength(content, 10, 10000, root.throwError.bind(null, '正文的长度应该在10-10000之间！'))) {
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
        root.clearErrors();

        var btn = $(e.target);
        var $preview = $('#p-post-preview');
        var $content = $('#ta-post-content');

        if(btn.attr('value') === 'preview'){
            Session.set('markdown_data', $content.text());
            $preview.show();
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
