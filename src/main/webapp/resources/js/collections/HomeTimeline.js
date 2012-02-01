define([
    'models/Tweet'
], function(Tweet){
    var HomeTimeline = Backbone.Collection.extend({
        url: 'twitter/timeline/home',
        model: Tweet,
        comparator: function (tweet) {
            return -tweet.get("createdAt");
        },

        parse: function(response) {
            return response.tweetList;
        }
    });

    return new HomeTimeline();
});
