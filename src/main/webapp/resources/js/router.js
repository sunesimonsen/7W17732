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
            // Default
            '*actions': 'defaultAction'
        },
        showLogin: function(){
            require(['views/login'], function (loginView) {
                loginView.render();
            });
        },
        showConnect : function () {
            redirectIfNot(this, ["authenticated"], function () {
                require(['views/connect'], function (connectView) {
                    connectView.render();
                });
            });
        },
        defaultAction: function(actions){
            var that = this;
            
            redirectIfNot(this, ["authenticated", "connected"], function () {
                console.log("success"); 
            });
        }
    });

    var router = new AppRouter();
    Backbone.history.start();
    
    return router;
});
