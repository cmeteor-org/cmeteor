Meteor.publish('posts', function(){
    return Posts.find();
});

Meteor.publish('post', function(id){
    return Posts.find(id);
});

Meteor.publish('comments', function(postId){
    return Comments.find({postId:postId});
});