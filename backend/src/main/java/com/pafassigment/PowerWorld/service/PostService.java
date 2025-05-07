package com.pafassigment.PowerWorld.service;

import java.util.List;
import java.util.Optional;

import com.pafassigment.PowerWorld.entity.Post;

public interface PostService {

    List<Post> getAllPosts();

    Optional<Post> getPostById(String postId);

    Post createPost(Post post);

    Post updatePost(Post post);

    void deletePostById(String postId);
}
