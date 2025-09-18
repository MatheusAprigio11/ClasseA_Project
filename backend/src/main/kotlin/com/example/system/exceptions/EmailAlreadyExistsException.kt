package com.example.system.exceptions

class EmailAlreadyExistsException(message: String = "Um usuário com este email já existe.") : RuntimeException(message)
