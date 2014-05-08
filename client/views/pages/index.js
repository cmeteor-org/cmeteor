Template.index.helpers({
    posts: function(){
        return Posts.find().fetch();
    }
});