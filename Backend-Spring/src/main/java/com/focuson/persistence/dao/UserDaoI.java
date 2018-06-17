package com.focuson.persistence.dao;

import org.springframework.stereotype.Repository;

import com.focuson.persistence.entities.User;

@Repository(value="userDao")
public interface UserDaoI extends AbstractJpaDaoI<User>{

	public boolean existingUsername(String username);

	public boolean existingEmail(String email);

	public User getUserByUsername(String username);

}
