Router.configure({
    layoutTemplate: 'layout',
    yieldTemplates: {
        'header': {to: 'header'},
        'footer': {to: 'footer'}
    },
    subscriptions: function(){
        this.subscribe('notifies');
    },
    notFoundTemplate: 'notFoundTemplate'
})

Router.map(function(){
    this.route('index', {
        path: '/',
        subscriptions: function(){
            this.subscribe('posts', root.LIMIT);
        }
    });

    this.route('notFound', {
        path: '/404',
        template: 'notFoundTemplate'
    });

    this.route('login');

    this.route('signup');

    this.route('notify');

    this.route('postSubmit', {
        path: '/post/submit'
    });

    this.route('postEdit', {
        path: '/post/edit/:id',
        subscriptions: function(){
            this.subscribe('post', this.params.id).wait();
        }
    });

    this.route('post', {
        path: '/post/:id',
        subscriptions: function(){
            this.subscribe('post', this.params.id).wait();
            this.subscribe('comments', this.params.id).wait();
        }
    });

    this.route('userhome',{
        path:'/userhome'
    });

});

// Router.onBeforeAction('dataNotFound');
