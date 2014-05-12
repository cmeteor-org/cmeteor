Template.submit.events({
    'click #btn-submit': function(e){
        e.preventDefault();
        var post = {
            title: $('#tt-title').val(),
            content: $('#tt-content').val()
        };
        Meteor.call('submit', post, function(err, postId){
            console.log('submit ok : ' + postId);
            Router.go('index');
        });
    }
})