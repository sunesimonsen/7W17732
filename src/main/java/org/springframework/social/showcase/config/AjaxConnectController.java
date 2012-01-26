package org.springframework.social.showcase.config;

import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.view.RedirectView;

public class AjaxConnectController extends ConnectController {

	public AjaxConnectController(
			ConnectionFactoryLocator connectionFactoryLocator,
			ConnectionRepository connectionRepository) {
		super(connectionFactoryLocator, connectionRepository);
	}
	
	
	@Override
	public RedirectView oauth1Callback(String providerId,
			NativeWebRequest request) {
		RedirectView oauth1Callback = super.oauth1Callback(providerId, request);
		oauth1Callback.setUrl("/");
		return oauth1Callback;
	}

}
