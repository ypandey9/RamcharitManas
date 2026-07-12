package com.ypandey.ramcharitmanas.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ypandey.ramcharitmanas.model.Bookmark;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.repository.BookmarkRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookmarkService {
    
    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    //save bookmark

    public Bookmark saveBookmark(User user,Long verseId) {
       if(bookmarkRepository.findByUserAndVerseId(user, verseId)
    .isPresent()){
            throw new RuntimeException("Bookmark already exists for this verse.");
        }

        Bookmark bookmark=new Bookmark();
        bookmark.setUser(user);
        bookmark.setVerseId(verseId);
        bookmark.setCreatedAt(LocalDateTime.now());
        return bookmarkRepository.save(bookmark);
    }
    
    // Get user bookmarks

    public List<Bookmark> getBookmarks(User user) {

        return bookmarkRepository.findByUser(user);
    }

    // Delete bookmark

    @Transactional
    public void removeBookmark(User user,Long verseId) {
        bookmarkRepository.deleteByUserAndVerseId(user, verseId);
    }
}
