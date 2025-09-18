package com.example.system.domain.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

data class LoginRequest(
    @field:Email(message = "O email deve ser válido.")
    val email: String,

    @field:NotEmpty(message = "A senha não pode ser vazia.")
    val password: String
)