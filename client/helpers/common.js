root = typeof exports !== 'undefined' && exports !== null ? exports : this;

root.throwError = function(msg) {
    Errors.insert({
        msg: msg,
        seen: false
    });
};

root.clearErrors = function() {
    Errors.remove({
        seen: true
    });
};