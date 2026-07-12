package com.ypandey.ramcharitmanas.controller;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ypandey.ramcharitmanas.dto.UserProfile;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
public UserProfile currentUser(
        Authentication authentication) {

    String username =
            authentication.getName();

    User user =
            userRepository
                    .findByUsername(username)
                    .orElseThrow();

    UserProfile profile =
            new UserProfile();

    profile.setUsername(
            user.getUsername());

    profile.setFullName(
            user.getFullName());

    profile.setEmail(
            user.getEmail());

    profile.setRole(
            user.getRole());

    return profile;
}

}
