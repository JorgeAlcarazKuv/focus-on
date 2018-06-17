package com.focuson.persistence.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.focuson.persistence.dao.CalendarDaoI;
import com.focuson.persistence.entities.Calendar;
import com.focuson.persistence.entities.User;

@Component
public class CalendarDaoImpl extends AbstractJpaDao<Calendar> implements CalendarDaoI {

	private final String USER = "user";

	@Override
	public String getEventByUser(User tempUser) {
		CriteriaBuilder criteriaBuilder = super.entityManager.getCriteriaBuilder();
		CriteriaQuery<Calendar> criteriaQuery = criteriaBuilder.createQuery(Calendar.class);
		Root<Calendar> calendarRoot = criteriaQuery.from(Calendar.class);

		List<Predicate> predicates = new ArrayList<>();

		if (tempUser != null) {
			predicates.add(criteriaBuilder.equal(calendarRoot.get(this.USER), tempUser));
		} else {
			return null;
		}

		criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));

		List<Calendar> resultList = entityManager.createQuery(criteriaQuery).getResultList();

		if(resultList.size() > 0) {
		return resultList.get(0).getEvents();
		}else {
			return null;
		}
	}

	@Override
	public Calendar getCalendarByUser(User user) {
		CriteriaBuilder criteriaBuilder = super.entityManager.getCriteriaBuilder();
		CriteriaQuery<Calendar> criteriaQuery = criteriaBuilder.createQuery(Calendar.class);
		Root<Calendar> calendarRoot = criteriaQuery.from(Calendar.class);

		List<Predicate> predicates = new ArrayList<>();

		if (user != null) {
			predicates.add(criteriaBuilder.equal(calendarRoot.get(this.USER), user));
		} else {
			return null;
		}

		criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));

		List<Calendar> resultList = entityManager.createQuery(criteriaQuery).getResultList();
		if (resultList.size() > 0) {
			return resultList.get(0);
		} else {
			return null;
		}
	}
}
