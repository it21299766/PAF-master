package com.pafassigment.PowerWorld.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.Workout;

@Repository
public interface WorkoutDao  extends MongoRepository<Workout, String> {
}
