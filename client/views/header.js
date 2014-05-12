Template.header.events({
    'click #a-logout': function(e){
        e.preventDefault();
        Meteor.logout();
    },
    'click #a-submit': function(e){
        e.preventDefault();
        Router.go('submit')
    }
})