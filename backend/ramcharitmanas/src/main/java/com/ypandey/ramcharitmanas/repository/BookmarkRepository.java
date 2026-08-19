package com.ypandey.ramcharitmanas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ypandey.ramcharitmanas.model.Bookmark;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.model.Verse;

public interface BookmarkRepository
        extends JpaRepository<Bookmark, Long> {

    // ==========================================
    // Existing Bookmark Queries
    // ==========================================

    List<Bookmark> findByUser(User user);

    Optional<Bookmark> findByUserAndVerseId(
            User user,
            Long verseId
    );

    @Modifying
    void deleteByUserAndVerseId(
            User user,
            Long verseId
    );

    long countByUser(User user);


    // ==========================================
    // Get Bookmarked Verses
    // ==========================================

    @Query("""
        SELECT v
        FROM Verse v
        WHERE v.id IN (
            SELECT b.verseId
            FROM Bookmark b
            WHERE b.user = :user
        )
        ORDER BY v.id
        """)
    List<Verse> findBookmarkedVersesByUser(
            @Param("user") User user
    );

}