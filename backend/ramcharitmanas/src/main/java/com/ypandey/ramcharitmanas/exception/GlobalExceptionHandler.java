package com.ypandey.ramcharitmanas.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
        UsernameAlreadyExistsException.class)

public ResponseEntity<?> usernameExists(
        UsernameAlreadyExistsException ex){

    Map<String,Object> response=new HashMap<>();

    response.put("success",false);

    response.put("message",ex.getMessage());

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);

}

@ExceptionHandler(
        EmailAlreadyExistsException.class)

public ResponseEntity<?> emailExists(
        EmailAlreadyExistsException ex){

    Map<String,Object> response=new HashMap<>();

    response.put("success",false);

    response.put("message",ex.getMessage());

    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(response);

}

}