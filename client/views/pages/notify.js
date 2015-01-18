Template.notify.helpers({
    notifies: function(){
        return  Notifies.find({}, {sort: {submited: -1}}).map(function(notify){
            notify.msg = notify.commentUserName + '在'
                        + moment(notify.submited).fromNow()
                        + root.NOTIFIES[notify.msgNum];
            notify.postTitle = notify.postTitle.slice(0,20);
            notify.read ? notify.isRead = 'read' : delete notify.isRead;
            return notify;
        });
    }
});