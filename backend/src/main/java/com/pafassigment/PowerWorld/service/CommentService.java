package com.pafassigment.PowerWorld.service;


import java.util.List;

import com.pafassigment.PowerWorld.entity.Comment;


public interface CommentService {

    List<Comment> getCommentsByPostId(String postId);

    List<Comment> getCommentsByUserId(String userId);

    Comment addComment(Comment comment);

    Comment updateComment(Comment comment);

    void deleteComment(String id, String userId);
}
