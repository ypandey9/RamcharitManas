package com.ypandey.ramcharitmanas.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "reading_progress")
public class ReadingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne

    @JoinColumn(
            name = "user_id",
            unique = true
    )

    private User user;

    private String kand;

    private Long verseId;

    private LocalDateTime lastReadAt;

}