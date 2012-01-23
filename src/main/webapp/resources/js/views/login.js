var tw = window.TW || {};
tw.login = tw.login || (function() {
	return {
		init : function() {
			$("#loginFormName input[type=submit]").click(function() {
				$.ajax({
					url : "signin/authenticate",
					type : "POST",
					data : $("#loginFormName").serialize(),
					beforeSend : function(xhr) {
						xhr.setRequestHeader("X-Ajax-call", "true");
					},
					success : function(result) {
						if (result == "ok") {
							console.log("Success");
						} else if (result == "error") {
							console.log("Error");
						}
					}
				});
				return false;
			});
		}
	};
}());

tw.login.init();