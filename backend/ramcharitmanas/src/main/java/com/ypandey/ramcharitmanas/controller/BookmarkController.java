package com.ypandey.ramcharitmanas.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ypandey.ramcharitmanas.dto.BookmarkResponse;
import com.ypandey.ramcharitmanas.model.Bookmark;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.model.Verse;
import com.ypandey.ramcharitmanas.repository.UserRepository;
import com.ypandey.ramcharitmanas.service.BookmarkService;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final UserRepository userRepository;

    public BookmarkController(
            BookmarkService bookmarkService,
            UserRepository userRepository) {

        this.bookmarkService =
                bookmarkService;

        this.userRepository =
                userRepository;
    }


    // ==========================================
    // Save Bookmark
    // ==========================================

    @PostMapping("/{verseId}")
    public BookmarkResponse saveBookmark(

            @PathVariable Long verseId,
            Authentication authentication) {

        String username =
                authentication.getName();

        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow();

        Bookmark bookmark =
                bookmarkService.saveBookmark(
                        user,
                        verseId
                );

        BookmarkResponse response =
                new BookmarkResponse();

        response.setId(
                bookmark.getId()
        );

        response.setVerseId(
                bookmark.getVerseId()
        );

        response.setCreatedAt(
                bookmark.getCreatedAt()
        );

        return response;
    }


    // ==========================================
    // Get User Bookmarks
    // ==========================================

    @GetMapping
    public List<BookmarkResponse> getBookmarks(
            Authentication authentication) {

        String username =
                authentication.getName();

        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow();

        List<Bookmark> bookmarks =
                bookmarkService
                        .getBookmarks(user);

        return bookmarks.stream()
                .map(bookmark -> {

                    BookmarkResponse response =
                            new BookmarkResponse();

                    response.setId(
                            bookmark.getId()
                    );

                    response.setVerseId(
                            bookmark.getVerseId()
                    );

                    response.setCreatedAt(
                            bookmark.getCreatedAt()
                    );

                    return response;

                })
                .collect(Collectors.toList());
    }


    // ==========================================
    // Get Bookmarked Verses
    // ==========================================

    @GetMapping("/verses")
    public List<Verse> getBookmarkedVerses(
            Authentication authentication) {

        String username =
                authentication.getName();

        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow();

        return bookmarkService
                .getBookmarkedVerses(user);
    }


    // ==========================================
    // Remove Bookmark
    // ==========================================

    @DeleteMapping("/{verseId}")
    public void removeBookmark(
            @PathVariable Long verseId,
            Authentication authentication) {

        System.out.println(
                "DELETE bookmark endpoint called"
        );

        String username =
                authentication.getName();

        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow();

        bookmarkService.removeBookmark(
                user,
                verseId
        );
    }

}