package com.pafassigment.PowerWorld.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pafassigment.PowerWorld.entity.User;

import java.util.Optional;

@Repository
public interface UserDao extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

}
