package com.ypandey.ramcharitmanas.model;

import jakarta.persistence.*;

import lombok.Data;

import java.util.List;

@Entity
@Data
public class Verse {

    @Id
    private Long id;

    private String kand;

    private String type;

    @ElementCollection
    private List<String> text;

    @ElementCollection
    private List<String> transliteration;

    @Column(length = 5000)
    private String arth;

    @Column(length = 5000)
    private String english;
}