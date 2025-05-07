package com.pafassigment.PowerWorld.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.Mealplan;

@Repository
public interface MealplanDao  extends MongoRepository<Mealplan, String> {
}
