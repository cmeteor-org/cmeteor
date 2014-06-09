Meteor.publish('posts', function(){
    return Posts.find();
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