package com.focuson.persistence.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.focuson.persistence.dao.FilesDaoI;
import com.focuson.persistence.entities.Files;
import com.focuson.persistence.entities.User;


@Component
public class FilesDaoImpl extends AbstractJpaDao<Files> implements FilesDaoI {

	private final String FILES_USER = "user";
	
	public FilesDaoImpl() {
		super.setClazz(Files.class);
	}
	
	@Override
	public List<Files> getAllFilesByUser(String user) {
		
		CriteriaBuilder criteriaBuilder = super.entityManager.getCriteriaBuilder();
		CriteriaQuery<Files> criteriaQuery = criteriaBuilder.createQuery(Files.class);
		Root<Files> filesRoot = criteriaQuery.from(Files.class);
		
		List<Predicate> predicates = new ArrayList<>();
		
		
		predicates.add(criteriaBuilder.equal(filesRoot.<String>get(this.FILES_USER), user));
		
		
		criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
		
		List<Files> resultList = entityManager.createQuery(criteriaQuery).getResultList();
		return resultList;
	}

}
