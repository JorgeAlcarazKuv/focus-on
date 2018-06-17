package com.focuson.services;

import java.util.List;

import com.focuson.persistence.entities.Files;
import com.focuson.persistence.entities.User;

public interface FilesServiceI {

	public List<Files> getAllFilesByUser(String user);

	public void deleteFileList(List<Files> fileList);

	public void createFileList(List<Files> fileList);

	public void delete(Long fileId);

}
