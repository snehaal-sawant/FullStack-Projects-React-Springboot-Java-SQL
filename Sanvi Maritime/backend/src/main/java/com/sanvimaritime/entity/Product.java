package com.sanvimaritime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @Column(length = 60)
    private String id;

    @Column(name = "part_number", nullable = false, length = 100)
    private String partNumber;

    @Column(nullable = false, length = 200)
    private String title;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 100)
    private String brand;

    @Column(name = "product_condition", length = 100)
    private String condition;

    @Column(length = 50)
    private String availability;

    @Column(length = 100)
    private String location;

    @Column(length = 255)
    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "specs_json", columnDefinition = "TEXT")
    private String specsJson;

    @Column(name = "is_new_arrival")
    private Boolean isNewArrival;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    public Product() {}

    public Product(String id, String partNumber, String title, Category category, String brand,
                   String condition, String availability, String location, String image,
                   String description, String specsJson, Boolean isNewArrival, Boolean isFeatured) {
        this.id = id;
        this.partNumber = partNumber;
        this.title = title;
        this.category = category;
        this.brand = brand;
        this.condition = condition;
        this.availability = availability;
        this.location = location;
        this.image = image;
        this.description = description;
        this.specsJson = specsJson;
        this.isNewArrival = isNewArrival;
        this.isFeatured = isFeatured;
    }

    public static ProductBuilder builder() {
        return new ProductBuilder();
    }

    public static class ProductBuilder {
        private String id;
        private String partNumber;
        private String title;
        private Category category;
        private String brand;
        private String condition;
        private String availability;
        private String location;
        private String image;
        private String description;
        private String specsJson;
        private Boolean isNewArrival;
        private Boolean isFeatured;

        public ProductBuilder id(String id) { this.id = id; return this; }
        public ProductBuilder partNumber(String partNumber) { this.partNumber = partNumber; return this; }
        public ProductBuilder title(String title) { this.title = title; return this; }
        public ProductBuilder category(Category category) { this.category = category; return this; }
        public ProductBuilder brand(String brand) { this.brand = brand; return this; }
        public ProductBuilder condition(String condition) { this.condition = condition; return this; }
        public ProductBuilder availability(String availability) { this.availability = availability; return this; }
        public ProductBuilder location(String location) { this.location = location; return this; }
        public ProductBuilder image(String image) { this.image = image; return this; }
        public ProductBuilder description(String description) { this.description = description; return this; }
        public ProductBuilder specsJson(String specsJson) { this.specsJson = specsJson; return this; }
        public ProductBuilder isNewArrival(Boolean isNewArrival) { this.isNewArrival = isNewArrival; return this; }
        public ProductBuilder isFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; return this; }

        public Product build() {
            return new Product(id, partNumber, title, category, brand, condition, availability, location, image, description, specsJson, isNewArrival, isFeatured);
        }
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPartNumber() { return partNumber; }
    public void setPartNumber(String partNumber) { this.partNumber = partNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSpecsJson() { return specsJson; }
    public void setSpecsJson(String specsJson) { this.specsJson = specsJson; }

    public Boolean getIsNewArrival() { return isNewArrival; }
    public void setIsNewArrival(Boolean isNewArrival) { this.isNewArrival = isNewArrival; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
}
