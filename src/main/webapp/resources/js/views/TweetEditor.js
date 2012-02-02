define([
    'plugins/text!views/TweetEditor.html',
    'collections/HomeTimeline'
], function (template, homeTimeline) {
    var TweetEditor = Backbone.View.extend({
        events: {
            'click input[type=submit]' : 'tweet'
        },

        render : function() {
            $(this.el).html( template );
            this.$('input[type=submit]').button();
            return this;
        },

        tweet : function() {
            var text = this.$("textarea").val();
            this.$("textarea").val("");
            homeTimeline.create({
                text: text
            });
            return false;
        }
    });
    return new TweetEditor();
});
