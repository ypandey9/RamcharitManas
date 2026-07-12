package com.ypandey.ramcharitmanas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ypandey.ramcharitmanas.model.ReadingProgress;
import com.ypandey.ramcharitmanas.model.User;

public interface ReadingProgressRepository
        extends JpaRepository<
                ReadingProgress,
                Long> {

    Optional<ReadingProgress>
            findByUser(User user);

}