package com.example.system.service

import com.example.system.domain.model.Product
import com.example.system.domain.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository) {

    fun createProduct(product: Product): Product = productRepository.save(product)

    fun getProductById(id: Long): Product = productRepository.findById(id)
        .orElseThrow { IllegalArgumentException("Product not found with id: $id") }

    fun getAllProducts(): List<Product> = productRepository.findAll()

    fun updateProduct(id: Long, updatedProduct: Product): Product {
        val existingProduct = getProductById(id)
        existingProduct.apply {
            name = updatedProduct.name
            description = updatedProduct.description
            price = updatedProduct.price
            image = updatedProduct.image
        }
        return productRepository.save(existingProduct)
    }

    fun deleteProduct(id: Long) {
        if (!productRepository.existsById(id)) {
            throw IllegalArgumentException("Product not found with id: $id")
        }
        productRepository.deleteById(id)
    }
}