root = typeof exports !== 'undefined' && exports !== null ? exports : this;

root.validStringLength = function(str, min, max, callback) {
    if (!typeof str === 'string')
        return false;
    str = str.trim();
    if (arguments.callee.length === 3 &&
        parseInt(min, 10) && str.length >= parseInt(min, 10)) {
        return true;
    }
    if (arguments.callee.length === 4 &&
        parseInt(min, 10) && str.length >= parseInt(min, 10) &&
        parseInt(max, 10) && str.length <= parseInt(max, 10)) {
        return true;
    }
    typeof max == 'function' ? max.apply() : callback.apply();
    return false;
};

root.validEmailFormat = function(email, callback) {
    // refer http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return true
    } else {
        callback.apply && callback.apply();
        return false;
    }
};

root.flushMsg = function(options) {
    if (typeof options === 'string') {
       return $.toast( _.extend(TOAST_INFO, {heading:'提示', text: options})); 
    }
    if (typeof options === 'object') {
        return $.toast( _.extend(TOAST_INFO, options));     
    }
    return $.toast( _.extend(TOAST_INFO, {heading:'提示', text: '未知提示信息: ' + options})); 
    
}

root.ownDoc = function(userId, doc) {
    return doc && doc.userId === userId;
};

root.ownFields = function(fields, userId, collection, fieldNames) {
    var argus = [fieldNames].concat(fields);
    return _.without.apply(null, argus).length > 0;
};
root.getTime = function() {
    var date = new Date();
    return date.getTime();
};
if (Meteor.isServer) {
    root.throwError = function(errorCode, errorMsg) {
        throw new Meteor.Error(errorCode, errorMsg);
    }
}