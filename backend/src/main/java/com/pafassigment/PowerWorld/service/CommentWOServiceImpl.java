package com.pafassigment.PowerWorld.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pafassigment.PowerWorld.dao.Comment_WODao;
import com.pafassigment.PowerWorld.dao.UserDao;
import com.pafassigment.PowerWorld.entity.Comment_WO;
import com.pafassigment.PowerWorld.exception.DataNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentWOServiceImpl implements CommentWOService {

    private final UserDao userDao;
    private final Comment_WODao comment_WODao;

    public CommentWOServiceImpl(Comment_WODao comment_WODao, UserDao userDao) {
        this.comment_WODao = comment_WODao;
        this.userDao = userDao;
    }

    @Override
    public List<Comment_WO> getCommentsByWorkoutId(String workoutId) {
        return comment_WODao.findByWorkoutId(workoutId);
    }

    @Override
    public List<Comment_WO> getCommentsByUserId(String userId) {
        return comment_WODao.findByUserId(userId);
    }

    @Override
    @Transactional
    public Comment_WO addComment(Comment_WO comment) {
        comment.setCommentedTime(LocalDateTime.now());
        Comment_WO savedComment = comment_WODao.save(comment);
        setUserForComment(savedComment);
        return savedComment;
    }

    @Override
    @Transactional
    public Comment_WO updateComment(Comment_WO comment) {
        return comment_WODao.findById(comment.getId())
                .map(existingComment -> updateExistingComment(existingComment, comment))
                .orElseThrow(() -> new DataNotFoundException("Comment not found with ID: " + comment.getId()));
    }

    private Comment_WO updateExistingComment(Comment_WO existingComment, Comment_WO updatedComment) {
        existingComment.setText(updatedComment.getText());
        Comment_WO savedComment = comment_WODao.save(existingComment);
        setUserForComment(savedComment);
        return savedComment;
    }

    @Override
    @Transactional
    public void deleteComment(String id, String userId) {
        Comment_WO comment = comment_WODao.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Comment not found with ID: " + id));

        if (!comment.getUserId().equals(userId)) {
            throw new DataNotFoundException("You don't have permission to delete this comment.");
        }

        comment_WODao.deleteById(id);
    }

    private void setUserForComment(Comment_WO comment) {
        userDao.findById(comment.getUserId())
                .ifPresent(comment::setCommentedUser);
    }
}
