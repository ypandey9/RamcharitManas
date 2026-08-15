package com.ypandey.ramcharitmanas.config;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {

//     private final SecretKey key =
//         Keys.secretKeyFor(SignatureAlgorithm.HS256);
//     private final long EXPIRATION =
//             1000 * 60 * 60 * 24;

@Value("${jwt.secret}")
private String secret;

@Value("${jwt.expiration}")
private long expiration;

private SecretKey key;

@PostConstruct
public void init() {

        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
}

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
                                    + expiration))

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