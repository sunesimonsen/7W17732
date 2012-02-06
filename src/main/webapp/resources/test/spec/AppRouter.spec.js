describe("AppRouter", function() {
    var router;
    beforeEach(function() {
        TestTarget.clearExpectations();
        TestTarget.when('read', 'home.json').success({
            authenticated : false,
            connected : false
        });

        TestTarget.when('read', 'twitter/timeline/home').success({
            
        });
        
        router = TestTarget.AppRouter;
        
        if (!TestTarget.routerStarted) {
            Backbone.history.start();
            TestTarget.routerStarted = true;
        }
    });

    describe("when not logged in", function () {
        beforeEach(function() {
            TestTarget.when('read', 'home.json').success({
                authenticated : false,
                connected : false
            });
        });

        it ('default route should be login', function () {
            router.navigate('',  {trigger: true});
            expect(Backbone.history.getFragment()).toBe('login');    
        });
    });

    describe("when logged in", function () {
        beforeEach(function() {
            TestTarget.when('read', 'home.json').success({
                authenticated : true,
                connected : false
            });
        });

        it ('default route should be connect', function () {
            router.navigate('',  {trigger: true});
            expect(Backbone.history.getFragment()).toBe('connect');    
        });
    });

    describe("when logged in and connected", function () {
        beforeEach(function() {
            TestTarget.when('read', 'home.json').success({
                authenticated : true,
                connected : true
            });
        });

        it ('default route should be home', function () {
            router.navigate('',  {trigger: true});
            expect(Backbone.history.getFragment()).toBe('home');    
        });
    });
});    

