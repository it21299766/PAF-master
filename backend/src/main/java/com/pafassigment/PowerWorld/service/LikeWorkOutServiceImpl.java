package com.pafassigment.PowerWorld.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pafassigment.PowerWorld.dao.LikeWorkOutDao;
import com.pafassigment.PowerWorld.entity.LikeWorkOut;

@Service
public class LikeWorkOutServiceImpl implements LikeWorkOutService {
    private final LikeWorkOutDao likeWorkOutDao;

    public LikeWorkOutServiceImpl(LikeWorkOutDao likeWorkOutDao) {
        this.likeWorkOutDao = likeWorkOutDao;
    }

    @Override
    @Transactional
    public void addLike(LikeWorkOut like) {
        if (like == null) {
            throw new IllegalArgumentException("Cannot add a null like");
        }
        likeWorkOutDao.save(like);
    }

    @Override
    @Transactional
    public void removeLikeById(String likeId) {
        if (likeId == null || likeId.isEmpty()) {
            throw new IllegalArgumentException("Like ID must not be null or empty");
        }
        likeWorkOutDao.deleteById(likeId);
    }
}
