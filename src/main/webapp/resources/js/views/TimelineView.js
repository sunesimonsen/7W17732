define([
    'collections/HomeTimeline',
    'views/TweetView',
    'plugins/text!views/TimelineView.html'
], function(homeTimeline, TweetView, template){
    var TimelineView = Backbone.View.extend({
        events: {
            'click button.refresh' : 'refresh'
        },

        initialize: function() {
            var fetchTimeout = 5000;
            
            homeTimeline.bind('reset', this.render, this);
            homeTimeline.bind('add', this.add, this);

            homeTimeline.fetch();
        },

        refresh : function() {
            homeTimeline.fetch();
        },

        render: function() {
            var el = $(this.el);
            el.empty();
            el.append(template);

            var timeline = $("> ul", el);
            
            homeTimeline.each(function (tweet) {
                var view = new TweetView({model: tweet});
                timeline.append( view.render().el );
            });

            this.$('button').button({
                icons: {
                    secondary: "ui-icon-refresh"
                }
            });
            
            return this;
        },

        add : function(tweet) {
            var view = new TweetView({model: tweet});
            var tweetEl = $(view.render().el);
            tweetEl.hide().prependTo(this.$('> ul')).slideDown("slow");
            return this;
        }
    });

    return new TimelineView();
});
