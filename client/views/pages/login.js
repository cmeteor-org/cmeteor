Template.login.events({
    'click #btn-signup': function(e){
        e.preventDefault();
        Router.go('/signup');
    },
    'click #btn-login': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        Meteor.loginWithPassword(username, password, function(err){
            if(err){
                console.log(err);
            }else{
                Router.go('/');
            }
        })
    }
})