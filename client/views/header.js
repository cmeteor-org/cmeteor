Template.header.events({
    'click #a-logout': function(e){
        e.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
})