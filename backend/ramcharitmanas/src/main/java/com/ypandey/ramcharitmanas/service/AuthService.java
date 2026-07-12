package com.ypandey.ramcharitmanas.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ypandey.ramcharitmanas.dto.RegisterRequest;
import com.ypandey.ramcharitmanas.dto.RegisterResponse;
import com.ypandey.ramcharitmanas.dto.UserProfile;
import com.ypandey.ramcharitmanas.exception.EmailAlreadyExistsException;
import com.ypandey.ramcharitmanas.exception.UsernameAlreadyExistsException;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.repository.UserRepository;

@Service
public class AuthService {
    
    private final UserRepository userRepository;

    
    private BCryptPasswordEncoder passwordEncoder; 

    public AuthService(UserRepository userRepository,BCryptPasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    public RegisterResponse register(RegisterRequest request){

        if(userRepository.existsByUsername(request.getUsername())){
            throw new UsernameAlreadyExistsException("user already exists.");
        }

        if(userRepository.existsByEmail(request.getEmail())){
            throw new EmailAlreadyExistsException("email already registered.");
        }

        User user=new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        
        user.setPassword(
            passwordEncoder.encode(request.getPassword())
        );

        user.setCreatedAt(LocalDateTime.now());

        user.setRole("ROLE_USER");
        user.setEnabled(true);
        userRepository.save(user);
        RegisterResponse response=new RegisterResponse();
        response.setMessage("Registration successfull!");
        response.setSuccess(true);
        UserProfile userProfile=new UserProfile();
        userProfile.setFullName(request.getFullName());
        userProfile.setUsername(request.getUsername());
        userProfile.setEmail(request.getEmail());
        userProfile.setRole("USER");
        response.setProfile(userProfile);
        return response;
    }
}
