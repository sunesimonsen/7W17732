define([
    'plugins/text!views/Tweet.html',
    'collections/HomeTimeline',
    'views/TweetEditorDialog'
], function(template, homeTimeline, TweetEditorDialog){
    var TweetView = Backbone.View.extend({
        tagName: 'li',
        className: 'span-20 last',

        events: {
            'click a.reply' : 'reply',
            'click a.retweet' : 'retweet'
        },

        render: function() {
            var compiledTemplate = _.template(template, this.model.toJSON());
            $(this.el).html(compiledTemplate);
            return this;
        },

        reply: function () {
            var text = "@" + this.model.get("fromUser") + " ";
            new TweetEditorDialog({title: 'Retweet', text: text}).render();            
            return false;
        },

        retweet : function () {
            var text = "RT @" + this.model.get("fromUser")+ ":" + this.model.get('text');
            new TweetEditorDialog({title: 'Retweet', text: text}).render();            
            return false;
        }
    });
    
    return TweetView;
});
