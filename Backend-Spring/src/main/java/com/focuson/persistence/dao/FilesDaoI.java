package com.focuson.persistence.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.focuson.persistence.entities.Files;
import com.focuson.persistence.entities.User;

@Repository(value="filesDao")
public interface FilesDaoI extends AbstractJpaDaoI<Files> {

	public List<Files> getAllFilesByUser(String user);

}
