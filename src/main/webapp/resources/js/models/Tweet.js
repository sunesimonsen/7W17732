define([], function(){
    var TimelineTweet = Backbone.Model.extend({
        @BEGIN_VERSION 4
        parse: function(response) {
            return response.tweet || response;                
        },
        @END_VERSION 4
        @BEGIN_VERSION 8
        validate : function(attrs) {
            if (140 < attrs.text.length) {
                return "A tweet must at most be 140 characters";
            }
            return undefined;
        }
        @END_VERSION 8
    });

    return TimelineTweet;
});
