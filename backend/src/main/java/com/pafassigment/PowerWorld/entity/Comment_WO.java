package com.pafassigment.PowerWorld.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * Represents a comment on a post in the system.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Comment_WO")
public class Comment_WO {

    @Id
    private String id;

    @NotBlank(message = "workoutId ID must not be blank")
    private String workoutId;

    @NotBlank(message = "User ID must not be blank")
    private String userId;

    private LocalDateTime commentedTime = LocalDateTime.now();

    private User commentedUser;

    @NotBlank(message = "Text must not be empty")
    private String text;

}
