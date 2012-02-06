define([
    'plugins/text!views/Login.html'
], function(template){

    var LoginView = Backbone.View.extend({

        el: '#container',

        events: {
            @BEGIN_VERSION 3
            'click button' : 'click'
            @END_VERSION 3
        },

        render: function() {
            $(this.el).html( template );
            @BEGIN_VERSION 3
            this.$('button').button();
            @END_VERSION 3
        },
        @BEGIN_VERSION 3
        click : function () {
            var that = this;
            
            var success = function(data, textStatus, jqXHR) {
                if (data === "success") {
                    that.clearErrorMessage();
                    require("router").navigate("home", true);
                } else {
                    that.setErrorMessage("Error logging in");
                }
            };

            var error = function (jqXHR, textStatus, errorThrown) {
                that.setErrorMessage(textStatus);
            };
            
            $.ajax({
                url : "signin/authenticate",
                type : "POST",
                data : that.$("form").serialize(),
                success : success,
                error : error
            });
            
            return false;
        },
        @END_VERSION 3
        setErrorMessage : function (text) {
            this.$('.login-error-box').find('.login-error-message')
                .text(text).end().slideDown();
        },
        clearErrorMessage : function () {
            this.$('.login-error-box').hide();
        }
    });

    return new LoginView();
});
