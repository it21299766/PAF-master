package com.pafassigment.PowerWorld.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pafassigment.PowerWorld.dao.Comment_WODao;
import com.pafassigment.PowerWorld.dao.LikeWorkOutDao;
import com.pafassigment.PowerWorld.dao.WorkoutDao;
import com.pafassigment.PowerWorld.dao.UserDao;
import com.pafassigment.PowerWorld.entity.Comment_WO;
import com.pafassigment.PowerWorld.entity.LikeWorkOut;
import com.pafassigment.PowerWorld.entity.Workout;
import com.pafassigment.PowerWorld.entity.User;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutDao workoutDao;
    private final Comment_WODao comment_WODao;
    private final LikeWorkOutDao likeWorkOutDao;
    private final UserDao userDao;

    public WorkoutServiceImpl(WorkoutDao workoutDao, Comment_WODao comment_WODao,
            LikeWorkOutDao likeWorkOutDao, UserDao userDao) {
        this.workoutDao = workoutDao;
        this.comment_WODao = comment_WODao;
        this.likeWorkOutDao = likeWorkOutDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Workout> getAllWorkouts() {
        List<Workout> workout = workoutDao.findAll();
        workout.forEach(this::mapValuesToWorkout);
        return workout;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Workout> getWorkoutById(String workoutId) {
        Optional<Workout> workout = workoutDao.findById(workoutId);
        workout.ifPresent(this::mapValuesToWorkout);
        return workout;
    }

    @Override
    public Workout createWorkout(Workout workout) {
        if (workout == null) {
            throw new IllegalArgumentException("Workout cannot be null");
        }
        return workoutDao.save(workout);
    }

    @Override
    public Workout updateWorkout(Workout workout) {
        if (workout == null) {
            throw new IllegalArgumentException("Workout cannot be null");
        }
        return workoutDao.save(workout);
    }

    @Override
    public void deleteWorkoutById(String workoutId) {
        workoutDao.deleteById(workoutId);
    }

    private void mapValuesToWorkout(Workout workout) {
        List<Comment_WO> comments = comment_WODao.findByWorkoutId(workout.getId());
        workout.setComments(comments);
        comments.forEach(comment -> {
            Optional<User> user = userDao.findById(comment.getUserId());
            user.ifPresent(comment::setCommentedUser);
        });

        List<LikeWorkOut> likes = likeWorkOutDao.findByWorkoutId(workout.getId());
        workout.setLikes(likes);

        Optional<User> user = userDao.findById(workout.getUserId());
        user.ifPresent(workout::setWorkoutedUser);
    }
}
