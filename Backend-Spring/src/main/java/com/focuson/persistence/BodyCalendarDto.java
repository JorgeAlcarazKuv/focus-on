package com.focuson.persistence;

import java.io.Serializable;

public class BodyCalendarDto implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2879530085265620921L;
	private String events;
	private String username;

	public String getEvents() {
		return events;
	}

	public void setEvents(String events) {
		this.events = events;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
