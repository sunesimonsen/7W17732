define([
    'require',
    'collections'
], function(require, collections){
    var fetchSession = function(callback) {
        $.ajax("home.json", {
            method: "GET",
            dataType: "json",
            success: function(data) {
                return callback(data);
            }
        });
    };

    var redirectIfNot = function (router, constraints, callback) {
        fetchSession(function (data) {                
            if (collections.contains(constraints, "authenticated") && !data.authenticated) {
                router.navigate("login", true);
            } else if (collections.contains(constraints, "connected") && !data.connected) {
                router.navigate("connect", true);
            } else {
                callback();
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
                router.navigate("home", false);
            });
        }
    });

    var router = new AppRouter();
    Backbone.history.start();
    
    return router;
});
