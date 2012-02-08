define([
    'require',
    'plugins/text!views/Home.html',
    'views/TimelineView',
    'views/TweetEditor'
], function(require, template, timelineView, tweetEditor){
    var HomeView = Backbone.View.extend({

        el: '#container',
        
        render: function() {
            @BEGIN_VERSION_ONLY 2
            $('body').append("<h2>Home - nothing to be seen here</h2>");
            @END_VERSION_ONLY 2
            $(this.el).html(template);
            @BEGIN_VERSION 4
            this.$('.tweetEditor').html(tweetEditor.render());
            @END_VERSION 4
            @BEGIN_VERSION 3
            this.$('.timeline').html(timelineView.render());
            @END_VERSION 3
        }
    });

    return new HomeView();
});
