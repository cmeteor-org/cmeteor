var cm;


Template.postSubmit.rendered = function() {
    var options = {
        element: $('#editor')[0]
    };
    var editor = new Editor(options);
    cm = editor.codemirror;
};

Template.postSubmit.events({
    'click #btn-post-submit': function(e){
        e.preventDefault();
        var content = cm.getValue();
        var title = $('#ta-post-title').val();
        if (title.length < 2 || title.length > 28) {
            return flushMsg('标题的长度应该在2-28之间！');
        }
        if (content.length < 10 || content.length > 10000) {
            return flushMsg('正文的长度应该在10-10000之间！'); 
        }

        Meteor.call('postSubmit', title, content, function(err, postId){
            if(err){
                return flushMsg(err.reason); 
            }
            Router.go('post', {id: postId});
        });
    }
});
