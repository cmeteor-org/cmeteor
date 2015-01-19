Errors = new Meteor.Collection(null);

Errors.find().observe({
    //确保在一个页面多次throwError 只显示最后一次的error
    //也可以再error template的rendered函数里加clearErrors 但是dom会有跳跃
    added: root.clearErrors
});