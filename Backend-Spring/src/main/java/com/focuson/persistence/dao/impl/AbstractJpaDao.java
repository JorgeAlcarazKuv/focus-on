package com.focuson.persistence.dao.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.focuson.persistence.dao.AbstractJpaDaoI;

public class AbstractJpaDao<T extends Serializable> implements AbstractJpaDaoI<T> {

	private Class<T> clazz;

	@PersistenceContext
	EntityManager entityManager;

	public final void setClazz(Class<T> clazzToSet) {
		this.clazz = clazzToSet;
	}

	public T findOne(long id) {
		return entityManager.find(clazz, id);
	}

	public List<T> findAll() {
		return entityManager.createQuery("from " + clazz.getName()).getResultList();
	}

	public void create(T entity) {
		entityManager.persist(entityManager.contains(entity) ? entity : entityManager.merge(entity));

	}

	public T update(T entity) {
		return entityManager.merge(entity);
	}

	public void delete(T entity) {
		entityManager.remove(entityManager.contains(entity) ? entity : entityManager.merge(entity));
	}

	public void deleteById(long entityId) {
		Class claz = entityManager.getClass();
		T entity = findOne(entityId);
		delete(entity);
	}
}
