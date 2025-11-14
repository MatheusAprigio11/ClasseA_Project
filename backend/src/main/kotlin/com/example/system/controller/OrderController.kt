package com.example.system.controller

import com.example.system.domain.dto.order.OrderRequestDTO
import com.example.system.domain.dto.order.OrderResponseDTO
import com.example.system.domain.mapper.OrderMapper
import com.example.system.service.OrderService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/orders")
@SecurityRequirement(name = "Bearer Authentication")
class OrderController(
    private val orderService: OrderService,
    private val orderMapper: OrderMapper
) {

    @PostMapping
    fun createOrder(
        @RequestBody orderRequestDTO: OrderRequestDTO
    ): ResponseEntity<OrderResponseDTO> {
        val createdOrder = orderService.createOrder(orderRequestDTO)
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder)
    }

    @GetMapping("/{id}")
    fun getOrderById(@PathVariable id: Long): ResponseEntity<OrderResponseDTO> {
        val order = orderService.getOrderById(id)
        return ResponseEntity.ok(order)
    }

    @GetMapping
    fun getAllOrders(): ResponseEntity<List<OrderResponseDTO>> {
        val orders = orderService.getAllOrders()
        return ResponseEntity.ok(orders)
    }

    @GetMapping("/user")
    fun getOrdersByUserId(): ResponseEntity<List<OrderResponseDTO>> {
        val orders = orderService.getOrdersByUserId()
        return ResponseEntity.ok(orders)
    }

    @PutMapping("/{id}")
    fun updateOrder(
        @PathVariable id: Long,
        @RequestBody orderRequestDTO: OrderRequestDTO
    ): ResponseEntity<OrderResponseDTO> {
        val updatedOrder = orderService.updateOrder(id, orderRequestDTO)
        return ResponseEntity.ok(updatedOrder)
    }

    @DeleteMapping("/{id}")
    fun deleteOrder(@PathVariable id: Long): ResponseEntity<Void> {
        orderService.deleteOrder(id)
        return ResponseEntity.noContent().build()
    }
}