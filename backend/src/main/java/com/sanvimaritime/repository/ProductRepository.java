package com.sanvimaritime.repository;

import com.sanvimaritime.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByCategoryId(String categoryId);

    List<Product> findByCategorySlug(String categorySlug);

    List<Product> findByIsFeaturedTrue();

    List<Product> findByIsNewArrivalTrue();

    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR :category = '' OR :category = 'all' OR p.category.id = :category OR p.category.slug = :category) AND " +
           "(:brand IS NULL OR :brand = '' OR :brand = 'all' OR LOWER(p.brand) = LOWER(:brand)) AND " +
           "(:condition IS NULL OR :condition = '' OR :condition = 'all' OR LOWER(p.condition) LIKE LOWER(CONCAT('%', :condition, '%'))) AND " +
           "(:search IS NULL OR :search = '' OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.partNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:isNewArrival IS NULL OR p.isNewArrival = :isNewArrival) AND " +
           "(:isFeatured IS NULL OR p.isFeatured = :isFeatured)")
    List<Product> filterProducts(
            @Param("category") String category,
            @Param("brand") String brand,
            @Param("condition") String condition,
            @Param("search") String search,
            @Param("isNewArrival") Boolean isNewArrival,
            @Param("isFeatured") Boolean isFeatured
    );

    List<Product> findTop4ByCategoryIdAndIdNot(String categoryId, String currentId);
}
