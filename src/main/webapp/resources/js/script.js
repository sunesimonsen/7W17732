var tw = window.TW || {};
tw.helpers = tw.helpers || (function() {
	return {
		import : function(src) {
			var scriptElem = document.createElement('script');
			scriptElem.setAttribute('src', src);
			scriptElem.setAttribute('type', 'text/javascript');
			document.getElementsByTagName('head')[0].appendChild(scriptElem);
		},

		// import with a random query parameter to avoid caching
		importNoCache : function(src) {
			var ms = new Date().getTime().toString();
			var seed = "?" + ms;
			this.import(src + seed);
		}
	};
}());

tw.helpers.import("resources/js/views/login.js");