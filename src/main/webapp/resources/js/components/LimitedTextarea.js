$.widget('7W17732.limitedTextarea', {
    options : {
        maxLength : 200
    },

    _create : function() {
        var el = this.element;
        var o = this.options;


        var maxLength = el.attr('maxlength') || o.maxLength;
        el.attr('maxlength', maxLength);

        var textarea = el;
        var component = $('<div></div>');
        var indicator = $('<p>Foo</p>');

        var updateIndicator = function () {
            var length  = textarea.val().length;
            var remains = maxLength - length;
            indicator.text(remains);
            indicator.css({
                color: remains > 10 ? 'green' : 'red'
            });
        };
        
        textarea.keyup(updateIndicator);
        textarea.keydown(updateIndicator);

        component.css({
            position: 'relative'
        });
        component.append('<textarea/>');

        indicator.css({
            color: 'green',
            position: 'absolute',
            right: 30,
            bottom: -10
        });
        
        component.append(indicator);
        component.insertAfter(el);

        component.find('textarea').replaceWith(el);

        updateIndicator();
    }
});
