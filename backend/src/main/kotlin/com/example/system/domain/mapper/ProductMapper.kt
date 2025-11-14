package com.example.system.domain.mapper

import com.example.system.domain.dto.product.ProductInputDTO
import com.example.system.domain.dto.product.ProductResponseDTO
import com.example.system.domain.model.Product
import org.springframework.stereotype.Component

@Component
class ProductMapper {

    fun toProductResponseDTO(product: Product): ProductResponseDTO {
        return ProductResponseDTO(
            id = product.id!!,
            name = product.name,
            description = product.description,
            price = product.price,
            image = product.image
        )
    }

    fun toEntity(productInputDTO: ProductInputDTO): Product {
        return Product(
            name = productInputDTO.name,
            description = productInputDTO.description,
            price = productInputDTO.price,
            image = productInputDTO.image
        )
    }
}