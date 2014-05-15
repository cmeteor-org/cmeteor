Errors = new Meteor.Collection(null);

throwError = function(msg){
    Errors.insert({msg: msg, seen: false});
}

clearErrors = function(){
    Errors.remove({seen: true});
}

Errors.find().observe({
    added: clearErrors
});