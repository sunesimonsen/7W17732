define([
    'require',
    'plugins/text!views/Home.html',
    'views/TimelineView',
    'views/TweetEditor'
], function(require, template, timelineView, tweetEditor){
    var HomeView = Backbone.View.extend({

        el: '#container',
        
        render: function() {
            $(this.el).html( template );
            this.$('.tweetEditor').html(tweetEditor.render().el);
            this.$('.timeline').html(timelineView.render().el);
        }
    });

    return new HomeView();
});
