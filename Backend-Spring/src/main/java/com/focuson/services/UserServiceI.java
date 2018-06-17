package com.focuson.services;

import com.focuson.persistence.entities.User;

public interface UserServiceI {
	public User save(User user);

	public boolean existingUsername(String userUsername);

	public boolean existingEmail(String userEmail);

	public User getUserByUsername(String username);
}
