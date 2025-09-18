package com.example.system.exceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(ex: MethodArgumentNotValidException): ResponseEntity<String> {
        val errorMessage = ex.bindingResult.allErrors.firstOrNull()?.defaultMessage ?: "Erro de validação"
        return ResponseEntity.badRequest().body(errorMessage)
    }

    @ExceptionHandler(value = [EmailAlreadyExistsException::class, PasswordsDoNotMatchException::class, HttpRequestMethodNotSupportedException::class])
    fun handleBadRequest(ex: RuntimeException): ResponseEntity<String> {
        return ResponseEntity.badRequest().body(ex.message ?: "Erro na requisição")
    }

    @ExceptionHandler(value = [InvalidCredentialsException::class, InvalidTokenException::class])
    fun handleUnauthorized(ex: RuntimeException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.message ?: "Não autorizado")
    }
}