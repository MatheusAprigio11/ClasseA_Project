package com.example.system.domain.dto.order

import com.example.system.domain.dto.product.ProductResponseDTO

data class OrderItemResponseDTO(
    val id: Long,
    val product: ProductResponseDTO,
    val quantity: Int,
    val unitPrice: Double
)
