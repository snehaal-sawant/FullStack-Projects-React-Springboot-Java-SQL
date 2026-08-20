package com.sanvimaritime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @Column(length = 60)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String slug;

    @Column(length = 50)
    private String icon;

    @Column(length = 255)
    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Category() {}

    public Category(String id, String name, String slug, String icon, String image, String description) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.icon = icon;
        this.image = image;
        this.description = description;
    }

    public static CategoryBuilder builder() {
        return new CategoryBuilder();
    }

    public static class CategoryBuilder {
        private String id;
        private String name;
        private String slug;
        private String icon;
        private String image;
        private String description;

        public CategoryBuilder id(String id) { this.id = id; return this; }
        public CategoryBuilder name(String name) { this.name = name; return this; }
        public CategoryBuilder slug(String slug) { this.slug = slug; return this; }
        public CategoryBuilder icon(String icon) { this.icon = icon; return this; }
        public CategoryBuilder image(String image) { this.image = image; return this; }
        public CategoryBuilder description(String description) { this.description = description; return this; }

        public Category build() {
            return new Category(id, name, slug, icon, image, description);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
