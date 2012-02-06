# Introduction #

## Require.js ##

## Backbone.js ##

## jQuery ##

## jQueryUI ##

- Start application
In this step we will start the application by requiring the Application Router using Require.js and start backbone history tracking.

Notice that index.html has a reference to require.js with a data-main attribute pointing to the application entry point. 

    <script data-main="resources/js/app" src="resources/jslibs/require.js"></script>

Open the file client/js/app.js and add the following lines to the end of the file: 

    require(['router'], function(appRouter){
        Backbone.history.start();
    });

This will require the Router module asynchronously and call the given function with the loaded module.

- Make router redirect to login if not authenticated


Integrate with Spring Security to log into backend


