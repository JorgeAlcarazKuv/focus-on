package com.focuson.services.impl;

import javax.transaction.Transactional;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import com.focuson.persistence.dao.CalendarDaoI;
import com.focuson.persistence.entities.Calendar;
import com.focuson.persistence.entities.User;
import com.focuson.services.CalendarServiceI;

@Service("calendarService")
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class CalendarServiceImpl implements CalendarServiceI {

	Logger logger = Logger.getLogger(CalendarServiceImpl.class);
	
	@Autowired
	private CalendarDaoI calendarDao;
	
	@Override
	public String getEventsByUser(User tempUser) {
		
		return calendarDao.getEventByUser(tempUser);
	}

	@Override
	public Calendar getCalendarByUser(User user) {
		
		return calendarDao.getCalendarByUser(user);
	}

	@Override
	public void save(Calendar calendar) {
		logger.info("Se va a actualizar el calendar con id " + calendar.getId());
		calendarDao.update(calendar);
		logger.info("Actualizado");
	}

	@Override
	public void create(Calendar calendar) {
		calendarDao.create(calendar);
	}

}
