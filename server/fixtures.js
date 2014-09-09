var initData = function(){
    console.log('====   Init demo data');

    Accounts.createUser({
        username: 'demo',
        email: 'demo@cmeteor.org',
        password: 'cmeteor'
    });
    Accounts.createUser({
        username: 'hello',
        email: 'hello@cmeteor.org',
        password: 'cmeteor'
    });

    var demo = Meteor.users.findOne({'username': 'demo'});
    var hello = Meteor.users.findOne({'username': 'hello'});

    Posts.insert({
        title: 'What is Meteor?',
        content: '<p>A library of packages: pre-written, self-contained modules that you might need in your app.\
                    There are about a dozen core Meteor packages that most any app will use (for example webapp, \
                    which handles incoming HTTP connections, and templating, which lets you make HTML templates \
                    that automatically update live as data changes). Then there are optional packages like email, \
                    which lets your app send emails, or the Meteor Accounts series (account-password, \
                    accounts-facebook, accounts-ui, and others) which provide a full-featured user account system \
                    that you can drop right into your app. And beyond these "official" packages, there are hundreds\
                     of community-written packages in Atmosphere, one of which might do just what you need.</p>',
        userId: demo._id,
        author: demo.username,
        visitedCount: 0,
        submited: new Date().getTime(),
        lastModified: new Date().getTime(),
        commentedCount: 0
    });

    Posts.insert({
        title: 'A command-line tool called meteor.',
        content: '<p>meteor is a build tool analogous to make, rake, or the non-visual parts of Visual Studio. It \
                    gathers up all of the source files and assets in your application, carries out any necessary \
                    build steps (such as compiling CoffeeScript, minifying CSS, building npm modules, or generating \
                    source maps), fetches the packages used by your app, and outputs a standalone, ready-to-run \
                    application bundle. In development mode it can do all of this interactively, so that whenever \
                    you change a file you immediately see the changes in your browser. It\'s super easy to use out \
                    of the box, but it\'s also extensible: you can add support for new languages and compilers by \
                    adding build plugin packages to your app.</p>',
        userId: hello._id,
        author: hello.username,
        visitedCount: 0,
        submited: new Date().getTime(),
        lastModified: new Date().getTime(),
        commentedCount: 0
    });

    var post = Posts.findOne();

    Comments.insert({
        postId: post._id,
        content: 'It\'s good.',
        userId: hello._id,
        author: hello.username,
        submited: new Date().getTime()
    });
    Posts.update(post._id, {$inc: {commentedCount: 1}});

    Notifies.insert({
        userId: hello._id,
        postId: post._id,
        postTitle: post.title,
        msgNum: 0, // root.NOTIFIES
        read: false
    });

    for(var i=0; i<20; i++){
        Posts.insert({
            title: 'Test ' + i,
            content: 'Test content ' + i,
            userId: hello._id,
            author: hello.username,
            visitedCount: i,
            submited: new Date().getTime(),
            lastModified: new Date().getTime(),
            commentedCount: 0
        });
    }
}

if(process.env.NODE_ENV == 'development'){
    if(Meteor.users.find().count() == 0)
        initData();
}
