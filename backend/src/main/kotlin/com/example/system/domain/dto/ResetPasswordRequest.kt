package com.example.system.domain.dto

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size

data class ResetPasswordRequest(
    @field:NotEmpty
    val token: String,

    @field:NotEmpty @field:Size(min = 8, message = "A nova senha deve ter no mínimo 8 caracteres.")
    val newPassword: String,
)