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
            var textarea = this.$('textarea');
            homeTimeline.create({
                text: textarea.val()
            }, {
                wait: true,
                @BEGIN_VERSION 8
                error: function (model, error) {
                    textarea.limitedTextarea('error');
                },
                success : function () {
                    textarea.val('').trigger('keyup');                    
                }
                @END_VERSION 8
            });
            @END_VERSION 5

            @BEGIN_VERSION_ONLY 5
            textarea.val('');
            @END_VERSION_ONLY 5
            @BEGIN_VERSION_ONLY 6
            textarea.val('').trigger('keyup');
            @END_VERSION_ONLY 6
            @BEGIN_VERSION_ONLY 7
            textarea.val('').trigger('keyup');
            @END_VERSION_ONLY 7
            
            return false;
        }
    });
    return new TweetEditor();
});
