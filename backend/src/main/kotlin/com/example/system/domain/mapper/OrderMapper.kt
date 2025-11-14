package com.example.system.domain.mapper


import com.example.system.domain.dto.order.OrderItemResponseDTO
import com.example.system.domain.dto.order.OrderResponseDTO
import com.example.system.domain.model.Order
import com.example.system.domain.model.OrderItem
import org.springframework.stereotype.Component

@Component
class OrderMapper(
    private val productMapper: ProductMapper
) {

    fun toResponseDTO(order: Order): OrderResponseDTO {
        return OrderResponseDTO(
            id = order.id!!,
            orderRequestedBy = order.user.name,
            createdAt = order.createdAt,
            totalValue = order.totalValue,
            items = order.items.map { toOrderItemResponseDTO(it) }
        )
    }

    fun toOrderItemResponseDTO(orderItem: OrderItem): OrderItemResponseDTO {
        return OrderItemResponseDTO(
            id = orderItem.id!!,
            product = productMapper.toProductResponseDTO(orderItem.product),
            quantity = orderItem.quantity,
            unitPrice = orderItem.unitPrice
        )
    }

}