define([
    'plugins/text!views/TweetEditor.html',
    'collections/HomeTimeline'
], function (template, homeTimeline) {
    var TweetEditor = Backbone.View.extend({
        events: {
            'click button' : 'tweet'
        },

        render : function() {
            $(this.el).html( template );
            this.$('button').button();
            @BEGIN_VERSION 6
            this.$('textarea').limitedTextarea();
            @END_VERSION 6
            return this.el;
        },

        tweet : function() {
            @BEGIN_VERSION 5
            var text = this.$('textarea').val();
            homeTimeline.create({
                text: text
            }, {wait: true});
            @END_VERSION 5

            @BEGIN_VERSION_ONLY 5
            this.$('textarea').val('');
            @END_VERSION_ONLY 5
            @BEGIN_VERSION 6
            this.$('textarea').val('').trigger('keyup');
            @END_VERSION 6
            return false;
        }
    });
    return new TweetEditor();
});
