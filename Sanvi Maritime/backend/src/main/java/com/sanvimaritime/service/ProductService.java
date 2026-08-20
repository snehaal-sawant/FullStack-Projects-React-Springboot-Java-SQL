package com.sanvimaritime.service;

import com.sanvimaritime.dto.ProductDto;
import com.sanvimaritime.entity.Category;
import com.sanvimaritime.entity.Product;
import com.sanvimaritime.repository.CategoryRepository;
import com.sanvimaritime.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductDto> getFilteredProducts(String category, String brand, String condition,
                                                 String search, Boolean isNewArrival, Boolean isFeatured) {
        List<Product> products = productRepository.filterProducts(category, brand, condition, search, isNewArrival, isFeatured);
        return products.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ProductDto getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
        return mapToDto(product);
    }

    public List<ProductDto> getRelatedProducts(String categoryId, String currentId) {
        List<Product> related = productRepository.findTop4ByCategoryIdAndIdNot(categoryId, currentId);
        return related.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public ProductDto createProduct(ProductDto dto) {
        String id = dto.getId() != null && !dto.getId().isBlank() ? dto.getId() : "prod-" + System.currentTimeMillis();
        Category category = null;
        if (dto.getCategory() != null && !dto.getCategory().isBlank()) {
            category = categoryRepository.findById(dto.getCategory()).orElse(null);
        }

        Product product = Product.builder()
                .id(id)
                .partNumber(dto.getPartNumber())
                .title(dto.getTitle())
                .category(category)
                .brand(dto.getBrand())
                .condition(dto.getCondition())
                .availability(dto.getAvailability())
                .location(dto.getLocation())
                .image(dto.getImage())
                .description(dto.getDescription())
                .specsJson(dto.getSpecsJson())
                .isNewArrival(dto.getIsNewArrival() != null ? dto.getIsNewArrival() : false)
                .isFeatured(dto.getIsFeatured() != null ? dto.getIsFeatured() : false)
                .build();

        Product saved = productRepository.save(product);
        return mapToDto(saved);
    }

    public ProductDto updateProduct(String id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));

        Category category = null;
        if (dto.getCategory() != null && !dto.getCategory().isBlank()) {
            category = categoryRepository.findById(dto.getCategory()).orElse(null);
        }

        product.setPartNumber(dto.getPartNumber());
        product.setTitle(dto.getTitle());
        product.setCategory(category);
        product.setBrand(dto.getBrand());
        product.setCondition(dto.getCondition());
        product.setAvailability(dto.getAvailability());
        product.setLocation(dto.getLocation());
        product.setImage(dto.getImage());
        product.setDescription(dto.getDescription());
        product.setSpecsJson(dto.getSpecsJson());
        if (dto.getIsNewArrival() != null) product.setIsNewArrival(dto.getIsNewArrival());
        if (dto.getIsFeatured() != null) product.setIsFeatured(dto.getIsFeatured());

        Product updated = productRepository.save(product);
        return mapToDto(updated);
    }

    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    public long countProducts() {
        return productRepository.count();
    }

    private ProductDto mapToDto(Product product) {
        String categoryId = product.getCategory() != null ? product.getCategory().getId() : null;
        String categoryName = product.getCategory() != null ? product.getCategory().getName() : null;

        return ProductDto.builder()
                .id(product.getId())
                .partNumber(product.getPartNumber())
                .title(product.getTitle())
                .category(categoryId)
                .categoryName(categoryName)
                .brand(product.getBrand())
                .condition(product.getCondition())
                .availability(product.getAvailability())
                .location(product.getLocation())
                .image(product.getImage())
                .description(product.getDescription())
                .specsJson(product.getSpecsJson())
                .isNewArrival(product.getIsNewArrival())
                .isFeatured(product.getIsFeatured())
                .build();
    }
}
