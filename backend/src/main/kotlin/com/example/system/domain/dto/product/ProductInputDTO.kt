package com.example.system.domain.dto.product

data class ProductInputDTO (
    val name: String,
    val description: String,
    val price: Double,
    val image: ByteArray? = null
)