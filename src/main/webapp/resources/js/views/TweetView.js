define([
    'plugins/text!views/TweetView.html',
    'collections/HomeTimeline',
    'views/TweetEditorDialog'
], function(template, homeTimeline, TweetEditorDialog){
    var TweetView = Backbone.View.extend({
        tagName: 'li',
        className: 'span-20 last',

        events: {
            @BEGIN_VERSION 6
            'click a.reply' : 'reply',
            'click a.retweet' : 'retweet'
            @END_VERSION 6
        },

        render: function() {
            @BEGIN_VERSION 4
            $(this.el).html(_.template(template, this.model.toJSON()));
            @END_VERSION 4
            return this.el;
        },

        @BEGIN_VERSION 6
        reply: function () {
            var text = "@" + this.model.get("fromUser") + " ";
            new TweetEditorDialog({title: 'Reply', text: text}).render();            
            return false;
        },

        retweet : function () {
            @BEGIN_VERSION 7
            var text = "RT @" + this.model.get("fromUser")+ ": " + this.model.get('text');
            new TweetEditorDialog({title: 'Retweet', text: text}).render();
            @END_VERSION 7
            return false;
        }
        @END_VERSION 6
    });
    
    return TweetView;
});
