package com.sanvimaritime.controller;

import com.sanvimaritime.dto.ApiResponse;
import com.sanvimaritime.dto.ProductDto;
import com.sanvimaritime.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDto>>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isNewArrival,
            @RequestParam(required = false) Boolean isFeatured) {
        List<ProductDto> products = productService.getFilteredProducts(category, brand, condition, search, isNewArrival, isFeatured);
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDto>> getProductById(@PathVariable String id) {
        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @GetMapping("/related")
    public ResponseEntity<ApiResponse<List<ProductDto>>> getRelatedProducts(
            @RequestParam String categoryId,
            @RequestParam String currentId) {
        List<ProductDto> related = productService.getRelatedProducts(categoryId, currentId);
        return ResponseEntity.ok(ApiResponse.success(related));
    }
}
