package com.sanvimaritime.service;

import com.sanvimaritime.dto.BlogPostDto;
import com.sanvimaritime.entity.BlogPost;
import com.sanvimaritime.repository.BlogPostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogPostRepository blogPostRepository;

    public BlogService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPostDto> getAllBlogs() {
        return blogPostRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public BlogPostDto getBlogBySlug(String slug) {
        BlogPost blog = blogPostRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Blog post not found with slug: " + slug));
        return mapToDto(blog);
    }

    public BlogPostDto createBlog(BlogPostDto dto) {
        String id = dto.getId() != null && !dto.getId().isBlank() ? dto.getId() : "blog-" + System.currentTimeMillis();
        String slug = dto.getSlug() != null && !dto.getSlug().isBlank() ? dto.getSlug() : id;
        String date = dto.getDate() != null && !dto.getDate().isBlank() ? dto.getDate() :
                      LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM d, yyyy"));

        BlogPost blog = BlogPost.builder()
                .id(id)
                .slug(slug)
                .title(dto.getTitle())
                .excerpt(dto.getExcerpt())
                .content(dto.getContent())
                .image(dto.getImage())
                .author(dto.getAuthor() != null ? dto.getAuthor() : "Sanvi Maritime")
                .date(date)
                .category(dto.getCategory())
                .readTime(dto.getReadTime() != null ? dto.getReadTime() : "5 min read")
                .build();

        BlogPost saved = blogPostRepository.save(blog);
        return mapToDto(saved);
    }

    public BlogPostDto updateBlog(String id, BlogPostDto dto) {
        BlogPost blog = blogPostRepository.findById(id)
                .orElseGet(() -> blogPostRepository.findBySlug(id)
                        .orElseThrow(() -> new IllegalArgumentException("Blog post not found: " + id)));

        blog.setTitle(dto.getTitle());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) blog.setSlug(dto.getSlug());
        blog.setExcerpt(dto.getExcerpt());
        blog.setContent(dto.getContent());
        blog.setImage(dto.getImage());
        if (dto.getAuthor() != null) blog.setAuthor(dto.getAuthor());
        if (dto.getDate() != null) blog.setDate(dto.getDate());
        blog.setCategory(dto.getCategory());
        if (dto.getReadTime() != null) blog.setReadTime(dto.getReadTime());

        BlogPost updated = blogPostRepository.save(blog);
        return mapToDto(updated);
    }

    public void deleteBlog(String id) {
        BlogPost blog = blogPostRepository.findById(id)
                .orElseGet(() -> blogPostRepository.findBySlug(id).orElse(null));
        if (blog == null) {
            throw new IllegalArgumentException("Blog post not found: " + id);
        }
        blogPostRepository.delete(blog);
    }

    public long countBlogs() {
        return blogPostRepository.count();
    }

    private BlogPostDto mapToDto(BlogPost blog) {
        return BlogPostDto.builder()
                .id(blog.getId())
                .slug(blog.getSlug())
                .title(blog.getTitle())
                .excerpt(blog.getExcerpt())
                .content(blog.getContent())
                .image(blog.getImage())
                .author(blog.getAuthor())
                .date(blog.getDate())
                .category(blog.getCategory())
                .readTime(blog.getReadTime())
                .build();
    }
}
