Template.signup.events({
    'click #btn-signup-reset': function(e){
        e.preventDefault();
        $('#username')[0].value = '';
        $('#email')[0].value = '';
        $('#password')[0].value = '';
    },
    'click #btn-signup': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();

        Accounts.createUser({
            username: username,
            email: email,
            password: password
        }, function(err){
            if(err){
                console.log(err);
            }else{
                Router.go('/');
            }
        })

    }
})