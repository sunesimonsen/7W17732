define([
    'plugins/text!views/Tweet.html'
], function(template){
    var TweetView = Backbone.View.extend({
        tagName: 'li',
        className: 'span-20 last',
        
        events: {
            
        },

        initialize: function() {

        },

        render: function() {
            var compiledTemplate = _.template(template, this.model.toJSON());
            $(this.el).html(compiledTemplate);
            return this;
        }
    });

    return TweetView;
});
