root = typeof exports !== 'undefined' && exports !== null ? exports : this;

root.validStringLength = function(str, min, max, callback){
    if(! typeof str == 'string')
        return false;
    var str = str.trim();
    if(arguments.callee.length == 3 && 
        parseInt(min) && str.length >= parseInt(min)){
        return true;
    }
    if(arguments.callee.length == 4 &&
        parseInt(min) && str.length >= parseInt(min) &&
        parseInt(max) && str.length <= parseInt(max)){
        return true;
    }
    typeof max == 'function' ? max.apply() : callback.apply();
    return false;
}

root.ownDoc = function(userId, doc) {
    return doc && doc.userId === userId;
}

root.ownFields = function(fields, userId, collection, fieldNames){
    var argus = [fieldNames].concat(fields);
    return _.without.apply(null, argus).length > 0;
}

if(Meteor.isServer){
    root.throwError = function(errorCode, errorMsg){
        throw new Meteor.Error(errorCode, errorMsg);
    }
}