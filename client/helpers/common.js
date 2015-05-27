//
//this.cache = {
//    panel:{}
//};
this.throwError = function(msg) {
    Errors.insert({
        msg: msg,
        seen: false
    });
};

this.clearErrors = function() {
    Errors.remove({
        seen: true
    });
};

