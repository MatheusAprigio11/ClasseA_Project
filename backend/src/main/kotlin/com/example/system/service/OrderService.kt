package com.example.system.service

import com.example.system.domain.dto.order.OrderRequestDTO
import com.example.system.domain.dto.order.OrderResponseDTO
import com.example.system.domain.mapper.OrderMapper
import com.example.system.domain.model.Order
import com.example.system.domain.model.OrderItem
import com.example.system.domain.repository.OrderRepository
import com.example.system.domain.repository.ProductRepository
import com.example.system.domain.repository.UserRepository
import com.example.system.utils.CurrentUserUtil
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class OrderService(
    private val orderRepository: OrderRepository,
    private val productRepository: ProductRepository,
    private val orderMapper: OrderMapper
) {

    @Transactional
    fun createOrder(orderRequestDTO: OrderRequestDTO): OrderResponseDTO {
        val user = CurrentUserUtil.getCurrentUser();

        val order = Order(
            user = user,
            totalValue = orderRequestDTO.totalValue
        )

        orderRequestDTO.items.forEach { itemRequest ->
            val product = productRepository.findById(itemRequest.productId)
                .orElseThrow { IllegalArgumentException("Product not found with id: ${itemRequest.productId}") }

            val orderItem = OrderItem(
                order = order,
                product = product,
                quantity = itemRequest.quantity,
                unitPrice = itemRequest.unitPrice
            )
            order.items.add(orderItem)
        }

        val savedOrder = orderRepository.save(order)
        return orderMapper.toResponseDTO(savedOrder)
    }

    fun getOrderById(id: Long): OrderResponseDTO {
        val order = orderRepository.findByIdWithItems(id)
            ?: throw IllegalArgumentException("Order not found with id: $id")

        val userId = CurrentUserUtil.getCurrentUserId();
        order.user.id?.let {
            if (it != userId) {
                throw IllegalAccessException("You do not have permission to access this order.")
            }
        }

        return orderMapper.toResponseDTO(order)
    }

    fun getAllOrders(): List<OrderResponseDTO> {
        return orderRepository.findAllWithItems()
            .map { orderMapper.toResponseDTO(it) }
    }

    fun getOrdersByUserId(): List<OrderResponseDTO> {
        val userId = CurrentUserUtil.getCurrentUserId();

        return orderRepository.findByUserId(userId)
            .map { orderMapper.toResponseDTO(it) }
    }

    @Transactional
    fun updateOrder(id: Long, orderRequestDTO: OrderRequestDTO): OrderResponseDTO {
        val existingOrder = orderRepository.findByIdWithItems(id)
            ?: throw IllegalArgumentException("Order not found with id: $id")

        // Clear existing items
        existingOrder.items.clear()

        // Add new items
        orderRequestDTO.items.forEach { itemRequest ->
            val product = productRepository.findById(itemRequest.productId)
                .orElseThrow { IllegalArgumentException("Product not found with id: ${itemRequest.productId}") }

            val orderItem = OrderItem(
                order = existingOrder,
                product = product,
                quantity = itemRequest.quantity,
                unitPrice = itemRequest.unitPrice
            )
            existingOrder.items.add(orderItem)
        }

        val updatedOrder = existingOrder.copy(totalValue = orderRequestDTO.totalValue)
        val savedOrder = orderRepository.save(updatedOrder)
        return orderMapper.toResponseDTO(savedOrder)
    }

    @Transactional
    fun deleteOrder(id: Long) {
        if (!orderRepository.existsById(id)) {
            throw IllegalArgumentException("Order not found with id: $id")
        }
        orderRepository.deleteById(id)
    }
}