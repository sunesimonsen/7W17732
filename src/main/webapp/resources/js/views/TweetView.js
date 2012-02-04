define([
    'plugins/text!views/Tweet.html',
    'collections/HomeTimeline',
    'models/TweetEditorModel'
], function(template, homeTimeline, tweetEditorModel){
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
            console.log("reply");
            return false;
        },

        retweet : function () {
            var text = "RT @" + this.model.get("fromUser")+ ":" + this.model.get('text');
            tweetEditorModel.set({text : text});
            return false;
        }
    });
    
    return TweetView;
});
