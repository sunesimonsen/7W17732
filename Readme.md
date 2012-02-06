# Introduction #

## Require.js ##

## Backbone.js ##

## jQuery ##

## jQueryUI ##

### Start the lab ### 

Run the following command in the console to start the lab: 

    mvn lab:init

### Step 1: Start the application ###

In this step we will start the application by requiring the Application <a href="http://documentcloud.github.com/backbone/#Router">Backbone Router</a> using Require.js.

Notice that index.html has a reference to require.js with a data-main attribute pointing to the application entry point. 

    <script data-main="resources/js/app" src="resources/jslibs/require.js"></script>

Open the file client/js/app.js and add the following lines to the end of the file: 

    require(['router'], function(appRouter){
        Backbone.history.start();
    });

This will require the router module asynchronously and call the given function with the loaded module. In order to start listening for url changes we start the <a href="http://documentcloud.github.com/backbone/#History">Backbone history</a> tracking when the router is loaded.

That the application with the following command in a console an let it run in the backgroud. There should be no need to restart the server: 
    
    mvn jetty:run

Open the following adresse in a browser: 

    http://0.0.0.0:8080/7W17732/

You should see the following message:

    You now have a running application

Goto the next step by running:
    
    mvn lab:next

### Step 2: Redirect to login if not authenticated ###

Open the file client/js/router in your editor. 

Notice how the router is defined as a Require.js module that depends on the modules <i>require</i> and <i>redirectIfNot</i>.

In the module we create a Backbone router that is returned to other modules that depends on the router.

I added a call to navigate to the home page, but the home page should only be accessible to authenticated users. So we will redirect the user to the login page if he is not authenticated.

We will use the helper method <i>redirectIfNot</i> to make the redirect is the given constaints are not fulfilled. This method makes a call to the server in order to figure out the current state of the application and users the <a href="http://documentcloud.github.com/backbone/#Router-navigate">navigate</a>. method on the router to handle the redirect.

Put the following line in the home method: 

    $('body').append("<h2>This is the home screen</h2>");

into the callback for the <i>redirectIfNot</i> method:

    redirectIfNot(this, ["authenticated"], function () {
        $('body').append("<h2>This is the home screen</h2>");
    });

We also need to add a new route for login to the router the is connected to the showLogin method:

    routes: {
        'home': 'home',
        'login': 'showLogin',
        // Default
        '*actions': 'defaultAction'
    },

Finally we need to implement the showLogin method. Instead of loading all the view when we load the main module, we can chose to load modules on demand. Add the following method to the router:

    showLogin: function(){
        require(['views/Login'], function (view) {
            view.render();
        });
    },

Notice how we get the login view dependency in the callback method and call render on the view.

When you refresh the browser you should be redirected to the login page.

Goto the next step by running:
    
    mvn lab:next

## Step 3: Login to application ##

Open the file client/views/Login.js in you editor.

This module has a special dependency, that uses the Require.js <a href="http://requirejs.org/docs/api.html#text">text</a> plugin. This plugin is capable of loading text files as strings. This is really useful loading html template files, and in this case the views/Login.html file.

In the module we define a new <a href="http://documentcloud.github.com/backbone/#View">Backbone view</a> that is attacted to the element in the index.html page with the id <i>container</i>. In the <a href="http://documentcloud.github.com/backbone/#View-render">render</a> function for this view we replace the content of the root element with the loaded template.

First of all let's change the Login button to a <a href="http://jqueryui.com/demos/button/">jQuery UI button</a> by added the following line to the render method. 

    this.$('button').button();

Backbone provides us with a reference to jQuery that is relative to the root element of this view. You could achieve the same by issuing the following command: 

    $('button', this.el).button();

That means: find the button element in the root element of the view and turn it into a jQuery UI button.

It is a really good idea to make almost all you jQuery code be relative to an element that is a close ancestor to the elements you would like to work on. That make the code much more modular and helps avoiding situations where different parts of the code affect other parts unexpectedly. The same can be said for CSS, always limit your styles as much as possible.

Now let's add a click handler for the button. With plain jQuery would you just added the <a href="http://api.jquery.com/click/">click handler</a> to the element as seen below:

    $('button', this.el).click(function () {
        ...
    });

But as this is really common Backbone support adding event handlers to elements below the root element in an easy way.

Add the following code to the events field.

    events: {
        'click button' : 'click'
    }
    
This binds the click event of the elements below the root element that matches the CSS selector <i>button</i> to the click method on this view.

Now add a click method to the view: 

    click : function () {
        console.log('clicked');
    }

Make sure that the click handler is fired when clicking on the button.

Finally we will make an <a href="http://api.jquery.com/jQuery.ajax/">AJAX</a> call to the Spring authenticate method on the server.

Added the following click method to the view:

    click : function () {
    	var that = this;
    	        
    	var success = function(data, textStatus, jqXHR) {
    	    if (data === "success") {
    	        that.clearErrorMessage();
    	        require("router").navigate("home", true);
    	    } else {
    	        that.setErrorMessage("Error logging in");
    	    }
    	};
    	
    	var error = function (jqXHR, textStatus, errorThrown) {
    	    that.setErrorMessage(textStatus);
    	};
    	
    	$.ajax({
    	    url : "signin/authenticate",
    	    type : "POST",
    	    data : that.$("form").serialize(),
    	    success : success,
    	    error : error
    	});
    
        return false;
    }

We <a href="http://api.jquery.com/serialize/">serialize</a> the form to be www-form-urlencoded and send it off. If the user was authenticated we redirect the router to <i>home</i>; otherwise we show an error.

Take a look at the <i>setErrorMessage</i> method to see how jQuery calls can be chained together.

Try to log in with a wrong user name and password. Then you should see the error message.

Then try to login with one of the users shown on the login box. You should be redirected to the Twitter connect page.