package com.example.system.domain.dto.order

import java.time.LocalDateTime

data class OrderResponseDTO(
    val id: Long,
    val createdAt: LocalDateTime,
    val totalValue: Double,
    val items: List<OrderItemResponseDTO>
)
