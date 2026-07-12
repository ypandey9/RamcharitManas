package com.ypandey.ramcharitmanas.dto;

import java.time.LocalDateTime;

import lombok.Data;


@Data
public class BookmarkResponse {
    
    private Long id;
    private Long verseId;
    private LocalDateTime createdAt;
}
