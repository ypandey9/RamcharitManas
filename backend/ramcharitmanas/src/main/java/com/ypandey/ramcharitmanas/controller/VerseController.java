package com.ypandey.ramcharitmanas.controller;

import com.ypandey.ramcharitmanas.dto.DashboardStats;
import com.ypandey.ramcharitmanas.dto.ReadingPageResponse;
import com.ypandey.ramcharitmanas.dto.VerseNavigationResponse;
import com.ypandey.ramcharitmanas.model.Verse;

import com.ypandey.ramcharitmanas.service.VerseService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/verses")

@RequiredArgsConstructor

@CrossOrigin(
        origins = "http://localhost:3000"
)
public class VerseController {

    private final VerseService verseService;

    // GET ALL
    @GetMapping
    public List<Verse> getAllVerses() {

        return verseService.getAllVerses();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Verse getVerseById(
            @PathVariable Long id
    ) {

        return verseService.getVerseById(id);
    }

    // ADD
    @PostMapping
    public Verse addVerse(
            @RequestBody Verse verse
    ) {

        return verseService.addVerse(verse);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Verse updateVerse(

            @PathVariable Long id,

            @RequestBody Verse verse
    ) {

        return verseService.updateVerse(
                id,
                verse
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public boolean deleteVerse(
            @PathVariable Long id
    ) {

        return verseService.deleteVerse(id);
    }

    //Search
@GetMapping("/search/text")
public Page<Verse> searchVerses(

        @RequestParam String query,

        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "5")
        int size

) {

    return verseService.searchVerses(
            query,
            page,
            size
    );
}

    @GetMapping("/paged")
public Page<Verse> getPagedVerses(

        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "10")
        int size,

        @RequestParam(defaultValue = "id")
        String sortBy

) {

    return verseService.getVerses(
            page,
            size,
            sortBy
    );
}

@GetMapping("/stats")
public DashboardStats getStats() {

    return verseService.getDashboardStats();
}

@GetMapping("/{id}/navigation")
public VerseNavigationResponse getNavigation (
    @PathVariable Long id
){
    return verseService.getNavigation(id);
}

@GetMapping("/read/{verseId}")
public ReadingPageResponse getReadingPage(

        @PathVariable Long verseId

) {

    return verseService.getReadingPage(

            verseId

    );

}


}