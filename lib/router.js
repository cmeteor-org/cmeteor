Router.configure({
    layoutTemplate: 'layout',
    yieldTemplates: {
        'header': {to: 'header'},
        'footer': {to: 'footer'}
    },
    subscriptions: function(){
        this.subscribe('notifies');
    },
    notFoundTemplate: 'notFoundTemplate',
    loadingTemplate: 'loading'
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
            return Meteor.subscribe('post', this.params.id);
        },
        action: function(){
            if(this.ready()){
                this.render();
            }else{
                this.render('loading');
            }
        }
    });

    this.route('post', {
        path: '/post/:id',
        subscriptions: function(){
            return [Meteor.subscribe('post', this.params.id),
                Meteor.subscribe('comments', this.params.id)];
        },
        action: function(){
            if(this.ready()){
                this.render();
            }else{
                this.render('loading');
            }
        }
    });

    this.route('userhome',{
        path:'/userhome'
    });

});

// Router.onBeforeAction('dataNotFound');
