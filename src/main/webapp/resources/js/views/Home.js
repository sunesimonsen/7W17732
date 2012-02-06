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
            @BEGIN_VERSION 4
            this.$('.tweetEditor').html(tweetEditor.render());
            @END_VERSION 4
            this.$('.timeline').html(timelineView.render());
        }
    });

    return new HomeView();
});
