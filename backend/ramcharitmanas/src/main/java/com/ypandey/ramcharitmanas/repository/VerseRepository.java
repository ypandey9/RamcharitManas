package com.ypandey.ramcharitmanas.repository;

import com.ypandey.ramcharitmanas.model.Verse;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VerseRepository
        extends JpaRepository<Verse, Long> {

                List<Verse> findByArthContainingIgnoreCase(String query);
                long countByType(String type);
                Optional<Verse> findFirstByIdLessThanOrderByIdDesc(Long id);
                Optional<Verse> findFirstByIdGreaterThanOrderByIdAsc(Long id);
                Long countByIdLessThanEqual(Long currentVerseId);
}