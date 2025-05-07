package com.pafassigment.PowerWorld.service;

import java.util.List;
import java.util.Optional;

import com.pafassigment.PowerWorld.entity.Workout;

public interface WorkoutService {

    List<Workout> getAllWorkouts();

    Optional<Workout> getWorkoutById(String workoutId);

    Workout createWorkout(Workout workout);

    Workout updateWorkout(Workout workout);

    void deleteWorkoutById(String workoutId);
}
