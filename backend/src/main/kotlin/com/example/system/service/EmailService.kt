package com.example.system.service

import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class EmailService(private val mailSender: JavaMailSender) {

    fun sendPasswordResetEmail(toEmail: String, token: String) {
        val subject = "Recuperação de Senha"
        val link = "http://localhost:8081/reset-password?token=$token"
        val text = """
            Olá,

            Você solicitou a redefinição de sua senha. Clique no link abaixo ou copie e cole no seu navegador para continuar:
            $link

            Se você não solicitou isso, por favor ignore este email.

            Atenciosamente,
            Equipe do App
        """.trimIndent()

        val message = SimpleMailMessage().apply {
            setTo(toEmail)
            setSubject(subject)
            setText(text)
            setFrom("no-reply@seusistema.com")
        }

        try {
            mailSender.send(message)
            println("Email de recuperação enviado para $toEmail")
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}