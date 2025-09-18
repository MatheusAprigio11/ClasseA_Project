package com.example.system.controller

import com.example.system.domain.dto.*
import com.example.system.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth" )
class AuthController(private val authService: AuthService) {

    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<String> {
        authService.register(request)
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Usuário registrado com sucesso.")
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        val token = authService.login(request)
        return ResponseEntity.ok(AuthResponse(token))
    }

    @PostMapping("/forgot-password")
    fun forgotPassword(@Valid @RequestBody request: ForgotPasswordRequest): ResponseEntity<String> {
        authService.forgotPassword(request.email)
        return ResponseEntity.ok("Se um usuário com este email existir, um link de recuperação foi enviado.")
    }

    @PostMapping("/reset-password")
    fun resetPassword(@Valid @RequestBody request: ResetPasswordRequest): ResponseEntity<String> {
        authService.resetPassword(request)
        return ResponseEntity.ok("Senha alterada com sucesso.")
    }
}