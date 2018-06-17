package com.focuson.persistence.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.focuson.persistence.dao.UserDaoI;
import com.focuson.persistence.entities.Files;
import com.focuson.persistence.entities.User;

@Component
public class UserDaoImpl extends AbstractJpaDao<User> implements UserDaoI {

	private final String USER_USERNAME = "username";
	private final String USER_EMAIL = "email";
	
	@Override
	public boolean existingUsername(String username) {
		CriteriaBuilder criteriaBuilder = super.entityManager.getCriteriaBuilder();
		CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
		Root<User> userRoot = criteriaQuery.from(User.class);
		
		List<Predicate> predicates = new ArrayList<>();
		
		if(!username.isEmpty()) {
			predicates.add(criteriaBuilder.equal(userRoot.<String>get(this.USER_USERNAME),username));
		}
		
		criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()]));
		
	    List<User> resultList = entityManager.createQuery(criteriaQuery).getResultList();
	    if(resultList.size() > 0) {
	    	return true;
	    }
	    
		return false;
	}

	@Override
	public boolean existingEmail(String email) {
		CriteriaBuilder criteriaBuilder = super.entityManager.getCriteriaBuilder();
		CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
		Root<User> userRoot = criteriaQuery.from(User.class);
		
		List<Predicate> predicates = new ArrayList<>();
		
		if(!email.isEmpty()) {
			predicates.add(criteriaBuilder.equal(userRoot.<String>get(this.USER_EMAIL),email));
		}
		
		criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()]));
		
		TypedQuery<User> q = super.entityManager.createQuery(criteriaQuery);
	    User result = q.getSingleResult();
		
	    if(result != null) {
	    	return true;
	    }
	    
		return false;
	}

	@Override
	public User getUserByUsername(String username) {
		CriteriaBuilder criteriaBuilder = super.entityManager.getCriteriaBuilder();
		CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
		Root<User> userRoot = criteriaQuery.from(User.class);
		
		List<Predicate> predicates = new ArrayList<>();
		
		if(username != null && username.length() != 0) {
			predicates.add(criteriaBuilder.equal(userRoot.<String>get(this.USER_USERNAME),username));
		}
		
		criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()]));
		
		
	    
	    List<User> resultList = entityManager.createQuery(criteriaQuery).getResultList();
		return resultList.get(0);
	   
	}

}
