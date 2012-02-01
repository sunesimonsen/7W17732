define([
], function(){
    var TimelineTweet = Backbone.Model.extend({
        initialize : function () {
        },
        parse: function(response) {
            return response.tweet;                
        }
    });

    return TimelineTweet;
});
