package com.ypandey.ramcharitmanas.config;

import javax.crypto.SecretKey;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final SecretKey key =
        Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long EXPIRATION =
            1000 * 60 * 60 * 24;

    // Generate Token
    public String generateToken(
        String username,
        String role) {

    Map<String, Object> claims =
            new HashMap<>();

    claims.put("role", role);

    return Jwts.builder()

            .claims(claims)

            .subject(username)

            .issuedAt(new Date())

            .expiration(
                    new Date(
                            System.currentTimeMillis()
                                    + EXPIRATION))

            .signWith(key)

            .compact();
}

    // Extract all claims
    public Claims extractClaims(
            String token) {

        return Jwts.parser()

                .verifyWith(
                        key)

                .build()

                .parseSignedClaims(token)

                .getPayload();
    }

    // Extract username
    public String extractUsername(
            String token) {

        return extractClaims(token)
                .getSubject();
    }

    // Extract expiration
    public Date extractExpiration(
            String token) {

        return extractClaims(token)
                .getExpiration();
    }

    // Check expiry
    public boolean isTokenExpired(
            String token) {

        return extractExpiration(token)
                .before(new Date());
    }

    // Validate token
    public boolean validateToken(

            String token,

            String username) {

        return extractUsername(token)
                .equals(username)

                &&

                !isTokenExpired(token);
    }

    public String extractRole(String token) {

    return extractClaims(token)
            .get("role", String.class);
}

}