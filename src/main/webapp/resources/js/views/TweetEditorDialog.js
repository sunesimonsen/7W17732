define([
    'plugins/text!views/TweetEditorDialog.html'
], function (template) {
    var TweetEditorDialog = Backbone.View.extend({
        className : 'tweet-editor-dialog',
        
        render : function() {
            var el = $(this.el);
            el.appendTo("body");
            el.html(_.template(template, {text : this.options.text}));
            
            el.dialog({
			    autoOpen: true,
			    modal: true,
                width: 530,
                height: 230,
			    buttons: {
				    "Tweet": function() {
                        $( this ).dialog( "close" );
					},
				    Cancel: function() {
					    $( this ).dialog( "close" );
				    }
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