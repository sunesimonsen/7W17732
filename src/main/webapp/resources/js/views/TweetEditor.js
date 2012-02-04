define([
    'models/TweetEditorModel',
    'plugins/text!views/TweetEditor.html',
    'collections/HomeTimeline'
], function (tweetEditorModel, template, homeTimeline) {
    var TweetEditor = Backbone.View.extend({
        model: tweetEditorModel,
        
        events: {
            'click input[type=submit]' : 'tweet',
            'keyup textarea' : 'textChanged'
        },

        initialize: function () {
            this.model.bind('change', this.render, this);
        },

        textChanged : function () {
            var text = this.$("textarea").val();
            this.model.set({text: text},
                           {silent: true});
        },

        render : function() {
            var compiledTemplate = _.template(template, this.model.toJSON());
            $(this.el).html( compiledTemplate );
            this.$('input[type=submit]').button();
            return this;
        },

        tweet : function() {
            var text = this.model.get("text");
            homeTimeline.create({
                text: text
            });

            this.model.set({text : ""});
            return false;
        }
    });
    return new TweetEditor();
});
