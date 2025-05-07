package com.pafassigment.PowerWorld.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.Comment;

import java.util.List;


@Repository
public interface CommentDao extends MongoRepository<Comment, String> {

    List<Comment> findByPostId(String postId);

    List<Comment> findByUserId(String userId);

}
