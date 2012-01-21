package org.springframework.social.showcase;

import org.springframework.web.bind.annotation.RequestMethod;

public class ActionReference {
	private final String relation; 
	private final String url;
	private final RequestMethod method; 
	private final String description;

	
	public ActionReference(String relation, String url, RequestMethod method,
			String description) {
		this.relation = relation;
		this.url = url;
		this.method = method;
		this.description = description;
	}

	@Override
	public String toString() {
		return "Reference [relation=" + relation + ", url=" + url + ", method="
				+ method + ", description=" + description + "]";
	}

	public String getRelation() {
		return relation;
	}

	public String getUrl() {
		return url;
	}

	public RequestMethod getMethod() {
		return method;
	}

	public String getDescription() {
		return description;
	}
}
