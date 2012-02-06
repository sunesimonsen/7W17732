define([
    'models/Context'
], function (context) {
    var redirectIfNot = function (constraints, callback) {
        context.fetch({
            success: function (model) {
                if (_.include(constraints, "authenticated") && !model.get("authenticated")) {
                    require("router").navigate("login", true);
                } else if (_.include(constraints, "connected") && !model.get("connected")) {
                    require("router").navigate("connect", true);
                } else {
                    callback();
                }
            }
        });
    };
    
    return redirectIfNot;
});