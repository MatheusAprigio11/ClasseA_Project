package com.example.system

import com.example.system.config.JwtProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties::class)
class SystemApplication

fun main(args: Array<String>) {
	runApplication<SystemApplication>(*args)
}
