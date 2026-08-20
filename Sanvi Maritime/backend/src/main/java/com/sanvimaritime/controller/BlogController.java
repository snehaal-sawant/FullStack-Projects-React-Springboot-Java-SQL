package com.sanvimaritime.controller;

import com.sanvimaritime.dto.ApiResponse;
import com.sanvimaritime.dto.BlogPostDto;
import com.sanvimaritime.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BlogPostDto>>> getAllBlogs() {
        List<BlogPostDto> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(ApiResponse.success(blogs));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogPostDto>> getBlogBySlug(@PathVariable String slug) {
        BlogPostDto blog = blogService.getBlogBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(blog));
    }
}
