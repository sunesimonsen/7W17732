define([
    'redirectIfNot'
], function(redirectIfNot){
    var AppRouter = Backbone.Router.extend({
        routes: {
            @BEGIN_VERSION 1
            'home': 'home',
            @END_VERSION 1
            @BEGIN_VERSION 2
            'login': 'showLogin',
            'connect': 'showConnect',
            @END_VERSION 2
            // Default
            '*actions': 'defaultAction'
        },
        @BEGIN_VERSION 1
        home : function () {
            @BEGIN_VERSION_ONLY 1
            $('body').append("<h2>This is the home screen</h2>");
            @END_VERSION_ONLY 1
            @BEGIN_VERSION 2
            redirectIfNot(["authenticated", "connected"], function () {
                require(['views/Home'], function (view) {
                    view.render();
                });
            });
            @END_VERSION 2
        },
        @END_VERSION 1
        @BEGIN_VERSION 2
        showLogin: function(){
            require(['views/Login'], function (view) {
                view.render();
            });
        },

        showConnect : function () {
            redirectIfNot(["authenticated"], function () {
                require(['views/Connect'], function (view) {
                    view.render();
                });
            });
        },
        @END_VERSION 2
        defaultAction: function(actions){
            @BEGIN_VERSION_ONLY 0
            $('body').append("<h2>You now have a running application</h2>");
            @END_VERSION_ONLY 0
            @BEGIN_VERSION 1
            this.navigate("home", true);
            @END_VERSION 1
        }
    });
    
    return new AppRouter();
});
