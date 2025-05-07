package com.pafassigment.PowerWorld.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.LikeWorkOut;

import java.util.List;

@Repository
public interface LikeWorkOutDao extends MongoRepository<LikeWorkOut, String> {
    List<LikeWorkOut> findByWorkoutId(String id);

}
