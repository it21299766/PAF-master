package com.pafassigment.PowerWorld.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.Post;

@Repository
public interface PostDao extends MongoRepository<Post, String> {
}
