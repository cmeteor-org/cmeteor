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
                throwError('输入有误！请重新输入！')
            }else{
                Router.go('index');
            }
        })
    },
    'keydown': function(e){
        if(e.keyCode == 13)
            $('#btn-login').trigger('click')
    }
})