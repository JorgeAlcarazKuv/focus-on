package com.focuson.persistence.dao;

import java.io.Serializable;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.jpa.repository.JpaRepository;

@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public interface AbstractJpaDaoI<T extends Serializable> {
	 
	 
	   public T findOne( long id );
	   
	   public List< T > findAll();
	 
	   public void create( T entity );
	 
	   public T update( T entity );
	 
	   public void delete( T entity );
	   
	   public void deleteById( long entityId );
}
