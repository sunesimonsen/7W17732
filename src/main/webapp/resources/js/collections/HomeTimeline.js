define([
    'models/Tweet'
], function(Tweet){
    var HomeTimeline = Backbone.Collection.extend({
        @BEGIN_VERSION 4
        model: Tweet,
        url: 'twitter/timeline/home',

        parse: function(response) {
            return response.tweetList;
        },
        
        comparator: function (tweet) {
            return -tweet.get("createdAt");
        }
        @BEGIN_VERSION 4
    });

    return new HomeTimeline();
});
