Template.signup.events({
    'click #btn-signup-reset': function(e){
        e.preventDefault();
        $('#username').val('');
        $('#email').val('');
        $('#password').val('');
    },
    'click #btn-signup': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();

        if(!username){
            return throwError('请输入用户名！');
        }
        if(!email){
            return throwError('请输入邮箱！');
        }
        if(!password){
            return throwError('请输入密码！');
        }
        
        Accounts.createUser({
            username: username,
            email: email,
            password: password
        }, function(err){
            if(err){
                console.log(err);
                throwError('创建用户失败！');
            }else{
                Router.go('index');
            }
        })

    }
})