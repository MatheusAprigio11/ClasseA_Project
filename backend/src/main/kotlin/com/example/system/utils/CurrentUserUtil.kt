package com.example.system.utils


import com.example.system.domain.model.User
import org.springframework.security.core.context.SecurityContextHolder

object CurrentUserUtil {

    fun getCurrentUser(): User {
        val authentication = SecurityContextHolder.getContext().authentication
            ?: throw IllegalStateException("No authentication found in security context")

        return authentication.principal as? User
            ?: throw IllegalStateException("Authentication principal is not a User object")
    }


    fun getCurrentUserId(): Long {
        return getCurrentUser().id ?: throw IllegalStateException("User ID is null")
    }

}