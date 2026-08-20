package com.sanvimaritime.dto;

public class CategoryDto {
    private String id;
    private String name;
    private String slug;
    private String icon;
    private String image;
    private String description;

    public CategoryDto() {}

    public CategoryDto(String id, String name, String slug, String icon, String image, String description) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.icon = icon;
        this.image = image;
        this.description = description;
    }

    public static CategoryDtoBuilder builder() {
        return new CategoryDtoBuilder();
    }

    public static class CategoryDtoBuilder {
        private String id;
        private String name;
        private String slug;
        private String icon;
        private String image;
        private String description;

        public CategoryDtoBuilder id(String id) { this.id = id; return this; }
        public CategoryDtoBuilder name(String name) { this.name = name; return this; }
        public CategoryDtoBuilder slug(String slug) { this.slug = slug; return this; }
        public CategoryDtoBuilder icon(String icon) { this.icon = icon; return this; }
        public CategoryDtoBuilder image(String image) { this.image = image; return this; }
        public CategoryDtoBuilder description(String description) { this.description = description; return this; }

        public CategoryDto build() {
            return new CategoryDto(id, name, slug, icon, image, description);
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
