define([], function () {
    var TweetEditorModel = Backbone.Model.extend({
        initialize : function () {
        }
    });

    return new TweetEditorModel({
        text: ''
    });
});