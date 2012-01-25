define([
    'views/login'
], function(login){
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
            // Call render on the module we loaded in via the dependency array
            // 'views/projects/list'
            login.render();
        },
        showConnect : function () {
            
        },
        defaultAction: function(actions){
            var that = this;
            
            fetchSession(function (data) {

                var hasRelation = function (relation) {
                    return function (action) {
                        return relation === action.relation;
                    };
                };
                
                if (_.any(data.homeModel.actions, hasRelation("signin"))) {
                    that.navigate("login", true);
                } else {
                    that.navigate("connect", true);
                }
            });

        }
    });

    var router = new AppRouter();
    Backbone.history.start();
    
    return router;
});