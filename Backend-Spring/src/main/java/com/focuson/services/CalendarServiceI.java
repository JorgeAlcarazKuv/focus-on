package com.focuson.services;

import java.util.List;

import com.focuson.persistence.entities.Calendar;
import com.focuson.persistence.entities.Files;
import com.focuson.persistence.entities.User;

public interface CalendarServiceI {

	public String getEventsByUser(User tempUser);

	public Calendar getCalendarByUser(User user);

	public void save(Calendar calendar);

	public void create(Calendar calendar);

}
