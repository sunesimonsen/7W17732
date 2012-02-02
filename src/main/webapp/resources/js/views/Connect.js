define([
    'plugins/text!views/Connect.html'
], function(template){

    var ConnectView = Backbone.View.extend({

        el: '#container',
        
        events: {
        },

        render: function() {
            $(this.el).empty();
            
            // Using Underscore we can compile our template with data
            var data = {};
            var compiledTemplate = _.template( template, data );
            // Append our compiled template to this Views "el"
            $(this.el).append( compiledTemplate );
        },
    });

    return new ConnectView();
});
