define([
], function(){
    return {
        contains : function (list, value) {
            return _.any(list, function (e) { return e === value;  });
        }
    };
});