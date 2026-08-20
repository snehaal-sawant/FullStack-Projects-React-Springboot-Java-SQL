package com.sanvimaritime.service;

import com.sanvimaritime.dto.CategoryDto;
import com.sanvimaritime.entity.Category;
import com.sanvimaritime.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CategoryDto getCategoryByIdOrSlug(String identifier) {
        Category category = categoryRepository.findById(identifier)
                .orElseGet(() -> categoryRepository.findBySlug(identifier)
                        .orElseThrow(() -> new IllegalArgumentException("Category not found: " + identifier)));
        return mapToDto(category);
    }

    public CategoryDto createCategory(CategoryDto dto) {
        String id = dto.getId() != null && !dto.getId().isBlank() ? dto.getId() :
                    (dto.getSlug() != null && !dto.getSlug().isBlank() ? dto.getSlug() : "cat-" + System.currentTimeMillis());
        String slug = dto.getSlug() != null && !dto.getSlug().isBlank() ? dto.getSlug() : id;

        Category category = Category.builder()
                .id(id)
                .name(dto.getName())
                .slug(slug)
                .icon(dto.getIcon())
                .image(dto.getImage())
                .description(dto.getDescription())
                .build();

        Category saved = categoryRepository.save(category);
        return mapToDto(saved);
    }

    public CategoryDto updateCategory(String id, CategoryDto dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));

        category.setName(dto.getName());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) category.setSlug(dto.getSlug());
        category.setIcon(dto.getIcon());
        category.setImage(dto.getImage());
        category.setDescription(dto.getDescription());

        Category updated = categoryRepository.save(category);
        return mapToDto(updated);
    }

    public void deleteCategory(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    public long countCategories() {
        return categoryRepository.count();
    }

    private CategoryDto mapToDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .icon(category.getIcon())
                .image(category.getImage())
                .description(category.getDescription())
                .build();
    }
}
