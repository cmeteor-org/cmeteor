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
            return Meteor.subscribe('posts');
        }
    });

    this.route('notFound',{
        path: '/404',
        template: 'notFoundTemplate'
    })

    this.route('login');

    this.route('signup');

    this.route('submit');

    this.route('post', {
        path: '/post/:id',
        waitOn: function(){
            return Meteor.subscribe('post', this.params.id);
        },
        notFoundTemplate: 'notFoundTemplate',
        data: function(){
            var post = Posts.findOne(this.params.id);
            if(post){
                return {
                    post: post
                }
            }else{
                Router.go('notFound');
            }

        }
    });
});

// Router.onBeforeAction('dataNotFound');