package com.focuson.controller;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.focuson.persistence.BodyCalendarDto;
import com.focuson.persistence.entities.Calendar;
import com.focuson.persistence.entities.User;
import com.focuson.services.CalendarServiceI;
import com.focuson.services.UserServiceI;

@CrossOrigin
@RestController
@RequestMapping("/calendar")
public class CalendarController {

	Logger logger = Logger.getLogger(CalendarController.class);
	
	@Autowired
	private UserServiceI userService;

	@Autowired
	private CalendarServiceI calendarService;

	/**
	 * Gets the user's events.
	 * @param userBody
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public String getEventsByUser(@RequestBody User userBody) {
		logger.info("GET EVENT BY USER --- RequestBody: " + userBody );
		if (userBody != null) {
			User tempUser = userService.getUserByUsername(userBody.getUsername());
			return calendarService.getEventsByUser(tempUser);
		} else {
			return null;
		}
	}

	/**
	 * Saves the events.
	 * @param body
	 * @return
	 */
	@RequestMapping(method = RequestMethod.PUT)
	public String saveEvents(@RequestBody BodyCalendarDto body) {
		logger.info("SAVE EVENTS --- RequestBody: " + body.getEvents() + " -- " + body.getUsername() );
		User user = null;
		if (body.getEvents() != null) {
			user = userService.getUserByUsername(body.getUsername());
			Calendar calendar = calendarService.getCalendarByUser(user);
			if (calendar == null) {
				logger.info("Calendar no encontrado, creando uno");
				calendar = new Calendar();
				calendar.setUser(user);
				calendar.setEvents(body.getEvents());
				calendarService.create(calendar);
			} else {
				calendar.setEvents(body.getEvents());
				logger.info("Calendar encontrado, preparado para actualizar");
				calendarService.save(calendar);
			}
		}
		return "{\"status\":\"ok\"}";
	}

}
