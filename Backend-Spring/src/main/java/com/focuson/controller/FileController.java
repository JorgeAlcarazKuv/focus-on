package com.focuson.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.focuson.persistence.entities.Files;
import com.focuson.persistence.entities.User;
import com.focuson.services.FilesServiceI;
import com.focuson.services.UserServiceI;

import javassist.tools.web.BadHttpRequest;

@CrossOrigin
@RestController
@RequestMapping("/files")
public class FileController {


	@Autowired
	private UserServiceI userService;

	@Autowired
	private FilesServiceI filesService;

	/**
	 * Retrieves the user's file list.
	 * @param userBody
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public List<Files> getAllFilesByUser(@RequestBody User userBody) {
		if (userBody != null) {
			return filesService.getAllFilesByUser(userBody.getUsername());
		} else {
			return null;
		}
	}
	
	/**
	 * Updates the users files list.
	 * @param fileList
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.PUT)
	public List<Files> saveFiles(@RequestBody List<Files> fileList) {
		String user = null;
		if(fileList != null) {
			user = fileList.get(0).getUser();
			filesService.deleteFileList(fileList);
			filesService.createFileList(fileList);
		}
		return filesService.getAllFilesByUser(user);
	}
	
	/**
	 * Deletes a file.
	 * @param fileId
	 */
	@RequestMapping(method = RequestMethod.DELETE)
	public void deleteFile(@PathParam("fileId") Long fileId) {
		if(fileId != null) {
			filesService.delete(fileId);
		}
	}
	
}
