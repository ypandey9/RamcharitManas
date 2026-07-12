package com.ypandey.ramcharitmanas.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ypandey.ramcharitmanas.dto.ReadingProgressResponse;
import com.ypandey.ramcharitmanas.model.ReadingProgress;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.repository.UserRepository;
import com.ypandey.ramcharitmanas.service.ReadingProgressService;

@RestController
@RequestMapping("/api/reading-progress")
public class ReadingProgressController {
    
    private final ReadingProgressService readingProgressService;
    private final UserRepository userRepository;

    public ReadingProgressController(ReadingProgressService readingProgressService, UserRepository userRepository) {
        this.readingProgressService = readingProgressService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ReadingProgressResponse saveReadingProgress(
        @RequestParam String kand,
        @RequestParam Long verseId,
        Authentication authentication
    ){
        
        String username=authentication.getName();
        User user=userRepository.findByUsername(username).orElseThrow();

        ReadingProgress progress=readingProgressService.saveProgress(user, kand, verseId);

        ReadingProgressResponse response= new ReadingProgressResponse();
        response.setKand(progress.getKand());
        response.setVerseId(progress.getVerseId());
        response.setLastReadAt(progress.getLastReadAt());

        return response;
        
    }


    @GetMapping
    public ReadingProgressResponse getProgress(Authentication authentication){
        String username=authentication.getName();
        User user=userRepository.findByUsername(username).orElseThrow();

        ReadingProgress progress=readingProgressService.getProgress(user);

        if(progress==null){
            return null;
        }

        ReadingProgressResponse response= new ReadingProgressResponse();
        response.setKand(progress.getKand());
        response.setVerseId(progress.getVerseId());
        response.setLastReadAt(progress.getLastReadAt());

        return response;

    } 
    

}
