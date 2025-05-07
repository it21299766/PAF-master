package com.pafassigment.PowerWorld.resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pafassigment.PowerWorld.entity.Comment_WO;
import com.pafassigment.PowerWorld.service.CommentWOService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wo_comments")
public class CommentWOResources {

    private final CommentWOService commentWOService;

    public CommentWOResources(CommentWOService commentWOService) {
        this.commentWOService = commentWOService;
    }

    @GetMapping("/workout/{workoutId}")
    public List<Comment_WO> getCommentsByWorkoutId(@PathVariable String workoutId) {
        return this.commentWOService.getCommentsByWorkoutId(workoutId);
    }


    @GetMapping("/user/{userId}")
    public List<Comment_WO> getCommentsByUserId(@PathVariable String userId) {
        return this.commentWOService.getCommentsByUserId(userId);
    }


    @PostMapping("/")
    public ResponseEntity<Comment_WO> addComment(@Valid @RequestBody Comment_WO comment) {
        Comment_WO savedComment = this.commentWOService.addComment(comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Comment_WO updateComment(@PathVariable String id, @Valid @RequestBody Comment_WO comment) {
        comment.setId(id);
        return this.commentWOService.updateComment(comment);
    }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable String id, @PathVariable String userId) {
        commentWOService.deleteComment(id, userId);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }

}
