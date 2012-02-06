(function () {
    var expected = {}; 
    window.TestTarget = window.TestTarget || {};
    
    window.TestTarget.when = function (method, url) {
        return {
            success : function (data) {
                expected[method] = expected[method] || {};
                expected[method][url] = expected[method][url] || {};
                expected[method][url]['success'] = data;
            },
            error : function (data) {
                expected[method] = expected[method] || {};
                expected[method][url] = expected[method][url] || {};
                expected[method][url]['error'] = data;
            }
        };
    };

    window.TestTarget.clearExpectations = function () {
        expected = {};
    };

    var getUrl = function (model) {
        if (!model.url) {
            return undefined;
        }
        return _.isFunction(model.url) ? model.url() : model.url;    
    };
    
    var original = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        var url = getUrl(model);
        console.log('Backbone.sync("'+method+'", "'+url+'",...)');
        
        var expectation = expected[method] ? expected[method][url] : undefined;

        if (expectation && expectation.success) {
            options.success(expectation.success);
        } else if (expectation && expectation.error) {
            options.error(expectation.error);
        } else {
            original(method, model, options);   
        }
    };    
}());
