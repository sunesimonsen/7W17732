define([
], function(){
    var TimelineTweet = Backbone.Model.extend({
        parse: function(response) {
            return response.tweet || response;                
        }
    });

    return TimelineTweet;
});
