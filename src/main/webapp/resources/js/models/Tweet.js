define([], function(){
    var TimelineTweet = Backbone.Model.extend({
        @BEGIN_VERSION 4
        parse: function(response) {
            return response.tweet || response;                
        }
        @END_VERSION 4
    });

    return TimelineTweet;
});
