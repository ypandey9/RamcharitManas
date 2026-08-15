package com.ypandey.ramcharitmanas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ypandey.ramcharitmanas.config.JwtUtil;
import com.ypandey.ramcharitmanas.dto.LoginRequest;
import com.ypandey.ramcharitmanas.dto.LoginResponse;
import com.ypandey.ramcharitmanas.dto.RegisterRequest;
import com.ypandey.ramcharitmanas.dto.RegisterResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ypandey.ramcharitmanas.repository.UserRepository;
import com.ypandey.ramcharitmanas.service.AuthService;

import jakarta.validation.Valid;

import com.ypandey.ramcharitmanas.model.User;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
public ResponseEntity<?> login(
        @RequestBody LoginRequest request) {

    try {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

System.out.println(
    encoder.matches(
        request.getPassword(),
        userRepository.findByUsername(request.getUsername()).get().getPassword()
    )
);

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getUsername(),
                    
                        request.getPassword()

                )

        );

        User user =
        userRepository
                .findByUsername(
                        request.getUsername())
                .orElseThrow();

String token =
        jwtUtil.generateToken(

                user.getUsername(),

                user.getRole()

        );

        return ResponseEntity.ok(

                new LoginResponse(token,user.getUsername(),user.getRole())

        );

    }

    catch (AuthenticationException e) {

        return ResponseEntity

                .status(HttpStatus.UNAUTHORIZED)

                .body("Invalid username or password");

    }

}

@PostMapping("/register")
public RegisterResponse register(
       @Valid @RequestBody RegisterRequest request
){

        System.out.println("REGISTER CONTROLLER CALLED");
        return authService.register(request);
}
    
}
