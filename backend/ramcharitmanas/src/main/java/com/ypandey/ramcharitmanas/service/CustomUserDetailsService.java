package com.ypandey.ramcharitmanas.service;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.ypandey.ramcharitmanas.model.User;
import com.ypandey.ramcharitmanas.repository.UserRepository;


@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
public UserDetails loadUserByUsername(String username)
        throws UsernameNotFoundException {

    System.out.println("Looking for user: " + username);

    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    System.out.println("User found: " + user.getUsername());

    return org.springframework.security.core.userdetails.User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .roles(user.getRole().replace("ROLE_", ""))
            .disabled(!user.getEnabled())
            .build();
}
}