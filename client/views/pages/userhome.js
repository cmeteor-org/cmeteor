Template.userhome.events({

  'focusout #oldpassword': function (e){
    e.defaultPrevented;
    var oldPassword = $('#oldpassword').val();
    var password = oldPassword;
    Accounts.changePassword(oldPassword, password, function (err){
      if (err) {
        return root.throwError('密码输入错误，请重新输入');
      }
    })
  },
  'focusout #newpassword1': function (e){
    e.defaultPrevented;
    var password = $('#newpassword').val();
    var password1 = $('#newpassword1').val();
    if (password != password1) {
      return root.throwError('两次密码不一致');
    }
  },
  'click #btn-submit': function (e){
    e.defaultPrevented;
    var password = $('#newpassword').val();
    var password1 = $('#newpassword1').val();
    if (password != password1) {
      return root.throwError('两次密码不一致');
    }

    Meteor.call('setPassword', password, function (err){
      if (err) {
        return root.throwError('密码设置失败');
      } else {
        Router.go('index');
      }
    });
  }
});
