package com.ypandey.ramcharitmanas.model;

import jakarta.persistence.*;

import lombok.Data;

import java.util.List;

import org.hibernate.annotations.BatchSize;

@Entity
@Data
public class Verse {

    @Id
    private Long id;

    private String kand;

    private String type;

    @ElementCollection
    @BatchSize(size=20)
    private List<String> text;

    @ElementCollection
    @BatchSize(size = 20)
    private List<String> transliteration;

    @Column(length = 5000)
    private String arth;

    @Column(length = 5000)
    private String english;
}