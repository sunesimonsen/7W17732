define([
    'plugins/text!views/Connect.html'
], function(template){

    var ConnectView = Backbone.View.extend({

        el: '#container',
        
        render: function() {
            $(this.el).html(template);
        }
    });

    return new ConnectView();
});
