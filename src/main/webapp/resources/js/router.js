define([
    'require',
    'RedirectIfNot'
], function(require, redirectIfNot){
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
