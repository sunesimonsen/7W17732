define([], function(){
    var TimelineTweet = Backbone.Model.extend({
        @BEGIN_VERSION 5
        parse: function(response) {
            return response.tweet || response;                
        }
        @END_VERSION 5
    });

    return TimelineTweet;
});
