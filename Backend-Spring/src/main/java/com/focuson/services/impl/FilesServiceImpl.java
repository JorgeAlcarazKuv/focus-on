package com.focuson.services.impl;

import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import com.focuson.persistence.dao.FilesDaoI;
import com.focuson.persistence.entities.Files;
import com.focuson.persistence.entities.User;
import com.focuson.services.FilesServiceI;

@Service(value = "filesService")
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class FilesServiceImpl implements FilesServiceI {

	@Autowired
	private FilesDaoI filesDao;

	@Override
	public List<Files> getAllFilesByUser(String user) {

		return filesDao.getAllFilesByUser(user);
	}

	@Override
	public void deleteFileList(List<Files> fileList) {
		Iterator<Files> iterator = fileList.iterator();
		while (iterator.hasNext()) {
			Long id = iterator.next().getId();
			if (id != null) {
				filesDao.deleteById(id);
			}
		}

	}

	@Override
	public void createFileList(List<Files> fileList) {
		Iterator<Files> iterator = fileList.iterator();
		while (iterator.hasNext()) {
			filesDao.create(iterator.next());
		}

	}

	@Override
	public void delete(Long fileId) {
		filesDao.deleteById(fileId);
	}

}
