package com.pafassigment.PowerWorld.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * Represents a like made by a user on a post within the system.
 */
@Data
@Builder
@Document(collection = "likeWorkOut")
public class LikeWorkOut {
    @Id
    private String id;

    @NotBlank(message = "User ID must not be blank")
    private String userId;

   
    @NotBlank(message = "workoutId ID must not be blank")
    private String workoutId;


    private LocalDateTime likedTime = LocalDateTime.now();

    private User likedUser;

}
