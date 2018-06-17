package com.focuson.persistence.dao;

import org.springframework.stereotype.Repository;

import com.focuson.persistence.dao.impl.AbstractJpaDao;
import com.focuson.persistence.entities.Calendar;
import com.focuson.persistence.entities.User;

@Repository(value="filesDao")
public interface CalendarDaoI extends AbstractJpaDaoI<Calendar>{

	public String getEventByUser(User tempUser);

	public Calendar getCalendarByUser(User user);

}
