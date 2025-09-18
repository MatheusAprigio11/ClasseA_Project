package com.example.system.exceptions

class InvalidCredentialsException(message: String = "Email ou senha inválidos.") : RuntimeException(message)
