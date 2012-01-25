define([
    'require',
    'plugins/text!views/login.html'
], function(require, template){

    var LoginView = Backbone.View.extend({

        el: '#container',
        
        events: {
            'click input[type=submit]' : 'click'
        },

        render: function() {
            $(this.el).empty();
            
            // Using Underscore we can compile our template with data
            var data = {};
            var compiledTemplate = _.template( template, data );
            // Append our compiled template to this Views "el"
            $(this.el).append( compiledTemplate );
        },

        click : function () {
            $.ajax({
		url : "signin/authenticate",
		type : "POST",
		data : this.$("form").serialize(),
		beforeSend : function(xhr) {
		    xhr.setRequestHeader("X-Ajax-call", "true");
		},
		success : function(data, textStatus, jqXHR) {
                    require("router").navigate("connect", true);
		},
                error : function (jqXHR, textStatus, errorThrown) {
                    console.log("Error");
                }
	    });
	    return false;
        }
    });

    return new LoginView();
});