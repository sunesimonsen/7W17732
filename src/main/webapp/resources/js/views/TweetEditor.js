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
            this.$('textarea').limitedTextarea();
            this.$('button').button();

            return this.el;
        },

        tweet : function() {
            var text = this.$('textarea').val();
            homeTimeline.create({
                text: text
            }, {wait: true});

            this.$('textarea').val('').trigger('keyup');
            return false;
        }
    });
    return new TweetEditor();
});
