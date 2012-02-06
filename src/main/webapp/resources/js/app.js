require.config({
    baseUrl: "resources/js"
    
    // Development purpose, remove for production
    //urlArgs: "bust=" +  (new Date()).getTime() 
});

// Load our app module and pass it to our definition function
require(['router'], function(appRouter){
    Backbone.history.start();
});
