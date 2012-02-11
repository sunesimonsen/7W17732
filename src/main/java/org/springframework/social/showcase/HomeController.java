/*
 * Copyright 2011 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.social.showcase;

import java.security.Principal;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Provider;

import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.showcase.account.AccountRepository;
import org.springframework.social.showcase.signin.SignInUtils;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.collect.Maps;

@Controller
public class HomeController {
	
	private final Provider<ConnectionRepository> connectionRepositoryProvider;
	
	private final AccountRepository accountRepository;
	

	@Inject
	public HomeController(Provider<ConnectionRepository> connectionRepositoryProvider, AccountRepository accountRepository) {
		this.connectionRepositoryProvider = connectionRepositoryProvider;
		this.accountRepository = accountRepository;
	}

	@RequestMapping("/")
	public String index() {
		return "forward:/resources/index.html";
	}
	
	@RequestMapping("/home.json")
	public Map<String,Object> home() {
		Map<String,Object> result = Maps.newHashMap();
		result.put("authenticated", SignInUtils.isSignedIn());
		result.put("connected", isConnectToTwitter());
		return result;
	}
	
	private boolean isConnectToTwitter() {
		Connection<Twitter> connection = getConnectionRepository().findPrimaryConnection(Twitter.class);
		return connection != null;
	}
	
	@RequestMapping("/connect.json")
	public String connect() {
		return "";
	}
	
	private ConnectionRepository getConnectionRepository() {
		return connectionRepositoryProvider.get();
	}
}
