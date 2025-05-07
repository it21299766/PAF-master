package com.pafassigment.PowerWorld.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.Comment_MP;

import java.util.List;


@Repository
public interface Comment_MPDao extends MongoRepository<Comment_MP, String> {


    List<Comment_MP> findByUserId(String userId);

    List<Comment_MP> findByMealplanId(String mealplanId);



}
