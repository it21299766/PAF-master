package com.pafassigment.PowerWorld.resource;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pafassigment.PowerWorld.entity.Workout;
import com.pafassigment.PowerWorld.service.WorkoutService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/workouts")
@AllArgsConstructor
public class WorkoutResources {

    private final WorkoutService workoutService;

    @GetMapping("/")
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        List<Workout> workouts = this.workoutService.getAllWorkouts();
        return new ResponseEntity<>(workouts, HttpStatus.OK);
    }

    @GetMapping("/{workoutId}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable String workoutId) {
        Optional<Workout> workout = this.workoutService.getWorkoutById(workoutId);
        return workout.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<Workout> createWorkout(@Valid @RequestBody Workout workout) {
        Workout newWorkout = this.workoutService.createWorkout(workout);
        return new ResponseEntity<>(newWorkout, HttpStatus.CREATED);
    }

    @PutMapping("/{workoutId}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable String workoutId, @Valid @RequestBody Workout workout) {
        Optional<Workout> existingWorkout = this.workoutService.getWorkoutById(workoutId);
        if (existingWorkout.isPresent()) {
            workout.setId(workoutId);
            Workout updatedWorkout = this.workoutService.updateWorkout(workout);
            return new ResponseEntity<>(updatedWorkout, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{workoutId}")
    public ResponseEntity<Map<String, String>> deleteWorkout(@PathVariable String workoutId) {
        Optional<Workout> workout = this.workoutService.getWorkoutById(workoutId);
        Map<String, String> response = new HashMap<>();
        if (workout.isPresent()) {
            this.workoutService.deleteWorkoutById(workoutId);
            response.put("response", "success");
        } else {
            response.put("response", "failed");
        }
        return ResponseEntity.ok(response);
    }
}
