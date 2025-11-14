package com.example.system.domain.dto.order

import java.time.LocalDateTime

data class OrderResponseDTO(
    val id: Long,
    val orderRequestedBy: String,
    val createdAt: LocalDateTime,
    val totalValue: Double,
    val items: List<OrderItemResponseDTO>
)
