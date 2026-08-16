package com.ypandey.ramcharitmanas.service;

import com.ypandey.ramcharitmanas.dto.DashboardStats;
import com.ypandey.ramcharitmanas.dto.ReadingPageResponse;
import com.ypandey.ramcharitmanas.dto.VerseNavigationResponse;
import com.ypandey.ramcharitmanas.model.Verse;

import com.ypandey.ramcharitmanas.repository.VerseRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.ArrayList;
import java.util.Collections;

@Service

@RequiredArgsConstructor
public class VerseService {

private static final int PAGE_SIZE = 5;

    private final VerseRepository verseRepository;

    // GET ALL
    public List<Verse> getAllVerses() {

        return verseRepository.findAll();
    }

    // GET BY ID
    public Verse getVerseById(Long id) {

        return verseRepository
                .findById(id)
                .orElse(null);
    }

    // ADD
    public Verse addVerse(Verse verse) {

        return verseRepository.save(verse);
    }

    // UPDATE
    public Verse updateVerse(
            Long id,
            Verse updatedVerse
    ) {

        updatedVerse.setId(id);

        return verseRepository.save(updatedVerse);
    }

    // DELETE
    public boolean deleteVerse(Long id) {

        verseRepository.deleteById(id);

        return true;
    }

    // SEARCH
public Page<Verse> searchVerses(
        String query,
        int page,
        int size
) {

    Pageable pageable =
            PageRequest.of(
                    page,
                    size,
                    Sort.by("id")
            );

    return verseRepository.searchVerses(
            query,
            pageable
    );
}

public Page<Verse> getVerses(
        int page,
        int size,
        String sortBy
) {

    Pageable pageable =
            PageRequest.of(
                    page,
                    size,
                    Sort.by(sortBy)
            );

    return verseRepository.findAll(
            pageable
    );
}

public DashboardStats getDashboardStats() {

    DashboardStats stats =
            new DashboardStats();

    stats.setTotalVerses(
            verseRepository.count()
    );

    stats.setTotalDoha(
            verseRepository.countByType("doha")
    );

    stats.setTotalChaupai(
            verseRepository.countByType("chaupai")
    );

    stats.setTotalShlok(
            verseRepository.countByType("shlok")
    );

    stats.setTotalSoratha(
            verseRepository.countByType("soratha")
    );

    return stats;
}

public VerseNavigationResponse getNavigation(Long id) {

        VerseNavigationResponse response =
                new VerseNavigationResponse();

        verseRepository
             .findFirstByIdLessThanOrderByIdDesc(id)
             .ifPresent(verse->response.setPreviousId(verse.getId()));

        verseRepository
             .findFirstByIdGreaterThanOrderByIdAsc(id)
             .ifPresent(verse->response.setNextId(verse.getId()));

        return response;
        }
        

public ReadingPageResponse getReadingPage(
        Long verseId
) {

    // ==========================================
    // Verify that the requested verse exists
    // ==========================================

    Verse currentVerse =
            verseRepository
                    .findById(verseId)
                    .orElseThrow(
                            () -> new RuntimeException(
                                    "Verse not found: " + verseId
                            )
                    );


    // ==========================================
    // Current page + next page check
    // ==========================================

    List<Verse> currentAndNext =
            verseRepository
                    .findTop6ByIdGreaterThanEqualOrderByIdAsc(
                            currentVerse.getId()
                    );


    // ==========================================
    // Current 5 verses
    // ==========================================

    List<Verse> verses =
            currentAndNext
                    .stream()
                    .limit(PAGE_SIZE)
                    .toList();


    ReadingPageResponse response =
            new ReadingPageResponse();

    response.setVerses(verses);


    // ==========================================
    // Previous Page
    // ==========================================

    List<Verse> previousVerses =
            verseRepository
                    .findTop5ByIdLessThanOrderByIdDesc(
                            currentVerse.getId()
                    );

    if (!previousVerses.isEmpty()) {

        previousVerses =
                new ArrayList<>(
                        previousVerses
                );

        Collections.reverse(
                previousVerses
        );

        response.setHasPrevious(true);

        response.setPreviousStartVerseId(
                previousVerses
                        .get(0)
                        .getId()
        );

    } else {

        response.setHasPrevious(false);

        response.setPreviousStartVerseId(null);
    }


    // ==========================================
    // Next Page
    // ==========================================

    if (currentAndNext.size() > PAGE_SIZE) {

        response.setHasNext(true);

        response.setNextStartVerseId(
                currentAndNext
                        .get(PAGE_SIZE)
                        .getId()
        );

    } else {

        response.setHasNext(false);

        response.setNextStartVerseId(null);
    }


    return response;
}



public Page<Verse> getVersesByKand(
        String kand,
        int page,
        int size
) {

    Pageable pageable =
            PageRequest.of(
                    page,
                    size,
                    Sort.by("id")
            );

    return verseRepository.findByKand(
            kand,
            pageable
    );
}
        

}