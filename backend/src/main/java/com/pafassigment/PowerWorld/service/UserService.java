package com.pafassigment.PowerWorld.service;


import java.util.List;
import java.util.Map;

import com.pafassigment.PowerWorld.entity.User;

public interface UserService {

    User getByUserId(String id);

    List<User> getAllUsers();

    Map<String, String> deleteUserById(String id);

    User editUserById(String id, User user);
}
