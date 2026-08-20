package com.sanvimaritime.dto;

public class ProductDto {
    private String id;
    private String partNumber;
    private String title;
    private String category;
    private String categoryName;
    private String brand;
    private String condition;
    private String availability;
    private String location;
    private String image;
    private String description;
    private String specsJson;
    private Boolean isNewArrival;
    private Boolean isFeatured;

    public ProductDto() {}

    public ProductDto(String id, String partNumber, String title, String category, String categoryName,
                      String brand, String condition, String availability, String location, String image,
                      String description, String specsJson, Boolean isNewArrival, Boolean isFeatured) {
        this.id = id;
        this.partNumber = partNumber;
        this.title = title;
        this.category = category;
        this.categoryName = categoryName;
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

    public static ProductDtoBuilder builder() {
        return new ProductDtoBuilder();
    }

    public static class ProductDtoBuilder {
        private String id;
        private String partNumber;
        private String title;
        private String category;
        private String categoryName;
        private String brand;
        private String condition;
        private String availability;
        private String location;
        private String image;
        private String description;
        private String specsJson;
        private Boolean isNewArrival;
        private Boolean isFeatured;

        public ProductDtoBuilder id(String id) { this.id = id; return this; }
        public ProductDtoBuilder partNumber(String partNumber) { this.partNumber = partNumber; return this; }
        public ProductDtoBuilder title(String title) { this.title = title; return this; }
        public ProductDtoBuilder category(String category) { this.category = category; return this; }
        public ProductDtoBuilder categoryName(String categoryName) { this.categoryName = categoryName; return this; }
        public ProductDtoBuilder brand(String brand) { this.brand = brand; return this; }
        public ProductDtoBuilder condition(String condition) { this.condition = condition; return this; }
        public ProductDtoBuilder availability(String availability) { this.availability = availability; return this; }
        public ProductDtoBuilder location(String location) { this.location = location; return this; }
        public ProductDtoBuilder image(String image) { this.image = image; return this; }
        public ProductDtoBuilder description(String description) { this.description = description; return this; }
        public ProductDtoBuilder specsJson(String specsJson) { this.specsJson = specsJson; return this; }
        public ProductDtoBuilder isNewArrival(Boolean isNewArrival) { this.isNewArrival = isNewArrival; return this; }
        public ProductDtoBuilder isFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; return this; }

        public ProductDto build() {
            return new ProductDto(id, partNumber, title, category, categoryName, brand, condition, availability, location, image, description, specsJson, isNewArrival, isFeatured);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPartNumber() { return partNumber; }
    public void setPartNumber(String partNumber) { this.partNumber = partNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

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
