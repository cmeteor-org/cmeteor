Template.index.helpers({
    posts: function(){
        var posts = [];
        Posts.find().fetch().forEach(function(post){
            post.fromNow = moment(post.submited).fromNow();
            posts.push(post);
        });

        return posts;
    }
});