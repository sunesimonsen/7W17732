define([
    'plugins/text!views/tweet.html'
], function(template){
    var TweetView = Backbone.View.extend({
        tagName: 'li',
        
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
