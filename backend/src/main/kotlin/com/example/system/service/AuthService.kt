package com.example.system.service

import com.example.system.config.JwtProperties
import com.example.system.domain.dto.auth.LoginRequest
import com.example.system.domain.dto.auth.RegisterRequest
import com.example.system.domain.dto.auth.ResetPasswordRequest
import com.example.system.domain.model.User
import com.example.system.domain.repository.UserRepository
import com.example.system.exceptions.EmailAlreadyExistsException
import com.example.system.exceptions.InvalidCredentialsException
import com.example.system.exceptions.InvalidTokenException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val tokenService: TokenService,
    private val emailService: EmailService,
    private val jwtProperties: JwtProperties
) {

    @Transactional
    fun register(request: RegisterRequest) {
        if (userRepository.findByEmail(request.email).isPresent) {
            throw EmailAlreadyExistsException()
        }

        val newUser = User(
            name = request.name,
            email = request.email,
            passwordHash = passwordEncoder.encode(request.password)
        )
        userRepository.save(newUser)
    }

    fun login(request: LoginRequest): String {
        val user = userRepository.findByEmail(request.email).orElseThrow { InvalidCredentialsException() }

        if (!passwordEncoder.matches(request.password, user.passwordHash)) {
            throw InvalidCredentialsException()
        }

        return tokenService.generateToken(user, jwtProperties.expiration.login.toLong())
    }

    fun forgotPassword(email: String) {
        userRepository.findByEmail(email).ifPresent { user ->
            val token = tokenService.generateToken(user, jwtProperties.expiration.reset.toLong())
            emailService.sendPasswordResetEmail(user.email, token)
        }
    }

    @Transactional
    fun resetPassword(request: ResetPasswordRequest) {
        val claims = try {
            tokenService.getClaims(request.token)
        } catch (e: Exception) {
            throw InvalidTokenException()
        }

        val userId = claims.subject.toLong()
        val user = userRepository.findById(userId).orElseThrow { InvalidTokenException() }

        user.passwordHash = passwordEncoder.encode(request.newPassword)
        userRepository.save(user)
    }
}