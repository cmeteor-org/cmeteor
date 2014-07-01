Meteor.publish('posts', function(page){
    if(!parseInt(page) || page < 0)
        page = 0;
    return Posts.find({},{
        limit: 10,
        skip: 10*page
    });
});

Meteor.publish('post', function(id){
    return Posts.find(id);
});

Meteor.publish('comments', function(postId){
    return Comments.find({postId:postId});
});

Meteor.publish('notifies', function(){
    var user = Meteor.user();
    if(user){
        return Notifies.find({userId: user._id, read: false});
    }
});