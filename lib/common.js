root = typeof exports !== 'undefined' && exports !== null ? exports : this;

root.validStringLength = function(str, min, max, callback){
    if(!typeof str === 'string')
        return false;
    str = str.trim();
    if(arguments.callee.length === 3 && 
        parseInt(min, 10) && str.length >= parseInt(min, 10)){
        return true;
    }
    if(arguments.callee.length === 4 &&
        parseInt(min, 10) && str.length >= parseInt(min, 10) &&
        parseInt(max, 10) && str.length <= parseInt(max, 10)){
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