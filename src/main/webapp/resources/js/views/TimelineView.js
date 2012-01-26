define([
    'collections/HomeTimeline',
    'views/TweetView'
], function(homeTimeline, TweetView){
    var TimelineView = Backbone.View.extend({
        el: '#timeline',
        
        events: {
            
        },

        initialize: function() {
            homeTimeline.bind('change', this.render, this);
            homeTimeline.bind('add', this.render, this);
            homeTimeline.bind('remove', this.render, this);
            homeTimeline.bind('all',   this.render, this);
            homeTimeline.fetch();
        },

        render: function() {
            var el = $('#timeline');
            el.empty();
            
            homeTimeline.each(function (tweet) {
                var view = new TweetView({model: tweet});
                el.append( view.render().el );
            });
        }
    });

    return new TimelineView();
});
