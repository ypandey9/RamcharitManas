package com.ypandey.ramcharitmanas.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ypandey.ramcharitmanas.dto.UserDashboardStats;

import com.ypandey.ramcharitmanas.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class UserDashboardController {


    private final DashboardService dashboardService;

  public UserDashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public UserDashboardStats getStats(
            Authentication authentication) {

        return dashboardService.getDashboardStats(

                authentication.getName()

        );

    }

    
}
