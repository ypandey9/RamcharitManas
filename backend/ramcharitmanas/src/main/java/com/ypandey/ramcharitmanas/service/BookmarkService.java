package com.ypandey.ramcharitmanas.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ypandey.ramcharitmanas.model.Bookmark;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.model.Verse;
import com.ypandey.ramcharitmanas.repository.BookmarkRepository;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(
            BookmarkRepository bookmarkRepository) {

        this.bookmarkRepository =
                bookmarkRepository;
    }


    // ==========================================
    // Save Bookmark
    // ==========================================

    public Bookmark saveBookmark(
            User user,
            Long verseId) {

        if (bookmarkRepository
                .findByUserAndVerseId(user, verseId)
                .isPresent()) {

            throw new RuntimeException(
                    "Bookmark already exists for this verse."
            );
        }

        Bookmark bookmark =
                new Bookmark();

        bookmark.setUser(user);
        bookmark.setVerseId(verseId);
        bookmark.setCreatedAt(
                LocalDateTime.now()
        );

        return bookmarkRepository.save(
                bookmark
        );
    }


    // ==========================================
    // Get User Bookmarks
    // ==========================================

    public List<Bookmark> getBookmarks(
            User user) {

        return bookmarkRepository
                .findByUser(user);
    }


    // ==========================================
    // Get Bookmarked Verses
    // ==========================================

    public List<Verse> getBookmarkedVerses(
            User user) {

        return bookmarkRepository
                .findBookmarkedVersesByUser(user);
    }


    // ==========================================
    // Delete Bookmark
    // ==========================================

    @Transactional
    public void removeBookmark(
            User user,
            Long verseId) {

        bookmarkRepository
                .deleteByUserAndVerseId(
                        user,
                        verseId
                );
    }
}