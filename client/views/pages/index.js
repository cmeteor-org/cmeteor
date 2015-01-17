Template.index.helpers({
    posts: function(){
        var posts = [];
        Posts.find({},{sort: {lastModified: -1}}).map(function(post){
            post.fromNow = moment(post.submited).fromNow();
            posts.push(post);
        });

        return posts;
    },
    haveMore: function(){
        return !Session.get('LIMIT') ||  Session.get('LIMIT') <= Posts.find().count();
    }
});

Template.index.events({
    'click #div-have-more': function(e){
        e.preventDefault();
        var limit = Session.get('LIMIT') || root.LIMIT;
        limit += root.INC;
        Session.set('LIMIT', limit);
        Meteor.subscribe('posts', limit);
    }
})
