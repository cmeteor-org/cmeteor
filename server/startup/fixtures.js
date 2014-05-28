if(Meteor.users.find().count() === 0){
    console.log('初始化测试数据');

    Accounts.createUser({
        username: 'demo',
        email: 'demo@demo.com',
        password: '123456'
    });
    Accounts.createUser({
        username: 'hello',
        email: 'hello@demo.com',
        password: '123456'
    });

    var demo = Meteor.users.findOne({'username': 'demo'});
    var hello = Meteor.users.findOne({'username': 'hello'});

    var postId = Posts.insert({
        title: '今天的天气怎么样啊',
        content: '今天天气不错',
        userId: demo._id,
        author: demo.username,
        submited: new Date().getTime()
    });

    Posts.insert({
        title: '明天的天气的怎么样',
        content: '明天天气不错',
        userId: hello._id,
        author: hello.username,
        submited: new Date().getTime()
    });

    Comments.insert({
        postId: postId,
        content: '嗯，是啊，天气不错。',
        userId: hello._id,
        author: hello.username,
        submited: new Date().getTime()
    });
}