package com.ypandey.ramcharitmanas.repository;

import com.ypandey.ramcharitmanas.model.Verse;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VerseRepository
        extends JpaRepository<Verse, Long> {

    // ==========================================
    // Search by Arth
    // ==========================================

    List<Verse> findByArthContainingIgnoreCase(
            String query
    );


    // ==========================================
    // Search
    // ==========================================

    @Query("""
        SELECT DISTINCT v
        FROM Verse v
        LEFT JOIN v.text t
        LEFT JOIN v.transliteration tr
        WHERE
            LOWER(t) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(tr) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(v.arth) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(v.english) LIKE LOWER(CONCAT('%', :query, '%'))
        """)
    Page<Verse> searchVerses(
            @Param("query") String query,
            Pageable pageable
    );


    // ==========================================
    // Dashboard statistics
    // ==========================================

    long countByType(String type);


    // ==========================================
    // Verse navigation
    // ==========================================

    Optional<Verse>
    findFirstByIdLessThanOrderByIdDesc(
            Long id
    );

    Optional<Verse>
    findFirstByIdGreaterThanOrderByIdAsc(
            Long id
    );

    Long countByIdLessThanEqual(
            Long currentVerseId
    );


    // ==========================================
    // Kand pagination
    // ==========================================

    Page<Verse> findByKand(
            String kand,
            Pageable pageable
    );


    // ==========================================
    // Reading Page
    // ==========================================

    List<Verse>
    findTop6ByIdGreaterThanEqualOrderByIdAsc(
            Long id
    );

    List<Verse>
    findTop5ByIdLessThanOrderByIdDesc(
            Long id
    );
}