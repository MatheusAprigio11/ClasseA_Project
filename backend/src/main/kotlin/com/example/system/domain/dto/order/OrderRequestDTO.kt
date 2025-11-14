package com.example.system.domain.dto.order

data class OrderRequestDTO(
    val totalValue: Double,
    val items: List<OrderItemRequestDTO>
)