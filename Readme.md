## Disclaimer ##

This is still work in progress and will be finished the very last minute. That is just how I work :-). So spelling mistakes and other minor error will be fixed later.

---------------------------------------

## Prerequisite ##

This lab requires some knowledge about <a href="https://developer.mozilla.org/en/JavaScript/A_re-introduction_to_JavaScript" title="JavaScript tutorial">JavaScript</a>. Skill in CSS and HTML would also help.

You also need a Twitter account. If you don't want to mess with you existing account just create a new one, but make sure to follow a few people so you timeline will not be empty.

It is a good idea to have the developer tools installed in you favorite browser.

Before arriving to the KHelg, please execute the following steps. 

    git clone https://github.com/sunesimonsen/7W17732.git
    cd 7W17732
    mvn clean install 
    
When you arrive you should do a the following to synchronize with the latest changes. (If you already have initiated the lab, you'll need to run `mvn lab:reset` first):

    cd 7W17732
    git pull 
    mvn clean install 
    
## Introduction ##

In this lab we will explore how to build a larger single page JavaScript application. We will use a couple of different libraries that I think is appropriate for the job (That does not mean competitive alternatives does not exists). 

JavaScript seems to be growing in popularity, but almost all the projects I have seen, that uses JavaScript to a larger extend, is suffering from structural problems. People kind of forget their good engineering practices when they get down and dirty with JavaScript. That is just plain wrong; JavaScript is extremely dynamic and should be approached with caution.

We will build a Twitter client using the following technologies 

* Require.js
* jQuery 
* Backbone
* jQueryUI
* Underscore.js
* Blueprint.css

Each of the libraries will be explained below.

The lab uses the <a href="https://github.com/jayway/maven-lab-plugin">maven-lab-plugin</a> and gradually progress towards a more or less working Twitter client. 

**Upon finishing a step in the lab all of your changes will be replace by a correct solution**. That means you don't have to complete a step correctly in order to advance to the next step.

Hope you will have fun!

### Require.js ###

<a href="http://requirejs.org/">Require.js</a> is a JavaScript library used for asynchronously loading application modules and handling dependency management.

You define modules the following way using the *define* method: 

File `modules/world.js`:

    define([], function () {
        return "World";
    });

File `modules/hello.js`:

    define(['modules/world'], function (world) {
        return "Hello " + world;
    });
    
File `app.js`:

    require(["modules/hello"], function (hello) {
        console.log(hello);
    });
    
File index.html

    <html>
        <head>
            <script data-main="app" src="require.js"></script>
        </head>
    </html>

When you open index.html in a browser *Require.js* will load the file app.js, that in turn will require the *hello* module. The *hello* module requires the *world* module, *Require.js* therefore downloads `hello.js` and `world.js` files and evaluates the define method of `world.js`. Then the *define* method of hello.js is evaluated  with the result of `world.js` as argument.  

This will result in the following line it the browser log:

    Hello World

### jQuery ###

jQuery is a JavaScript library for manipulating the HTML DOM in a browser independent way. 

Open www.jayway.com in Firefox or Chrome. Try running the following lines in the developer console one by one. You can open the developer console in Chrome by pressing `CS-j` and `CS-k` in Firefox.

    $('.topNavigation a').css({color: 'pink'})
    $("h1 a").fadeOut("slow").fadeIn("slow")
    $('#siteBody .homePageBox .content').css({border: 'thick solid pink'})
    $('#siteBody .homePageBox .content h3:eq(1)').text(".:jQuery:.").css({color: 'red', textAlign: 'center', fontSize: '3em'});

Let's just take a look at what is going on above. `$` is a reference to jQuery, that is uses to select a group of elements to work on using a CSS3 selector. When we have selected a group of element, we tell jQuery what to do with the selected elements.

So the statement below means: Select all links that is nested within an element with the css class *topNavigation* and change the text color to pink.

    $('.topNavigation a').css({color: 'pink'})

Here is a couple of selectors: 

    #foo // selects the element with the id foo
    .foo // selects elements with the css class foo
    #foo .bar // selects elements with the css class foo inside an element with the id bar
    .bar > a // selects links that are a child of an element with the css class bar

There are more selectors, but these are the most important. You can find more information at http://api.jquery.com/category/selectors/

This page shows the selectors in effect: http://codylindley.com/jqueryselectors/

As you can see jQuery is a very powerful tool and is well worth learning. 

### Backbone.js ###

jQuery is fine and all, but if you are going to make a larger JavaScript application it is just not sufficient. It is extremely easy to make spaghetti code with jQuery, some might say it's a kind of a pasta machine. To take care of the overall structuring of your application, you can use a framework like <a href="http://documentcloud.github.com/backbone/">Backbone</a>. Backbone is a MVC framework, it is a little different than a usual MVC as the C stands for collections instead of controller. Backbone is very light weight and easy to understand. 

Backbone consist of different types of objects:

* Router - routing page fragments to handlers
* View - controlling a part of the web page
* Collection - maps a collections of models to a collection resource on the server
* Model - represent a model on the server

A request is received by the router, that in turn invokes a view to display. The view can consist of any number of sub views. Each of the views can be bound to a model or a collection. 

The views can listen for event from the models, collections and DOM elements. When a model is updated all the views that listen for events on that model are notified.

We will go much more in details with Backbone in the lab.

### jQueryUI ###

<a href="http://jqueryui.com/">jQueryUI</a> makes available a lot of useful components, with very nice theme framework. A lot of times standard components will not be enough to solve your problem, to handle that, jQuery provides a widget factory to create your own custom UI components. We will look into how that works later in the lab.

### Underscore.js ###

Backbone make use of the utility and collection library <a href="http://underscorejs.org/">Underscore.js</a> that by it self is a very nice library, but in conjunction with Backbone is just plain awesome. We will mainly make you of Underscores templating capabilities.

### Blueprint.css ###

CSS is also one of those spaghetti creators. One could make use of something like <a href="http://sass-lang.com/">Sass</a> to get a better CSS structuring but to limit the technology overflow I left it out.

One thing you always must do in a project that uses CSS is to use a stylesheet that resets all the different browser to a common ground. Blueprint provides such a stylesheet in addition to a grid layout that can also be useful <a href="http://blueprintcss.org/">Blueprint</a>. A little more involved starting point is <a href="http://html5boilerplate.com/">Boilerplate</a> that is also good to read up on.

## Start the lab ##

Now we are ready to start that lab :-)

Run the following command in the console to start the lab: 

    mvn lab:init

## Step 0: Start the application ##

In this step we will start the application by requiring the Application <a href="http://documentcloud.github.com/backbone/#Router">Backbone Router</a> using Require.js.

Notice that index.html has a reference to require.js with a data-main attribute pointing to the application entry point. 

    <script data-main="resources/js/app" src="resources/jslibs/require.js"></script>

Open the file client/js/app.js and add the following lines to the end of the file: 

    require(['router'], function(appRouter){
        Backbone.history.start();
    });

This will require the router module asynchronously and call the given function with the loaded module. In order to start listening for url changes we start the <a href="http://documentcloud.github.com/backbone/#History">Backbone history</a> tracking when the router is loaded.

Start the application with the following command in a console an let it run in the background. There should be no need to restart the server: 
    
    mvn jetty:run

Open the following address in a browser: 

    http://0.0.0.0:8080/7W17732/

You should see the following message:

    You now have a running application

Go to the next step by running:
    
    mvn lab:next

## Step 1: Redirect to login if not authenticated ##

Open the file client/js/router in your editor. 

Notice how the router is defined as a Require.js module that depends on the module *redirectIfNot*.

In the module we create a Backbone router that is returned to other modules that depends on the router.

I added a call to navigate to the home page, but the home page should only be accessible to authenticated users. So we will redirect the user to the login page if they are not authenticated.

We will use the helper method *redirectIfNot* to make the redirect if the given constraints are not fulfilled. This method makes a call to the server in order to figure out the current state of the application and users the <a href="http://documentcloud.github.com/backbone/#Router-navigate">navigate</a> method on the router to handle the redirect.

Move the following line in the home method: 

    $('body').append("<h2>This is the home screen</h2>");

into the callback for the *redirectIfNot* method:

    redirectIfNot(["authenticated"], function () {
        $('body').append("<h2>This is the home screen</h2>");
    });

We also need to add a new route for *login* to the router that is connected to the *showLogin* method:

    routes: {
        'home': 'home',
        'login': 'showLogin',
        // Default
        '*actions': 'defaultAction'
    },

Finally we need to implement the *showLogin* method. Instead of loading all the views when we load the main module, we can chose to load modules on demand. Add the following method to the router:

    showLogin: function(){
        require(['views/Login'], function (view) {
            view.render();
        });
    },

Notice how we get the *login* view dependency in the callback method and call render on the view. 

Before rendering each view we clear the container element to ensure that old DOM elements are removed and event handlers on the container is unbinded. See the *clearContainer* method for the details.

When you refresh the browser you should be redirected to the *login* page.

Go to the next step by running:
    
    mvn lab:next

## Step 2: Login to application ##

Open the file client/views/Login.js in you editor.

This module has a special dependency, that uses the Require.js <a href="http://requirejs.org/docs/api.html#text">text</a> plugin. This plugin is capable of loading text files as strings. This is really useful for loading html template files, and in this case the views/Login.html file.

In the module we define a new <a href="http://documentcloud.github.com/backbone/#View">Backbone view</a> that is attacted to the element in the index.html page with the id *container*. In the <a href="http://documentcloud.github.com/backbone/#View-render">render</a> function for this view we replace the content of the root element with the loaded template.

First of all let's change the *Login* button to a <a href="http://jqueryui.com/demos/button/">jQuery UI button</a> by added the following line to the render method. 

    this.$('button').button();

Backbone provides us with a reference to jQuery that is relative to the root element of this view. You could achieve the same by issuing the following command: 

    $('button', this.el).button();

That means: find the button element in the root element of the view and turn it into a jQueryUI button.

It is a really good idea to make almost all you jQuery code be relative to an element that is a close ancestor to the elements you would like to work on. That make the code much more modular and helps avoiding situations where different parts of the code affect other parts unexpectedly. The same can be said for CSS, always limit your styles as much as possible.

Now let's add a click handler for the button. With plain jQuery would you just added the <a href="http://api.jquery.com/click/">click handler</a> to the element as seen below:

    $('button', this.el).click(function () {
        ...
    });

But as this is really common Backbone support adding event handlers to elements below the root element of a view in an easy way.

Add the following code to the events field.

    events: {
        'click button' : 'click'
    }
    
This binds the *click* event of the elements below the root element that matches the CSS selector *button* to the *click* method on this view.

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

We <a href="http://api.jquery.com/serialize/">serialize</a> the form to be `www-form-urlencoded` and send it off. If the user was authenticated we redirect the router to *home*; otherwise we show an error.

Take a look at the *setErrorMessage* method to see how jQuery calls can be chained together.

Try to log in with a wrong user name and password. Then you should see the error message.

Then try to log in with one of the users shown on the *login* box. You should be redirected to the Twitter connect page. Please connect to you Twitter account. 

When you are redirected to the home page you should see the following message: 

    Home - nothing to be seen here

Go to the next step by running:
    
    mvn lab:next

## Step 3: Showing Twitter timeline ##

I this step we will use Backbone's collections and models to retrieve tweets from the server and show them on the home page.

First we need to implement the model for a tweet.

Open the file client/js/models/Tweet.js in your editor.

Making a new model is easy. A <a href="http://documentcloud.github.com/backbone/#Model">Backbone model</a> provides sensible defaults and a lot of features out of the box. 

You don't actually need to change anything here, because the defaults are sufficient. But notice that we return the prototype for a tweet instead of a new instance of the tweet. That is because we need to create multiple instances of the tweet model.

Now open the client/js/collections/HomeTimeline.js file in you editor.

As you can see the module depends on the tweet model and defines a new <a href="http://documentcloud.github.com/backbone/#Collection">Backbone collection</a>.

The first thing we need to specify is the model for the elements in the collection. Then we specify the URL on the server that the collection maps to:

    var HomeTimeline = Backbone.Collection.extend({
        model: Tweet,
        url: 'twitter/timeline/home'
    });

When the <a href="http://documentcloud.github.com/backbone/#Collection-fetch">fetch</a> method is called on the collection a HTTP GET will be issued to the *url* of the collection. For each element in the returned JSON response a model will be created. 

There is just one problem, the server does not return a JSON array but a root element. So we need to add a parse method to the collection to retrieve the array:

    parse: function(response) {
        return response.tweetList;
    }

Finally we want to sort the tweets by their creation time:

    comparator: function (tweet) {
        return -tweet.get("createdAt");
    }

Now we just need to render the tweets. Open the `client/js/views/TimelineView.js` file in your editor.

First of all <a href="http://documentcloud.github.com/backbone/#Events-on">bind</a> the *reset* event on the *timeTimeline* collection to the render method and call fetch on the collection: 

    initialize: function() {
        homeTimeline.on('reset', this.render, this);
        homeTimeline.fetch();
    }
    
When the elements are fetched from the server the *reset* event will be triggered on the collection and the render method will be called.

We can then in the render method display the tweets on the view. Add the following code to the render method after the template has been inserted in the root element.

    var timeline = this.$("> ul");
    homeTimeline.each(function (tweet) {
        var view = new TweetView({model: tweet});
        timeline.append(view.render());
    });
    
First we find the *ul* element just below the root element. Notice it is important to be quite strict when selecting elements in views that contains sub views. Then we traverse all the elements of the home timeline collection, create a new *TweetView* for each model and append the rendered view to the timeline element.

Finally we need to implement the *TweetView*. Open the client/js/TweetView.js file in your editor.

We will use the <a href="http://underscorejs.org/#template">template</a> method of the <a href="http://underscorejs.org/">Underscore.js</a> library to render the tweet views. 

Take a look at the file client/views/TweetView.html and notice that it contains inline JavaScript code.

We would like to compile the template against a JSON version of the model. That is achieved by placing the following code in the render method:

    $(this.el).html(_.template(template, this.model.toJSON()));

This line turns the model into JSON compiles the template against the data using the Underscore.js library and places the HTML in the root element of the view. 

If you refresh the home page, you should see your home timeline.

Go to the next step by running:
    
    mvn lab:next
    
## Step 4: Tweeting your first tweet ##

We will start by adding support in the timeline view to listen for *add* events on the home timeline collection.

Open the client/js/TimelineView.js and add the following line to the top of the initialize method.

    homeTimeline.on('add', this.add, this);

Now when new models are added to the home timeline collection the *add* method on the view will be called.

In the *add* method we will prepend a new tweet view to the timeline. 

    var view = new TweetView({model: tweet});
    var tweetEl = $(view.render());
    tweetEl.hide().prependTo(this.$('> ul')).slideDown("slow");
  
First we create the view and render it. In order to get a nice slide down effect, we hide the newly created view prepend it to the timeline and call the slide down effect on the element.

Now we only need to send a tweet to server when the user click on the *Tweet* button in the tweet editor.

Open client/js/views/TweetEditor.js in you editor.

In the *tweet* method add a tweet to the home timeline collection using the <a href="http://documentcloud.github.com/backbone/#Collection-create">create method</a>.

    var textArea = this.$('textarea');
    homeTimeline.create({
        text: textArea.val()
    }, {wait: true});
    
    textArea.val('');
    
We retrieve the value of the text area, create a data map with the value and send it of to the server using the create method. We instruct the collection to wait with adding the tweet to the collection until the created version has been retrieved from the server. Finally we clear the text area.

Refresh the page and try tweeting something.

Go to the next step by running:
    
    mvn lab:next
    
## Step 5: Creating a custom jQuery UI widget ##

Open the client/js/components/LimitedTextarea.js file in you editor.

Notice that this file is not a require.js module. It is included directly in index.html. That is because jQuery has it's own *namespace* mechanism.

I this step we are going to create a <a href="http://jqueryui.com/demos/widget/">jQuery UI widget</a> that will enrich a text field with a max length indicator. It is a little involved, so I'll only run through the important aspects.

Notice that this widget is not complete, error handling and destroy methods are not implemented.

The widget will read the *maxlength* attribute of the target textarea, if it is not provided it will take the length from the options map. The maxlength attribute is removed to allow longer text then the max length, the validation should take care of the ensuring valid data. Then it will take the target textarea and surround it with a div containing an indicator element. This indicator element will be place in the bottom left cornor of the textarea and be updated on key presses.

All code should be added to the *_create* method that will be called when the widget is created.

We can retrieve the max length and delete the attribute on the textarea the following way:

    var maxLength = textarea.attr('maxlength') ||
        this.options.maxLength;
    textarea.removeAttr('maxlength');
    
Now we create the component and indicator:

    var indicator = $('<p>'+maxLength+'</p>');
    indicator.css({
        color: 'green', position: 'absolute',
        right: 30, bottom: -10
    });
    
    var component = $('<div></div>');
    component.css({position: 'relative'});
    component.append('<textarea/>');
    component.append(indicator);
    
This will create the following structure:

    <div style="position: relative">
        <textarea/>
        <p style="color: green; position: absolute; 
                  right: 30; bottom: -10">
            200
        </p>
    </div>
    
Then we will append this structure just after the target textarea, and the replace the textarea in the structure with the target text area:

    component.insertAfter(textarea);
    component.find('textarea').replaceWith(textarea);
    
This will move the target textarea into the structure.

Now we need to update the indicator on keystrokes:

    var updateIndicator = function () {
        var length  = textarea.val().length;
        var remains = maxLength - length;
        indicator.text(remains);
        indicator.css({
            color: remains > 10 ? 'green' : 'red'
        });
    };

    textarea.keyup(updateIndicator);
    textarea.keydown(updateIndicator);

The updateIndicator function calculates how much of the max length remains and updates the indicator accordingly.

Finally we update the indicator:

    updateIndicator();

No we have a working widget, let's attach it to the textarea in the render method of client/js/views/TweetEditor.js:

    this.$('textarea').limitedTextarea();
    
Refresh the page and type something in the textarea area.

Go to the next step by running:
    
    mvn lab:next

## Step 6: Creating a retweet dialog ##

I have added a reply and a retweet link to the TweetView. When click they should open a dialog with the appropriate text.

Take a look at the methods in client/js/views/TweetView.js and implement the retweet function. 

The text of the retweet should be something like: 
    
    "RT @{fromUser}: {text}"
    
Open client/js/views/TweetEditorDialog.js to implement the dialog. Use the documentation on the <a href="http://jqueryui.com/demos/dialog/">jQuery UI page</a> to implement this step.

Set the value of the textarea under the root element to the text property of the view options when the dialog opens. Remember to use *that* instead of *this* for code in a nested scopes when refering to the view. 

Turn the textarea into a *LimitedTextarea* in the open event.

When the textarea closes the dialog should be destroyed and the root element of the view should be removed from the DOM. You call method on the dialog the following way: 

    el.dialog("method",[args...])

Ensure that the DOM is cleaned properly when the dialog is closed to avoid memory leaks.

Add a *Tweet* button to the dialog that retrieves the text of the textarea and creates a new Tweet on the homeTimeline collection. 
Close the dialog afterwards. Remember to wait for the tweet to be retrieved from the server before adding it to the collection.

Add a *Cancel* button to the dialog that closes this dialog.

Finally set the title of the dialog to the title property of the options map.

Refresh the page and see if you can reply and retweet.

Go to the next step by running:
    
    mvn lab:next

## Step 7: Add tweet validation ##

In this step you should add validation to the tweet model before it is send to the server. Read the documentation for the <a href="http://documentcloud.github.com/backbone/#Model-validate">validate method</a>, and add the validation method to the model. The validation should check that the text to send is no more than 140 characters.

When you have added the validation method, change the client/js/views/TweetEditor.js view to highlight the textarea when an invalid model is submitted. Furthermore only clear the textarea when the submit was successful. You can be inspired by the way the client/js/views/TweetEditorDialog.js handles errors. 

Go to the next step by running:
    
    mvn lab:next
    
## Step 8: Now you are on your own ##

Geek out and change the application in a way that suits you, just be aware the if you change steps in the lab, your changes will be thrown away.

Hope you had fun!

PS. If you are one of those geniuses that is finished in ten minutes, please use the remaining time to make an Emacs mode for the <a href="https://github.com/jayway/maven-lab-plugin">maven-lab-plugin</a> syntax ;-) 
