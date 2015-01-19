Template.signup.events({
    'focusout #password1': function(e) {
        e.preventDefault();
        var password = $('#password').val();
        var password1 = $('#password1').val();
        if (password != password1) {
            return root.throwError('两次密码不一致');
        }
    },
    'click #btn-signup-reset': function(e) {
        e.preventDefault();
        $('input').val('');
    },
    'click #btn-signup': function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var password1 = $('#password1').val();

        if (!validStringLength(username, 5, 16, root.throwError.bind(null, '用户名的长度应该在5-16之间！')))
            return false;
        if (!validEmailFormat(email, root.throwError.bind(null, '输入的邮箱格式不对！')))
            return false;
        if (!validStringLength(password, 5, 16, root.throwError.bind(null, '密码的长度应该在5-16之间！')))
            return false;
        if (password !== password1) {
            return root.throwError('两次密码不一致');
        }

        Accounts.createUser({
            username: username,
            email: email,
            password: password
        }, function(err) {
            if (err) {
                console.log('Meteor.methods signup:', err);
                root.throwError('创建用户失败！');
            } else {
                Router.go('index');
            }
        })

    }
});