package com.example.system.domain.dto.order

data class OrderItemRequestDTO(
    val productId: Long,
    val quantity: Int,
    val unitPrice: Double
)
