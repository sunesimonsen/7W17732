define([
    'plugins/text!views/TweetEditor.html',
    'collections/HomeTimeline'
], function (template, homeTimeline) {
    var TweetEditor = Backbone.View.extend({
        events: {
            'click input[type=submit]' : 'tweet'
        },

        render : function() {
            var data = {};
            var compiledTemplate = _.template( template, data );
            $(this.el).append( compiledTemplate );   
            return this;
        },

        tweet : function() {
            var text = this.$("textarea").val();
            homeTimeline.create({
                text: text
            });
            return false;
        }
    });
    return new TweetEditor();
});
