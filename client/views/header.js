Template.header.events({
    'click #a-logout': function(e){
        e.preventDefault();
        Meteor.logout();
    },
    'mouseenter li': function(e){
        $(e.target).addClass('active');
    },
    'mouseleave li': function(e){
        $(e.target).removeClass('active');
    }
});

Template.header.helpers({
    notifyCount: function(){
        return Notifies.find({read: false}).count();
    }
});