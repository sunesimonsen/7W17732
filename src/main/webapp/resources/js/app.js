// Configure Require.js paths
require.config({
    baseUrl: "resources/js",
    paths : {
        'plugins' : '../jslibs/plugins'
    }
});

@BEGIN_VERSION 1
// Load our router and start history tracking
require(['router'], function(appRouter){
    Backbone.history.start();
});
@END_VERSION 1
