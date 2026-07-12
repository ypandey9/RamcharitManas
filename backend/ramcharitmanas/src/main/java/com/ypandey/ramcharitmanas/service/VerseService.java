package com.ypandey.ramcharitmanas.service;

import com.ypandey.ramcharitmanas.dto.DashboardStats;
import com.ypandey.ramcharitmanas.dto.ReadingPageResponse;
import com.ypandey.ramcharitmanas.dto.VerseNavigationResponse;
import com.ypandey.ramcharitmanas.model.Verse;

import com.ypandey.ramcharitmanas.repository.VerseRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    //search
    public Page<Verse> searchVerses(
        String query,
        int page,
        int size
) {

    String search = query.toLowerCase();

    List<Verse> filteredVerses =
            verseRepository.findAll()
                    .stream()
                    .filter(verse -> {

                        String text =
                                verse.getText() == null
                                        ? ""
                                        : String.join(" ", verse.getText());

                        String transliteration =
                                verse.getTransliteration() == null
                                        ? ""
                                        : String.join(" ", verse.getTransliteration());

                        String arth =
                                verse.getArth() == null
                                        ? ""
                                        : verse.getArth();

                        String english =
                                verse.getEnglish() == null
                                        ? ""
                                        : verse.getEnglish();

                        String combined =
                                (
                                        text + " "
                                        + transliteration + " "
                                        + arth + " "
                                        + english
                                ).toLowerCase();

                        return combined.contains(search);

                    })
                    .toList();

    int start =
            Math.min(page * size,
                    filteredVerses.size());

    int end =
            Math.min(start + size,
                    filteredVerses.size());

    List<Verse> pageContent =
            filteredVerses.subList(
                    start,
                    end
            );

    return new PageImpl<>(
            pageContent,
            PageRequest.of(page, size),
            filteredVerses.size()
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
        

public ReadingPageResponse getReadingPage(Long verseId) {

    List<Verse> allVerses = verseRepository.findAll();

    allVerses.sort(
            Comparator.comparing(Verse::getId)
    );

    int currentIndex = -1;

    for (int i = 0; i < allVerses.size(); i++) {

        if (allVerses.get(i).getId().equals(verseId)) {

            currentIndex = i;
            break;

        }

    }

    if (currentIndex == -1) {

        throw new RuntimeException("Verse not found");

    }

    int startIndex = currentIndex;

    int endIndex = Math.min(
            startIndex + PAGE_SIZE,
            allVerses.size()
    );

    List<Verse> verses =
            allVerses.subList(
                    startIndex,
                    endIndex
            );

    ReadingPageResponse response =
            new ReadingPageResponse();

    response.setVerses(verses);

    // Previous

// Previous Page

if (startIndex - PAGE_SIZE >= 0) {

    response.setHasPrevious(true);

    response.setPreviousStartVerseId(

            allVerses
                    .get(startIndex - PAGE_SIZE)
                    .getId()

    );

} else {

    response.setHasPrevious(false);

}

// Next Page

if (endIndex < allVerses.size()) {

    response.setHasNext(true);

    response.setNextStartVerseId(

            allVerses
                    .get(endIndex)
                    .getId()

    );

} else {

    response.setHasNext(false);

}


System.out.println("Total Verses : " + allVerses.size());

System.out.println("Start Index : " + startIndex);

System.out.println("End Index : " + endIndex);

System.out.println(
        allVerses.stream()
                .map(Verse::getId)
                .toList()
);

    return response;
}
        

}