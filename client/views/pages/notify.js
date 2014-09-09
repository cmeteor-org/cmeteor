Template.notify.helpers({
    notifies: function(){
        return  Notifies.find().map(function(notify){
            notify.msg = root.NOTIFIES[notify.msgNum];
            notify.postTitle = notify.postTitle.slice(0,20);
            notify.read ? notify.isRead = 'read' : delete notify.isRead;
            return notify;
        });
    }
})