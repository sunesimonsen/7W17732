require.config({
    baseUrl: "resources/js",
    paths : {
        'plugins' : '../jslibs/plugins'
    }
});

// Load our app module and pass it to our definition function
require(['router'], function(appRouter){
    Backbone.history.start();
});
