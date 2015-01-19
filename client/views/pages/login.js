Template.login.events({
    'click #btn-signup': function(e){
        e.preventDefault();
        Router.go('/signup');
    },
    'click #btn-login': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username.length === 0 || password.length === 0) {
            return root.throwError('输入有误！请重新输入！')
        }
        Meteor.call('isRegisted', username, function(err, isRegisted) {
            if (err) {
                return root.throwError(err.reason)
            }
            if (!isRegisted) {
                return root.throwError('请先注册')
            }
            Meteor.loginWithPassword(username, password, function(err){
                if(err){
                    console.log(err.reason);
                    root.throwError('输入有误！请重新输入！')
                }else{
                    Router.go('index');
                }
            });
        });

    },
    'keydown': function(e){
        if(e.keyCode == 13)
            $('#btn-login').trigger('click')
    }
})