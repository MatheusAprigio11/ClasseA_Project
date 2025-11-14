package com.example.system.controller

import com.example.system.domain.dto.product.ProductInputDTO
import com.example.system.domain.dto.product.ProductResponseDTO
import com.example.system.domain.mapper.ProductMapper
import com.example.system.domain.model.Product
import com.example.system.service.ProductService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/products")
@SecurityRequirement(name = "Bearer Authentication")
class ProductController(
    private val productService: ProductService,
    private val productMapper: ProductMapper
) {

    @PostMapping
    fun createProduct(@RequestBody productInputDTO: ProductInputDTO): ResponseEntity<ProductResponseDTO> {
        val createdProduct = productService.createProduct(productMapper.toEntity(productInputDTO))
        return ResponseEntity.status(HttpStatus.CREATED).body(productMapper.toProductResponseDTO(createdProduct))
    }

    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: Long): ResponseEntity<ProductResponseDTO> {
        val product = productService.getProductById(id)
        return ResponseEntity.ok(productMapper.toProductResponseDTO(product))
    }

    @GetMapping
    fun getAllProducts(): ResponseEntity<List<ProductResponseDTO>> {
        val products = productService.getAllProducts();
        val productsResponseDTOs = products.stream().map { product -> productMapper.toProductResponseDTO(product) }.toList();
        return ResponseEntity.ok(productsResponseDTOs)
    }

    @PutMapping("/{id}")
    fun updateProduct(@PathVariable id: Long, @RequestBody productInputDTO: ProductInputDTO): ResponseEntity<ProductResponseDTO> {
        val updatedProduct = productService.updateProduct(id, productMapper.toEntity(productInputDTO))
        return ResponseEntity.ok(productMapper.toProductResponseDTO(updatedProduct))
    }

    @DeleteMapping("/{id}")
    fun deleteProduct(@PathVariable id: Long): ResponseEntity<Void> {
        productService.deleteProduct(id)
        return ResponseEntity.noContent().build()
    }
}