package com.pafassigment.PowerWorld.service;


import com.pafassigment.PowerWorld.entity.Like;

public interface LikeService {
    void addLike(Like like);

    void removeLikeById(String likeId);
}
