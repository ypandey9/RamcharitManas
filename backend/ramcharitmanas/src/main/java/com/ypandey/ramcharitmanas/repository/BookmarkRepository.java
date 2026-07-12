package com.ypandey.ramcharitmanas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ypandey.ramcharitmanas.model.Bookmark;
import com.ypandey.ramcharitmanas.model.User;
import org.springframework.data.jpa.repository.Modifying;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    // Additional query methods can be defined here if needed
    
    List<Bookmark> findByUser(User user);

    Optional<Bookmark> findByUserAndVerseId(User user, Long verseId);

    @Modifying
    void deleteByUserAndVerseId(User user , Long verseId);

    long countByUser(User user);
    

}
