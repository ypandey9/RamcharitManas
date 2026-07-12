
package com.ypandey.ramcharitmanas.service;

import org.springframework.stereotype.Service;

import com.ypandey.ramcharitmanas.dto.UserDashboardStats;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.model.Verse;
import com.ypandey.ramcharitmanas.repository.BookmarkRepository;
import com.ypandey.ramcharitmanas.repository.ReadingProgressRepository;
import com.ypandey.ramcharitmanas.repository.UserRepository;
import com.ypandey.ramcharitmanas.repository.VerseRepository;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ReadingProgressRepository readingProgressRepository;
    private final VerseRepository verseRepository;

    public DashboardService(
            UserRepository userRepository,
            BookmarkRepository bookmarkRepository,
            ReadingProgressRepository readingProgressRepository,
            VerseRepository verseRepository) {

        this.userRepository = userRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.readingProgressRepository = readingProgressRepository;
        this.verseRepository = verseRepository;
    }

    public UserDashboardStats getDashboardStats(String username) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow();

        UserDashboardStats stats = new UserDashboardStats();

        stats.setBookmarkCount(
                bookmarkRepository.countByUser(user));

        readingProgressRepository
                .findByUser(user)
                .ifPresent(progress -> {

                    stats.setCurrentKand(progress.getKand());

                    stats.setCurrentVerseId(progress.getVerseId());

                    stats.setLastRead(progress.getLastReadAt());

                    Verse verse = verseRepository
                            .findById(progress.getVerseId())
                            .orElse(null);

                    if (verse != null) {

                        stats.setCurrentVerseType(
                                verse.getType());

                        stats.setCurrentVerseText(
                                verse.getText());
                    }

                });

        long totalVerses = verseRepository.count();

        stats.setTotalVerses(totalVerses);

        if (stats.getCurrentVerseId() != null) {

            Long totalRead =
                    verseRepository.countByIdLessThanEqual(
                            stats.getCurrentVerseId());

            stats.setTotalReadVerses(totalRead);

            if (totalVerses > 0) {

                stats.setProgressPercentage(

                        (int) ((double) totalRead
                                / totalVerses * 100)

                );
            }
        }

        return stats;
    }

}