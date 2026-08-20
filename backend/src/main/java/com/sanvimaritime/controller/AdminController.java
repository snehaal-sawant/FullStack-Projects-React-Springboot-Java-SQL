package com.sanvimaritime.controller;

import com.sanvimaritime.dto.*;
import com.sanvimaritime.service.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final MarineService marineService;
    private final BlogService blogService;
    private final RfqInquiryService rfqInquiryService;
    private final UserService userService;

    public AdminController(ProductService productService,
                           CategoryService categoryService,
                           MarineService marineService,
                           BlogService blogService,
                           RfqInquiryService rfqInquiryService,
                           UserService userService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.marineService = marineService;
        this.blogService = blogService;
        this.rfqInquiryService = rfqInquiryService;
        this.userService = userService;
    }

    // Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<AdminDashboardDto>> getDashboardStats() {
        List<RfqInquiryResponse> allRfqs = rfqInquiryService.getAllRfqs();
        List<RfqInquiryResponse> recentRfqs = allRfqs.stream().limit(5).toList();

        AdminDashboardDto stats = AdminDashboardDto.builder()
                .totalProducts(productService.countProducts())
                .totalCategories(categoryService.countCategories())
                .totalServices(marineService.countServices())
                .totalBlogs(blogService.countBlogs())
                .totalRfqs(rfqInquiryService.countRfqs())
                .totalUsers(userService.countUsers())
                .recentRfqs(recentRfqs)
                .build();

        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    // Users Management
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully"));
    }

    // Products Management
    @PostMapping("/products")
    public ResponseEntity<ApiResponse<ProductDto>> createProduct(@RequestBody ProductDto dto) {
        ProductDto created = productService.createProduct(dto);
        return ResponseEntity.ok(ApiResponse.success(created));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ApiResponse<ProductDto>> updateProduct(@PathVariable String id, @RequestBody ProductDto dto) {
        ProductDto updated = productService.updateProduct(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully"));
    }

    // Categories Management
    @PostMapping("/categories")
    public ResponseEntity<ApiResponse<CategoryDto>> createCategory(@RequestBody CategoryDto dto) {
        CategoryDto created = categoryService.createCategory(dto);
        return ResponseEntity.ok(ApiResponse.success(created));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<CategoryDto>> updateCategory(@PathVariable String id, @RequestBody CategoryDto dto) {
        CategoryDto updated = categoryService.updateCategory(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted successfully"));
    }

    // Marine Services Management
    @PostMapping("/services")
    public ResponseEntity<ApiResponse<ServiceDto>> createService(@RequestBody ServiceDto dto) {
        ServiceDto created = marineService.createService(dto);
        return ResponseEntity.ok(ApiResponse.success(created));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ApiResponse<ServiceDto>> updateService(@PathVariable String id, @RequestBody ServiceDto dto) {
        ServiceDto updated = marineService.updateService(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<ApiResponse<String>> deleteService(@PathVariable String id) {
        marineService.deleteService(id);
        return ResponseEntity.ok(ApiResponse.success("Service deleted successfully"));
    }

    // Blog Posts Management
    @PostMapping("/blogs")
    public ResponseEntity<ApiResponse<BlogPostDto>> createBlog(@RequestBody BlogPostDto dto) {
        BlogPostDto created = blogService.createBlog(dto);
        return ResponseEntity.ok(ApiResponse.success(created));
    }

    @PutMapping("/blogs/{id}")
    public ResponseEntity<ApiResponse<BlogPostDto>> updateBlog(@PathVariable String id, @RequestBody BlogPostDto dto) {
        BlogPostDto updated = blogService.updateBlog(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<ApiResponse<String>> deleteBlog(@PathVariable String id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok(ApiResponse.success("Blog post deleted successfully"));
    }

    // RFQ Inquiries Management
    @GetMapping("/rfqs")
    public ResponseEntity<ApiResponse<List<RfqInquiryResponse>>> getAllRfqs() {
        List<RfqInquiryResponse> rfqs = rfqInquiryService.getAllRfqs();
        return ResponseEntity.ok(ApiResponse.success(rfqs));
    }

    @PutMapping("/rfqs/{id}/status")
    public ResponseEntity<ApiResponse<RfqInquiryResponse>> updateRfqStatus(@PathVariable Long id, @RequestParam String status) {
        RfqInquiryResponse updated = rfqInquiryService.updateRfqStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/rfqs/{id}")
    public ResponseEntity<ApiResponse<String>> deleteRfq(@PathVariable Long id) {
        rfqInquiryService.deleteRfq(id);
        return ResponseEntity.ok(ApiResponse.success("RFQ Inquiry deleted successfully"));
    }
}
