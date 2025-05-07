package com.pafassigment.PowerWorld.service;


import com.pafassigment.PowerWorld.entity.LikeMealPlan;

public interface LikeMealPlanService {
    void addLike(LikeMealPlan like);

    void removeLikeById(String likeId);
}
