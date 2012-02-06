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
            @BEGIN_VERSION 5
            homeTimeline.on('add', this.add, this);
            @END_VERSION 5
            @BEGIN_VERSION 4
            homeTimeline.on('reset', this.render, this);
            homeTimeline.fetch();
            @END_VERSION 4
            
            @BEGIN_VERSION 4
            // Simple solution could be dangerous
            setInterval(function () {
                homeTimeline.fetch();   
            }, 60000);
            @END_VERSION 4
        },

        refresh : function() {
            homeTimeline.fetch();
            return false;
        },

        render: function() {
            $(this.el).html(template);

            this.$('button').button({
                icons: {
                    secondary: "ui-icon-refresh"
                }
            });

            @BEGIN_VERSION 4
            var timeline = this.$("> ul");
            homeTimeline.each(function (tweet) {
                var view = new TweetView({model: tweet});
                timeline.append(view.render());
            });
            @END_VERSION 4
            
            return this.el;
        },
        @BEGIN_VERSION 4
        add : function(tweet) {
            @BEGIN_VERSION 5
            var view = new TweetView({model: tweet});
            var tweetEl = $(view.render());
            tweetEl.hide().prependTo(this.$('> ul')).slideDown("slow");
            @END_VERSION 5
            return this;
        }
        @END_VERSION 4
    });

    return new TimelineView();
});
