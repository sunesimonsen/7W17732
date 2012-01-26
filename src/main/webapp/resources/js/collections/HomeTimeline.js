define([
    'models/Tweet'
], function(Tweet){
    var HomeTimeline = Backbone.Collection.extend({
        url: 'twitter/timeline/home',
        model: Tweet,

        parse: function(response) {
            return response.tweetList;
        }
    });

    return new HomeTimeline();
});
