Template.signup.events({
    'click #btn-signup': function(e) {
        e.preventDefault();
        var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var password1 = $('#password1').val();

        if (username.length < 5 || username.length > 16) {
            return flushMsg('用户名的长度应该在5-16之间! ');
        }
        if (!emailReg.test(email)) {
            return flushMsg('请键入正确的邮箱');
        }

        if (password.length < 5 || password.length > 16) {
            return flushMsg('密码的长度应该在5-16之间!');
        }

        if (password !== password1) {
            return flushMsg('两次键入的密码不一致');
        }

        $('.account-input-group').find('input').val('');

        Accounts.createUser({
            username: username,
            email: email,
            password: password
        }, function(err) {
            if (err) {
                console.log('Meteor.methods signup:', err);
                return flushMsg({heading: '抱歉', text: '创建用户失败, 请重新注册'});
            } else {
                Router.go('index');
            }
        });
    }
});