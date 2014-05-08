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

});