Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFoundTemplate'

})

Router.map(function(){
    this.route('index', {
        path: '/',
        // template: 'index',
        // layoutTemplate: 'layout',
        yieldTemplates: {
            'header': {to: 'header'}
        },
        waitOn: function(){
            return Meteor.subscribe('posts');
        }
    });

    this.route('login', {
        path: '/login',
        yieldTemplates: {
            'header': {to: 'header'}
        }
    });

    this.route('signup', {
        path: '/signup',
        yieldTemplates: {
            'header': {to: 'header'}
        }
    });
});