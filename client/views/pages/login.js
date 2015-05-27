Template.login.events({
    'click #btn-login': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username.length === 0 || password.length === 0) {
            return flushMsg('你调皮了, 填完数据再提交');
        }
        Meteor.call('isRegisted', username, function(err, isRegisted) {
            if (err) {
                return flushMsg(err.reason);
            }
            if (!isRegisted) {
                return flushMsg('请先注册');
            }
            Meteor.loginWithPassword(username, password, function(err){
                if(err){
                    return flushMsg(err.reason);
                }else{
                    Router.go('index');
                }
            });
        });

    },
    'keydown #password': function(e){
        if(e.keyCode == 13) $('#btn-login').trigger('click')
    }
})