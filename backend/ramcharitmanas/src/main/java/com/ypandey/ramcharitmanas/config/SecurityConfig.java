package com.ypandey.ramcharitmanas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.AuthenticationProvider;
import com.ypandey.ramcharitmanas.service.CustomUserDetailsService;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final CustomUserDetailsService customUserDetailsService;

public SecurityConfig(
        JwtAuthenticationFilter jwtAuthenticationFilter,
        CustomUserDetailsService customUserDetailsService) {

    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    this.customUserDetailsService = customUserDetailsService;
}

   @Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http
) throws Exception {

    http

        .cors(Customizer.withDefaults())

        .csrf(csrf -> csrf.disable())

        .sessionManagement(session ->
                session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

        .authorizeHttpRequests(auth -> auth

    // Public Login
    .requestMatchers(
            "/api/auth/login",
            "/api/auth/register"
    )
    .permitAll()

    // Admin Statistics
    .requestMatchers(
            "/api/verses/stats"
    )
    .hasRole("ADMIN")

    // Public Read APIs
    .requestMatchers(
            HttpMethod.GET,
            "/api/verses/**"
    )
    .permitAll()

    // Add Verse
    .requestMatchers(
            HttpMethod.POST,
            "/api/verses"
    )
    .hasAnyRole(
            "ADMIN",
            "EDITOR"
    )

    // Update Verse
    .requestMatchers(
            HttpMethod.PUT,
            "/api/verses/**"
    )
    .hasAnyRole(
            "ADMIN",
            "EDITOR"
    )

    .requestMatchers(
        "/api/bookmarks/**"
)
    .authenticated()

    .requestMatchers(
        "/api/reading-progress/**"
)
.authenticated()

.requestMatchers("/api/dashboard/**")
.authenticated()

.requestMatchers("/api/users/me")
.authenticated()


    // Delete Verse
    .requestMatchers(
            HttpMethod.DELETE,
            "/api/verses/**"
    )
    .hasRole("ADMIN")

    .anyRequest()
    .authenticated()
)

        .addFilterBefore(

                jwtAuthenticationFilter,

                UsernamePasswordAuthenticationFilter.class

        );

    return http.build();
}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
public AuthenticationManager authenticationManager(
        AuthenticationConfiguration configuration)
        throws Exception {

    return configuration.getAuthenticationManager();
}

@Bean
public AuthenticationProvider authenticationProvider() {

    DaoAuthenticationProvider provider =
            new DaoAuthenticationProvider();

    provider.setUserDetailsService(
            customUserDetailsService);

    provider.setPasswordEncoder(
            passwordEncoder());

    return provider;
}
    
}
