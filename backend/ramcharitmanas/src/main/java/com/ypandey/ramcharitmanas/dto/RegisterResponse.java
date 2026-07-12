package com.ypandey.ramcharitmanas.dto;

import lombok.Data;

@Data
public class RegisterResponse {
    
    private String message;
    private Boolean success;
    private UserProfile profile;
}


