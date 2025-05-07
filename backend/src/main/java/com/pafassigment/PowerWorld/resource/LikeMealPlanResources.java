package com.pafassigment.PowerWorld.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pafassigment.PowerWorld.entity.LikeMealPlan;
import com.pafassigment.PowerWorld.service.LikeMealPlanService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/mealplans")
public class LikeMealPlanResources {
    private final LikeMealPlanService likeMealPlanService;

    @Autowired
    public LikeMealPlanResources(LikeMealPlanService likeMealPlanService) {
        this.likeMealPlanService = likeMealPlanService;
    }

    @PostMapping("/{mealplanId}/likes")
    public ResponseEntity<Map<String, String>> addLikeToMealplan(@PathVariable String mealplanId, @RequestBody LikeMealPlan like) {
        like.setMealplanId(mealplanId);
        likeMealPlanService.addLike(like);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("likes/{likeId}")
    public ResponseEntity<Map<String, String>> removeLikeFromLikeId(@PathVariable String likeId) {
        likeMealPlanService.removeLikeById(likeId);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }
}
