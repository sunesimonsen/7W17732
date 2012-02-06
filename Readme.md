# Introduction #

## Require.js ##

## Backbone.js ##

## jQuery ##

## jQueryUI ##
## Blueprint ##

### Start the lab ### 

Run the following command in the console to start the lab: 

    mvn lab:init

### Step 0: Start the application ###

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

### Step 1: Redirect to login if not authenticated ###

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

## Step 2: Login to application ##

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

Goto the next step by running:
    
    mvn lab:next

## Step 3: Showing Twitter timeline ##

I this step we will use Backbone's collections and models to retrieve tweets from the server and show them on the home page.

First we need to implement the model for a tweet.

Open the file client/js/models/Tweet.js in your editor.

Making a new model is easy. A <a href="http://documentcloud.github.com/backbone/#Model">Backbone model</a> provides sensible defaults and a lot of features out of the box. 

You don't actually need to change anything here, because the defaults are sufficient. But notice that we return the prototype for a tweet instead of a new instance of the tweet. That is because we need to create multiple instances of the tweet model.

Now open the client/js/collections/HomeTimeline.js file in you editor.

As you can see the module depends on the tweet model and defines a new <a href="http://documentcloud.github.com/backbone/#Collection">Backbone collection</a>.

The first thing we need to specify the the model the elements in the collection should use and the url on the server that the collection maps to and :

    var HomeTimeline = Backbone.Collection.extend({
        model: Tweet,
        url: 'twitter/timeline/home'
    });

When the <a href="http://documentcloud.github.com/backbone/#Collection-fetch">fetch</a> is called on the collection a HTTP GET will be issued to the url of the collection. For each element in the returned JSON a model will be created. There is just one problem, the server does not return a JSON array but a root element. So we need to add a parse method to the collection to retrieve the array:

    parse: function(response) {
        return response.tweetList;
    }

Finally we want to sort the tweets by their creation time:

    comparator: function (tweet) {
        return -tweet.get("createdAt");
    }

Now we just need to render the tweets. Open the client/js/views/TimelineView.js file in your editor.

First of all <a href="http://documentcloud.github.com/backbone/#Events-on">bind</a> the <i>reset</i> event on the timeTimeline collection to the render method and call fetch on the collection: 

    initialize: function() {
        homeTimeline.on('reset', this.render, this);
        homeTimeline.fetch();
    }
    
When the elements are fetched from the server the <i>reset</i> event will be triggered on the collection and the render method will be called.

We can then in the render method display the tweets on the view. Add the following code to the render method after the template has been inserted in the root element.

    var timeline = this.$("> ul");
    homeTimeline.each(function (tweet) {
        var view = new TweetView({model: tweet});
        timeline.append(view.render());
    });
    
First we find the ul element just below the root element. Notice it is important to be quite strict when selecting elements in views that contains sub views. Then we treverse all the elements of the home timeline collection, create a new TweetView for each model and append the rendered view to the timeline element.

Finally we need to implement the TweetView. Open the client/js/TweetView.js file in your editor.

We will use the <a href="http://underscorejs.org/#template">template</a> method of the <a href="http://underscorejs.org/">underscore.js</a> library to render the tweet views. 

Take a look at the file client/views/TweetView.html and notice that it contains inline JavaScript code.

We would like to compile the template against a JSON version of the model. That is achieved by placing the following code in the render method:

    $(this.el).html(_.template(template, this.model.toJSON()));

This line turns the model into JSON compiles the template against the data using the underscore.js library and places the html in the root element of the view. 

If you refresh the home page, you should see your home timeline.

Goto the next step by running:
    
    mvn lab:next
    
## Step 4: Tweeting your first tweet ##    
  
