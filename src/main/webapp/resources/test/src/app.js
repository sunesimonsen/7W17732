var req = require.config({
    context : 'text',
    baseUrl: "../js",
    paths : {
        'plugins' : '../jslibs/plugins'
    }
});

// Load our app module and pass it to our definition function
req(['router'], function(AppRouter){
    window.TestTarget = window.TestTarget || {};
    window.TestTarget['AppRouter'] = AppRouter;
    
    (function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var trivialReporter = new jasmine.TrivialReporter();

      jasmineEnv.addReporter(trivialReporter);

      jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
      };

      var currentWindowOnload = window.onload;

      window.onload = function() {
        if (currentWindowOnload) {
          currentWindowOnload();
        }
        execJasmine();
      };

      function execJasmine() {
        jasmineEnv.execute();
      }
    })();
});
