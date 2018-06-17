package com.focuson.services.impl;

import java.util.Base64;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import com.focuson.persistence.dao.UserDaoI;
import com.focuson.persistence.entities.User;
import com.focuson.services.UserServiceI;

@Service(value="userService")
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class UserServiceImpl implements UserServiceI {

	@Autowired
	private UserDaoI userDao;
	
	@Override
	public User save(User user) {
		String encodedPass =  Base64.getEncoder().encodeToString(user.getPassword().getBytes());
		user.setPassword(encodedPass);
		userDao.create(user);
		return user; //pensar qué devolver
	}

	@Override
	public boolean existingUsername(String userUsername) {	
		return userDao.existingUsername(userUsername);
	}

	@Override
	public boolean existingEmail(String userEmail) {
		
		return userDao.existingEmail(userEmail);
	}

	@Override
	public User getUserByUsername(String username) {
		
		return userDao.getUserByUsername(username); 
	}
	
}
