package com.ypandey.ramcharitmanas.dto;

import java.time.LocalDateTime;

public class ReadingProgressResponse {
    
    private String kand;
    private Long verseId;
    private LocalDateTime lastReadAt;
    
    public String getKand() {
        return kand;
    }
    public void setKand(String kand) {
        this.kand = kand;
    }
    public Long getVerseId() {
        return verseId;
    }
    public void setVerseId(Long verseId) {
        this.verseId = verseId;
    }
    public LocalDateTime getLastReadAt() {
        return lastReadAt;
    }
    public void setLastReadAt(LocalDateTime lastReadAt) {
        this.lastReadAt = lastReadAt;
    }

    
}
