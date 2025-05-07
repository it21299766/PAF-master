package com.pafassigment.PowerWorld.service;


import com.pafassigment.PowerWorld.entity.LikeWorkOut ;

public interface LikeWorkOutService {
    void addLike(LikeWorkOut  like);

    void removeLikeById(String likeId);
}
