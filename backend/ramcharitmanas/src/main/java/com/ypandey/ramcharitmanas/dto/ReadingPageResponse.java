package com.ypandey.ramcharitmanas.dto;

import java.util.List;

import com.ypandey.ramcharitmanas.model.Verse;

import lombok.Data;

@Data
public class ReadingPageResponse {
    
List<Verse> verses;
Long previousStartVerseId;
Long nextStartVerseId;
boolean hasPrevious;
boolean hasNext;

}
