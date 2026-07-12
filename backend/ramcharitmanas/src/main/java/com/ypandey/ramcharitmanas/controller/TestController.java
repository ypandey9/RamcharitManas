package com.ypandey.ramcharitmanas.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String testApi() {

        return "Ramcharitmanas Backend Running Successfully";
    }
}