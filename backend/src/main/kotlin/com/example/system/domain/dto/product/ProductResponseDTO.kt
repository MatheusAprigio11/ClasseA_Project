package com.example.system.domain.dto.product

import java.math.BigDecimal

data class ProductResponseDTO(
    val id: Long,
    val name: String,
    val description: String?,
    val price: Double,
    val image: ByteArray?
)
