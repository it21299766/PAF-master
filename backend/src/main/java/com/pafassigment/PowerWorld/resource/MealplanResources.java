package com.pafassigment.PowerWorld.resource;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pafassigment.PowerWorld.entity.Mealplan;
import com.pafassigment.PowerWorld.service.MealplanService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/mealplans")
@AllArgsConstructor
public class MealplanResources  {

    private final MealplanService MealplanService;

    @GetMapping("/")
    public ResponseEntity<List<Mealplan>> getAllMealplans() {
        List<Mealplan> mealplans = this.MealplanService.getAllMealplans();
        return new ResponseEntity<>(mealplans, HttpStatus.OK);
    }

    @GetMapping("/{mealplanId}")
    public ResponseEntity<Mealplan> getWorkoutById(@PathVariable String mealplanId) {
        Optional<Mealplan> workout = this.MealplanService.getMealplanById(mealplanId);
        return workout.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<Mealplan> createWorkout(@Valid @RequestBody Mealplan workout) {
        Mealplan newWorkout = this.MealplanService.createMealplan(workout);
        return new ResponseEntity<>(newWorkout, HttpStatus.CREATED);
    }

    @PutMapping("/{mealplanId}")
    public ResponseEntity<Mealplan> updateWorkout(@PathVariable String mealplanId, @Valid @RequestBody Mealplan workout) {
        Optional<Mealplan> existingWorkout = this.MealplanService.getMealplanById(mealplanId);
        if (existingWorkout.isPresent()) {
            workout.setId(mealplanId);
            Mealplan updatedWorkout = this.MealplanService.updateMealplan(workout);
            return new ResponseEntity<>(updatedWorkout, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{mealplanId}")
    public ResponseEntity<Map<String, String>> deleteMealplan(@PathVariable String mealplanId) {
        Optional<Mealplan> workout = this.MealplanService.getMealplanById(mealplanId);
        Map<String, String> response = new HashMap<>();
        if (workout.isPresent()) {
            this.MealplanService.deleteMealplanById(mealplanId);
            response.put("response", "success");
        } else {
            response.put("response", "failed");
        }
        return ResponseEntity.ok(response);
    }
}
