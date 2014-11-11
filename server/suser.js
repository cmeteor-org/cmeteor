Meteor.methods({
  setPassword:function(password) {
        check(password,String);
        if (this.userId) {
          Accounts.setPassword(this.userId,password);
        } else {
          return false;
        }
  },
});

