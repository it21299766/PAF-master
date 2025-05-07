package com.pafassigment.PowerWorld.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pafassigment.PowerWorld.dao.LikeMealPlanDao;
import com.pafassigment.PowerWorld.entity.LikeMealPlan;

@Service
public class LikeMealPlanServiceImpl implements LikeMealPlanService {
    private final LikeMealPlanDao likeMealPlanDao;

    public LikeMealPlanServiceImpl(LikeMealPlanDao likeMealPlanDao) {
        this.likeMealPlanDao = likeMealPlanDao;
    }

    @Override
    @Transactional
    public void addLike(LikeMealPlan like) {
        if (like == null) {
            throw new IllegalArgumentException("Cannot add a null like");
        }
        likeMealPlanDao.save(like);
    }

    @Override
    @Transactional
    public void removeLikeById(String likeId) {
        if (likeId == null || likeId.isEmpty()) {
            throw new IllegalArgumentException("Like ID must not be null or empty");
        }
        likeMealPlanDao.deleteById(likeId);
    }
}
