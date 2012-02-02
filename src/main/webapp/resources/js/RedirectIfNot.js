define([
    'models/Context'
], function (context) {
    var redirectIfNot = function (router, constraints, callback) {
        context.fetch({
            success: function (model) {
                if (_.include(constraints, "authenticated") && !model.get("authenticated")) {
                    router.navigate("login", true);
                } else if (_.include(constraints, "connected") && !model.get("connected")) {
                    router.navigate("connect", true);
                } else {
                    callback();
                }
            }
        });
    };
    
    return redirectIfNot;
});