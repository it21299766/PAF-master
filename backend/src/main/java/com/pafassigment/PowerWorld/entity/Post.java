package com.pafassigment.PowerWorld.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Entity representing a post in a social media context.
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    @NotBlank(message = "User ID must not be empty")
    private String userId;

    private List<@NotBlank(message = "Image URL must not be empty") String> fileUrl;

    @Size(max = 1500, message = "Description must not exceed 500 characters")
    private String description;


    private LocalDateTime postedTime = LocalDateTime.now();

    private String postType;

    private User postedUser;

    private List<Comment> comments;

    private List<Like> likes;

}
