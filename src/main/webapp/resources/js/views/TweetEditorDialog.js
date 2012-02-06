define([
    'plugins/text!views/TweetEditorDialog.html',
    'collections/HomeTimeline'
], function (template, homeTimeline) {
    var TweetEditorDialog = Backbone.View.extend({
        className : 'tweet-editor-dialog',
        
        render : function() {
            var el = $(this.el);
            el.appendTo("body");
            el.html(template);

            var that = this;
            var o = this.options;
            
            el.dialog({
			    autoOpen: true,
			    modal: true,
                title: o.title,
                width: 530,
                height: 230,
                minHeight: 200,
                minWidth: 400,
			    buttons: {
				    Tweet: function() {
                        var text = that.$('textarea').val();
                        homeTimeline.create({
                            text: text
                        }, {wait: true});
                        
                        $( this ).dialog( "close" );
					},
				    Cancel: function() {
					    $( this ).dialog( "close" );
				    }
			    },
                open : function () {
                    that.$('textarea').val(o.text).limitedTextarea();
                },
                close : function() {
                    el.dialog("destroy");
                    el.remove();
                }
            });
        }
    });

    return TweetEditorDialog;
});