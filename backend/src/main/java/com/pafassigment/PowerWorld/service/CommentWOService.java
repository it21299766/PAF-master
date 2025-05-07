package com.pafassigment.PowerWorld.service;


import java.util.List;

import com.pafassigment.PowerWorld.entity.Comment_WO;


public interface CommentWOService { 

    List<Comment_WO> getCommentsByWorkoutId(String workoutId);

    List<Comment_WO> getCommentsByUserId(String userId);

    Comment_WO addComment(Comment_WO comment);

    Comment_WO updateComment(Comment_WO comment);

    void deleteComment(String id, String userId);
}
