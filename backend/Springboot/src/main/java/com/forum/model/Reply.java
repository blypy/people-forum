package com.forum.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Reply {
    private Long id;
    private Long postId;
    private Long userId;
    private String content;
    private LocalDateTime createdAt;
}
