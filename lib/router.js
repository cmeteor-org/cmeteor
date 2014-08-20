Router.configure({
    layoutTemplate: 'layout',
    yieldTemplates: {
        'header': {to: 'header'}
    },
    notFoundTemplate: 'notFoundTemplate'
})

Router.map(function(){
    this.route('index', {
        path: '/',
        waitOn: function(){
            return Meteor.subscribe('posts', this.params.page || 0);
        }
    });

    this.route('notFound',{
        path: '/404',
        template: 'notFoundTemplate'
    });

    this.route('login');

    this.route('signup');

    this.route('postSubmit', {
        path: '/post/submit'
    });

    this.route('postEdit', {
        path: '/post/edit/:id',
        waitOn: function(){
            return Meteor.subscribe('post', this.params.id);
        }
    });

    this.route('post', {
        path: '/post/:id',
        waitOn: function(){
            return [Meteor.subscribe('post', this.params.id),
                    Meteor.subscribe('comments', this.params.id)];
        }
    });

});

// Router.onBeforeAction('dataNotFound');