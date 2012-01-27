define([], function () {
    var Context = Backbone.Model.extend({
        url: "home.json"
    });

    return new Context();
});