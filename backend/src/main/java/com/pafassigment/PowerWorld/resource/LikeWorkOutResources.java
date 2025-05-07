package com.pafassigment.PowerWorld.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pafassigment.PowerWorld.entity.LikeWorkOut;
import com.pafassigment.PowerWorld.service.LikeWorkOutService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/workouts")
public class LikeWorkOutResources {
    private final LikeWorkOutService likeWorkOutService;

    @Autowired
    public LikeWorkOutResources(LikeWorkOutService likeWorkOutService) {
        this.likeWorkOutService = likeWorkOutService;
    }

    @PostMapping("/{workoutId}/likes")
    public ResponseEntity<Map<String, String>> addLikeToWorkout(@PathVariable String workoutId, @RequestBody LikeWorkOut like) {
        like.setWorkoutId(workoutId);
        likeWorkOutService.addLike(like);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("likes/{likeId}")
    public ResponseEntity<Map<String, String>> removeLikeFromLikeId(@PathVariable String likeId) {
        likeWorkOutService.removeLikeById(likeId);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }
}
