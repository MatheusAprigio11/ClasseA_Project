package com.example.system.service

import com.example.system.config.JwtProperties
import com.example.system.domain.model.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.util.Date
import javax.crypto.SecretKey

@Service
class TokenService(
    private val jwtProperties: JwtProperties
) {
    private val secretKey: SecretKey by lazy {
        Keys.hmacShaKeyFor(jwtProperties.secret.toByteArray())
    }

    fun generateToken(user: User, expirationMillis: Long): String {
        return Jwts.builder()
                .setSubject(user.id.toString())
                .claim("name", user.name)
                .claim("email", user.email)
                .claim("userRole", user.role)
                .setIssuedAt(Date())
                .setExpiration(Date(System.currentTimeMillis() + expirationMillis))
                .signWith(secretKey)
                .compact()
    }

    fun getClaims(token: String): Claims {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .body
    }
}