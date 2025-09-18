package com.example.system.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "jwt")
class JwtProperties {
    lateinit var secret: String
    var expiration: Expiration = Expiration()

    class Expiration {
        lateinit var login: String
        lateinit var reset: String
    }
}

