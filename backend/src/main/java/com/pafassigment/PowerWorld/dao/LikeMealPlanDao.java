package com.pafassigment.PowerWorld.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.LikeMealPlan;

import java.util.List;

@Repository
public interface LikeMealPlanDao extends MongoRepository<LikeMealPlan, String> {
  
    List<LikeMealPlan> findByMealplanId(String id);

}
