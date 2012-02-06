$.widget('7W17732.limitedTextarea', {
    options : {
        maxLength : 200
    },

    _create : function() {
        var textarea = this.element;

        @BEGIN_VERSION 6
        var maxLength = textarea.attr('maxlength') ||
            this.options.maxLength;
        textarea.attr('maxlength', maxLength);

        var indicator = $('<p>'+maxLength+'</p>');
        indicator.css({
            color: 'green',
            position: 'absolute',
            right: 30,
            bottom: -10
        });
        
        var component = $('<div></div>');
        component.css({position: 'relative'});
        component.append('<textarea/>');
        
        component.append(indicator);
        component.insertAfter(textarea);

        component.find('textarea').replaceWith(textarea);

        var updateIndicator = function () {
            var length  = textarea.val().length;
            var remains = maxLength - length;
            indicator.text(remains);
            indicator.css({
                color: remains > 20 ? 'green' : 'red'
            });
        };

        textarea.keyup(updateIndicator);
        textarea.keydown(updateIndicator);

        updateIndicator();
        @END_VERSION 6
    }
});
