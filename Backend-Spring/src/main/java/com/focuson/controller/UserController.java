package com.focuson.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.focuson.persistence.entities.User;
import com.focuson.services.UserServiceI;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserServiceI userService;
	
	/**
	 * Registers an user.
	 * @param user
	 * @return
	 * @throws ServletException
	 */
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public LoginResponse registerUser(@RequestBody User user) throws ServletException {
		String username = user.getUsername();
		String password = user.getPassword();
		if(userService.existingUsername(user.getUsername())) {
			throw new ServletException("This username already exists.");
		}else {
			 userService.save(user);
		}
		return getSessionToken(username,password);
	}


	/**
	 * Retrieves a token for the user to log in.
	 * @param login
	 * @return
	 * @throws ServletException
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public LoginResponse login(@RequestBody User login) throws ServletException {
		return getSessionToken(login.getUsername(), login.getPassword());
	}

	/**
	 * 
	 * @author cristina
	 *
	 */
	@SuppressWarnings("unused")
	private static class LoginResponse {
		public String token;

		public LoginResponse(final String token) {
			this.token = token;
		}
	}
	
	/**
	 * Gets the session token.
	 * @param username
	 * @param password
	 * @return
	 * @throws ServletException
	 */
	private LoginResponse getSessionToken(String username, String password) throws ServletException {
		if (username == null || password == null) {
			throw new ServletException("Please fill in username and password");
		}
		
		System.out.println("USERNAME: " + username);

		User user = userService.getUserByUsername(username);

		if (user == null) {
			throw new ServletException("Username not found.");
		}

		String pwd = user.getPassword();
		byte[] decodedBytes = Base64.getDecoder().decode(pwd);
		String decodedPassword = new String(decodedBytes);

		if (!password.equals(decodedPassword)) {
			throw new ServletException("Invalid login. Please check your name and password.");
		}
		
		LocalDate today = LocalDate.now();
		Date now = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
		LocalDate next2Week = today.plus(2, ChronoUnit.WEEKS);
		Date expirate = Date.from(next2Week.atStartOfDay(ZoneId.systemDefault()).toInstant());
		 return new LoginResponse(Jwts.builder().claim("username", username).setIssuedAt(now).setExpiration(expirate)
					.signWith(SignatureAlgorithm.HS256, "secretkey").compact());
	}
}

