package com.pafassigment.PowerWorld.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pafassigment.PowerWorld.dao.Comment_MPDao;
import com.pafassigment.PowerWorld.dao.UserDao;
import com.pafassigment.PowerWorld.entity.Comment_MP;
import com.pafassigment.PowerWorld.exception.DataNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentMPServiceImpl implements CommentMPService {

    private final UserDao userDao;
    private final Comment_MPDao comment_MPDao;

    public CommentMPServiceImpl(Comment_MPDao comment_MPDao, UserDao userDao) {
        this.comment_MPDao = comment_MPDao;
        this.userDao = userDao;
    }

    @Override
    public List<Comment_MP> getCommentsByMealplanId(String mealplanId) {
        return comment_MPDao.findByMealplanId(mealplanId);
    }

    @Override
    public List<Comment_MP> getCommentsByUserId(String userId) {
        return comment_MPDao.findByUserId(userId);
    }

    @Override
    @Transactional
    public Comment_MP addComment(Comment_MP comment) {
        comment.setCommentedTime(LocalDateTime.now());
        Comment_MP savedComment = comment_MPDao.save(comment);
        setUserForComment(savedComment);
        return savedComment;
    }

    @Override
    @Transactional
    public Comment_MP updateComment(Comment_MP comment) {
        return comment_MPDao.findById(comment.getId())
                .map(existingComment -> updateExistingComment(existingComment, comment))
                .orElseThrow(() -> new DataNotFoundException("Comment not found with ID: " + comment.getId()));
    }

    // @Override
    // @Transactional
    // public Comment_MP updateComment(String id, Comment_MP updatedComment) {
    //     Comment_MP existingComment = comment_MPDao.findById(id)
    //             .orElseThrow(() -> new DataNotFoundException("Comment not found with ID: " + id));

    //     // Only update if the comment text is provided
    //     if (updatedComment.getText() != null && !updatedComment.getText().isEmpty()) {
    //         existingComment.setText(updatedComment.getText());
    //     }

    //     return comment_MPDao.save(existingComment);
    // }

    private Comment_MP updateExistingComment(Comment_MP existingComment, Comment_MP updatedComment) {
        existingComment.setText(updatedComment.getText());
        Comment_MP savedComment = comment_MPDao.save(existingComment);
        setUserForComment(savedComment);
        return savedComment;
    }

    @Override
    @Transactional
    public void deleteComment(String id, String userId) {
        Comment_MP comment = comment_MPDao.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Comment not found with ID: " + id));

        if (!comment.getUserId().equals(userId)) {
            throw new DataNotFoundException("You don't have permission to delete this comment.");
        }

        comment_MPDao.deleteById(id);
    }

    private void setUserForComment(Comment_MP comment) {
        userDao.findById(comment.getUserId())
                .ifPresent(comment::setCommentedUser);
    }
}
