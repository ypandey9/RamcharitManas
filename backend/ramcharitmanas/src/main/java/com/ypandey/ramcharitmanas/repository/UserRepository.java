package com.ypandey.ramcharitmanas.repository;

import com.ypandey.ramcharitmanas.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
   Optional<User> findByUsername(String username);
   boolean existsByUsername(String username);
   boolean existsByEmail(String email);

} 