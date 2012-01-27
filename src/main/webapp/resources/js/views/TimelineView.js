define([
    'collections/HomeTimeline',
    'views/TweetView'
], function(homeTimeline, TweetView){
    var TimelineView = Backbone.View.extend({
        tagName: 'ul',
        
        events: {
            
        },

        initialize: function() {
            homeTimeline.bind('all', this.render, this);
            homeTimeline.fetch();
        },

        render: function() {
            var el = $(this.el);
            el.empty();
            
            homeTimeline.each(function (tweet) {
                var view = new TweetView({model: tweet});
                el.append( view.render().el );
            });
            return this;
        }
    });

    return new TimelineView();
});
