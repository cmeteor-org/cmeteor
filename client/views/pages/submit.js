Template.submit.events({
    'click #btn-submit': function(e){
        e.preventDefault();
        var post = {
            title: $('#ta-title').val(),
            content: $('#ta-content').val()
        };
        Meteor.call('postSubmit', post, function(err, postId){
            console.log('submit ok : ' + postId);
            Router.go('index');
        });
    }
})