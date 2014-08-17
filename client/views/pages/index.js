Template.index.helpers({
    posts: function(){
        var posts = [];
        Posts.find({},{sort: {submited: -1}}).map(function(post){
            post.fromNow = moment(post.submited).fromNow();
            posts.push(post);
        });

        return posts;
    }
});

Template.index.events({
    // 'click .post': function(e){
    //     e.preventDefault();
    //     var el = e.target;
    //     if(el.nodeName === "SPAN"){
    //         el = el.parentNode;
    //     }
    //     Router.go(el.getAttribute('url'));
    // }
})