package com.pafassigment.PowerWorld.service;


import java.util.List;

import com.pafassigment.PowerWorld.entity.Comment_MP;


public interface CommentMPService { 

    List<Comment_MP> getCommentsByMealplanId(String mealplanId);

    List<Comment_MP> getCommentsByUserId(String userId);

    Comment_MP addComment(Comment_MP comment);

    Comment_MP updateComment(Comment_MP comment);

    void deleteComment(String id, String userId);
}
