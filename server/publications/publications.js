Meteor.publish('posts', function(){
    return Posts.find();
});

Meteor.publish('post', function(id){
    return Posts.find(id);
});