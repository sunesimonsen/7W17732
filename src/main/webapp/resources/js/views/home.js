define([
    'require',
    'plugins/text!views/home.html',
    'views/TimelineView'
], function(require, template, timelineView){
    var HomeView = Backbone.View.extend({

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

            this.$('.timeline').html(timelineView.render().el);
        }
    });

    return new HomeView();
});
