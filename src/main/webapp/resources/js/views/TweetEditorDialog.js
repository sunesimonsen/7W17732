define([
    'plugins/text!views/TweetEditorDialog.html',
    'collections/HomeTimeline'
], function (template, homeTimeline) {
    var TweetEditorDialog = Backbone.View.extend({
        className : 'tweet-editor-dialog',
        
        render : function() {
            var el = $(this.el);
            var that = this;
            var o = this.options;
            
            el.appendTo("body");
            el.html(template);
            var textarea = that.$('textarea');
            
            el.dialog({
			    autoOpen: true,
			    modal: true,
                @BEGIN_VERSION 7
                title: o.title,
                @END_VERSION 7
                width: 530,
                height: 230,
                minHeight: 200,
                minWidth: 400,
                @BEGIN_VERSION 7
			    buttons: {
				    Tweet: function() {
                        var text = textarea.val();
                        homeTimeline.create({
                            text: text
                        }, {wait: true});
                        
                        $(this).dialog("close");
					},
				    Cancel: function() {
					    $(this).dialog("close");
				    }
			    },
                open : function () {
                    textarea.val(o.text).limitedTextarea();
                },
                close : function() {
                    $(this).dialog("destroy");
                    el.remove();
                }
                @END_VERSION 7
            });

            return el;
        }
    });

    return TweetEditorDialog;
});