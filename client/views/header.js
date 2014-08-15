Template.header.events({
    'click #a-logout': function(e){
        e.preventDefault();
        Meteor.logout();
    },
    'click #a-submit': function(e){
        e.preventDefault();
        Router.go('submit');
    },
    'mouseenter li': function(e){
        $(e.target).addClass('active');
    },
    'mouseleave li': function(e){
        $(e.target).removeClass('active');
    }
})