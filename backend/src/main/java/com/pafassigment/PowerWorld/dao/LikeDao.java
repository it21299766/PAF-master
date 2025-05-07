package com.pafassigment.PowerWorld.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.Like;

import java.util.List;

@Repository
public interface LikeDao extends MongoRepository<Like, String> {
    List<Like> findByPostId(String id);
}
