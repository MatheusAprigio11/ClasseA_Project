package com.example.system.exceptions

class InvalidTokenException(message: String = "Token inválido ou expirado.") : RuntimeException(message)