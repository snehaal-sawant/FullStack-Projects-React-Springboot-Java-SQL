package com.sanvimaritime.controller;

import com.sanvimaritime.dto.ApiResponse;
import com.sanvimaritime.dto.CategoryDto;
import com.sanvimaritime.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getAllCategories() {
        List<CategoryDto> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<CategoryDto>> getCategoryByIdOrSlug(@PathVariable String slug) {
        CategoryDto category = categoryService.getCategoryByIdOrSlug(slug);
        return ResponseEntity.ok(ApiResponse.success(category));
    }
}
