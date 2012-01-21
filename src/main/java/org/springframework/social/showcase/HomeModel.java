package org.springframework.social.showcase;

import java.util.Collections;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.collect.Lists;

public class HomeModel {
	private String applicationName;
	
	private List<ActionReference> actions = Lists.newArrayList();

	public HomeModel(String applicationName) {
		this.applicationName = applicationName;
	}
	
	public String getApplicationName() {
		return applicationName;
	}
	
	public List<ActionReference> getActions() {
		return Collections.unmodifiableList(actions);
	}

	public void addAction(String relation, String url, RequestMethod method, String description) {
		actions.add(new ActionReference(relation, url, method, description));
	}
}
