package com.example.system.domain.dto

import jakarta.validation.constraints.Email

data class ForgotPasswordRequest(
    @field:Email(message = "O email deve ser válido.")
    val email: String
)
