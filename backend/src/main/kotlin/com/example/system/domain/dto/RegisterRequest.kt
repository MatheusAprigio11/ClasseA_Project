package com.example.system.domain.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size

data class RegisterRequest(
    @field:NotEmpty(message = "O nome não pode ser vazio.")
    val name: String,

    @field:Email(message = "O email deve ser válido.")
    @field:NotEmpty(message = "O email não pode ser vazio.")
    val email: String,

    @field:NotEmpty(message = "A senha não pode ser vazia.")
    @field:Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres.")
    val password: String,

)