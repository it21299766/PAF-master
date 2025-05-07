package com.pafassigment.PowerWorld.service;


import java.util.List;
import java.util.Optional;

import com.pafassigment.PowerWorld.entity.SharedPost;

public interface SharedPostService {
    List<SharedPost> getAllSharedPosts();

    Optional<SharedPost> getSharedPostById(String id);

    SharedPost createSharedPost(SharedPost sharedPost);

    SharedPost updateSharedPost(String id, SharedPost sharedPost);

    void deleteSharedPost(String id);
}
