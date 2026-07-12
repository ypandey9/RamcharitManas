package com.ypandey.ramcharitmanas.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class UserDashboardStats {

    // Existing fields
    private long bookmarkCount;

    private String currentKand;

    private Long currentVerseId;

    private LocalDateTime lastRead;

    // New fields
    private String currentVerseType;

    private List<String> currentVerseText;

    private long totalVerses;

    private long totalReadVerses;

    private int progressPercentage;

}