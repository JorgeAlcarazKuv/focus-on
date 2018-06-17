package com.focuson;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import com.focuson.config.JwtFilter;
import com.focuson.persistence.dao.UserDaoI;

@SpringBootApplication(scanBasePackages = { "com.focuson.controller", "com.focuson.persistence.dao",
		"com.focuson.persistence.entities", "com.focuson.services",
		"com.focuson.config" }, scanBasePackageClasses = UserDaoI.class)
public class FocusOnBackEndApplication extends SpringBootServletInitializer {

	@Bean
	public FilterRegistrationBean jwtFilter() {
		final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		registrationBean.setFilter(new JwtFilter());
		registrationBean.addUrlPatterns("/files/*");
		registrationBean.addUrlPatterns("/calendar/*");

		return registrationBean;
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(FocusOnBackEndApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(FocusOnBackEndApplication.class, args);
	}
}
