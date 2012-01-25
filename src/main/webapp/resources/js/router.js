define([
    'require'
], function(require){
    var fetchSession = function(callback) {
        var that = this;
        
        $.ajax("home.json", {
            method: "GET",
            dataType: "json",
            success: function(data) {
                return callback(data);
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
            require(['views/connect'], function (connectView) {
                connectView.render();
            });
        },
        defaultAction: function(actions){
            var that = this;
            
            fetchSession(function (data) {                
                if (!data.authenticated) {
                    that.navigate("login", true);
                } else if (!data.connected) {
                    that.navigate("connect", true);
                }
            });

        }
    });

    var router = new AppRouter();
    Backbone.history.start();
    
    return router;
});
