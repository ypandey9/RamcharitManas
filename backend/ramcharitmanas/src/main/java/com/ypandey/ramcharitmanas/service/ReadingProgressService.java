package com.ypandey.ramcharitmanas.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ypandey.ramcharitmanas.model.ReadingProgress;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.repository.ReadingProgressRepository;

@Service
public class ReadingProgressService {

    private final ReadingProgressRepository readingProgressRepository;

    public ReadingProgressService(
            ReadingProgressRepository readingProgressRepository) {

        this.readingProgressRepository = readingProgressRepository;
    }

    @Transactional
    public ReadingProgress saveProgress(
            User user,
            String kand,
            Long verseId) {

        ReadingProgress progress =
                readingProgressRepository
                        .findByUser(user)
                        .orElse(new ReadingProgress());

        progress.setUser(user);
        progress.setKand(kand);
        progress.setVerseId(verseId);
        progress.setLastReadAt(LocalDateTime.now());

        return readingProgressRepository.save(progress);
    }

    public ReadingProgress getProgress(User user) {

        return readingProgressRepository
                .findByUser(user)
                .orElse(null);
    }
}