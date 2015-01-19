Meteor.publish('posts', function(limit){
    if(!parseInt(limit, 10) || limit < 0)
        limit = 0;
    return Posts.find({},{
        limit: limit,
        sort: {lastModified: -1}
    });
});

Meteor.publish('post', function(id) {
    // return Posts.find(id);
    Posts.update(
        {_id: id},
        {$inc: {visitedCount: 1}}
    );
    return Posts.find(id);
});

Meteor.publish('comments', function(postId){
    return Comments.find({postId: postId});
});

Meteor.publish('notifies', function(){
    var user = Meteor.users.findOne(this.userId);
    if(user) {
        return Notifies.find({userId: user._id}, {
            limit: root.NOTIFIES_LIMIT,
            sort: {submited: -1}
        });
    } else {
        return [];
    }
});