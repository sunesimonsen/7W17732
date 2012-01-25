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
package org.springframework.social.showcase.config;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;
import org.springframework.web.servlet.view.tiles2.TilesConfigurer;
import org.springframework.web.servlet.view.tiles2.TilesView;

import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

/**
 * Spring MVC Configuration.
 * @author Craig Walls
 */
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Inject
	private ConnectionRepository connectionRepository;

	@Bean
	public ViewResolver viewResolver() {
		ContentNegotiatingViewResolver viewResolver = new ContentNegotiatingViewResolver();
		HashMap<String,String> mediaTypes = Maps.newHashMap();
		mediaTypes.put("html", "text/html");
		mediaTypes.put("json", "application/json");
		viewResolver.setMediaTypes(mediaTypes);
		
		InternalResourceViewResolver htmlViewResolver = new InternalResourceViewResolver();
		htmlViewResolver.setPrefix("/WEB-INF/views/");
		htmlViewResolver.setSuffix(".jsp");
		
		UrlBasedViewResolver tilesViewResolver = new UrlBasedViewResolver();
		tilesViewResolver.setViewClass(TilesView.class);
		
		List<ViewResolver> viewResolvers =  Lists.newArrayList();
		viewResolvers.add(htmlViewResolver);
		//viewResolvers.add(tilesViewResolver);
				
		viewResolver.setViewResolvers(viewResolvers);

		List<View> defaultViews = Lists.newArrayList();
		defaultViews.add(new MappingJacksonJsonView());
		viewResolver.setDefaultViews(defaultViews);
		
		
		return viewResolver;
	}
	
	@Bean
	public TilesConfigurer tilesConfigurer() {
		TilesConfigurer configurer = new TilesConfigurer();
		configurer.setDefinitions(new String[] {
				"/WEB-INF/layouts/tiles.xml",
				"/WEB-INF/views/**/tiles.xml"                           
		});
		configurer.setCheckRefresh(true);
		return configurer;
	}

	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}
	
    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("/WEB-INF/messages/messages");
        return messageSource;
    }
}
