package com.pafassigment.PowerWorld.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.Comment_WO;

import java.util.List;


@Repository
public interface Comment_WODao extends MongoRepository<Comment_WO, String> {


    List<Comment_WO> findByUserId(String userId);

    List<Comment_WO> findByWorkoutId(String workoutId);



}
