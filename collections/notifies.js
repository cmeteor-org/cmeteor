Notifies = new Meteor.Collection('notifies');

Notifies.allow({
    update: root.ownDoc
});

Notifies.deny({
    update: root.ownFields.bind(null, ['read'])
});