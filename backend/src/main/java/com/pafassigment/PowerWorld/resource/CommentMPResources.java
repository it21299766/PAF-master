package com.pafassigment.PowerWorld.resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pafassigment.PowerWorld.entity.Comment_MP;
import com.pafassigment.PowerWorld.service.CommentMPService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mp_comments")
public class CommentMPResources {

    private final CommentMPService commentMPService;

    public CommentMPResources(CommentMPService commentMPService) {
        this.commentMPService = commentMPService;
    }

    @GetMapping("/mealplan/{mealplanId}")
    public List<Comment_MP> getCommentsByMealplanId(@PathVariable String mealplanId) {
        return this.commentMPService.getCommentsByMealplanId(mealplanId);
    }

    @GetMapping("/user/{userId}")
    public List<Comment_MP> getCommentsByUserId(@PathVariable String userId) {
        return this.commentMPService.getCommentsByUserId(userId);
    }

    @PostMapping("/")
    public ResponseEntity<Comment_MP> addComment(@Valid @RequestBody Comment_MP comment) {
        Comment_MP savedComment = this.commentMPService.addComment(comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Comment_MP updateComment(@PathVariable String id, @Valid @RequestBody Comment_MP comment) {
        comment.setId(id);
        return this.commentMPService.updateComment(comment);
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Comment_MP> updateComment(@PathVariable String id,
    // @Valid @RequestBody Comment_MP comment) {
    // comment.setId(id);
    // Comment_MP updatedComment = this.commentMPService.updateComment(comment);
    // return ResponseEntity.ok(updatedComment);
    // }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable String id, @PathVariable String userId) {
        commentMPService.deleteComment(id, userId);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }

}
