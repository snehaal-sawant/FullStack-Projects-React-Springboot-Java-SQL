package com.sanvimaritime.repository;

import com.sanvimaritime.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, String> {
    Optional<BlogPost> findBySlug(String slug);
}
