define([
    'require',
    'models/Context'
], function(require, context){
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

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'login': 'showLogin',
            'connect': 'showConnect',
            'home': 'home',
            // Default
            '*actions': 'defaultAction'
        },
        showLogin: function(){
            require(['views/login'], function (view) {
                view.render();
            });
        },
        showConnect : function () {
            redirectIfNot(this, ["authenticated"], function () {
                require(['views/connect'], function (view) {
                    view.render();
                });
            });
        },
        home : function () {
            redirectIfNot(this, ["authenticated", "connected"], function () {
                require(['views/home'], function (view) {
                    view.render();
                });
            });
        },
        defaultAction: function(actions){
            redirectIfNot(this, ["authenticated", "connected"], function () {
                router.navigate("home", true);
            });
        }
    });

    var router = new AppRouter();
    Backbone.history.start();
    
    return router;
});
