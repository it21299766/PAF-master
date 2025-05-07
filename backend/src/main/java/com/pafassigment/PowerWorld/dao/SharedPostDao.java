package com.pafassigment.PowerWorld.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.SharedPost;

@Repository
public interface SharedPostDao extends MongoRepository<SharedPost, String> {
}
