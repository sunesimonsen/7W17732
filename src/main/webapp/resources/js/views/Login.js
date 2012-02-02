define([
    'require',
    'plugins/text!views/Login.html'
], function(require, template){

    var LoginView = Backbone.View.extend({

        el: '#container',

        events: {
            'click input[type=submit]' : 'click'
        },

        render: function() {
            $(this.el).empty();

            // Using Underscore we can compile our template with data
            var data = {};
            var compiledTemplate = _.template( template, data );
                // Append our compiled template to this Views "el"
            $(this.el).append( compiledTemplate );

            this.$('input[type=submit]').button();
        },

        click : function () {
            var that = this;
            $.ajax({
                url : "signin/authenticate",
                type : "POST",
                data : that.$("form").serialize(),
                beforeSend : function(xhr) {
                    xhr.setRequestHeader("X-Ajax-call", "true");
                },
                success : function(data, textStatus, jqXHR) {
                    if (data === "success") {
                        require("router").navigate("home", true);
                    } else {
                        that.setErrorMessage("Error logging in");
                    }
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    that.setErrorMessage(textStatus);
                }
            });
            return false;
        },

        setErrorMessage : function (text) {
            this.$('.login-error-box').find('.login-error-message').text(text).end().show();
        },
        clearErrorMessage : function () {
            this.$('.login-error-box').hide();
        }
    });

    return new LoginView();
});
