package com.sanvimaritime.dto;

public class BlogPostDto {
    private String id;
    private String slug;
    private String title;
    private String excerpt;
    private String content;
    private String image;
    private String author;
    private String date;
    private String category;
    private String readTime;

    public BlogPostDto() {}

    public BlogPostDto(String id, String slug, String title, String excerpt, String content,
                       String image, String author, String date, String category, String readTime) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.image = image;
        this.author = author;
        this.date = date;
        this.category = category;
        this.readTime = readTime;
    }

    public static BlogPostDtoBuilder builder() {
        return new BlogPostDtoBuilder();
    }

    public static class BlogPostDtoBuilder {
        private String id;
        private String slug;
        private String title;
        private String excerpt;
        private String content;
        private String image;
        private String author;
        private String date;
        private String category;
        private String readTime;

        public BlogPostDtoBuilder id(String id) { this.id = id; return this; }
        public BlogPostDtoBuilder slug(String slug) { this.slug = slug; return this; }
        public BlogPostDtoBuilder title(String title) { this.title = title; return this; }
        public BlogPostDtoBuilder excerpt(String excerpt) { this.excerpt = excerpt; return this; }
        public BlogPostDtoBuilder content(String content) { this.content = content; return this; }
        public BlogPostDtoBuilder image(String image) { this.image = image; return this; }
        public BlogPostDtoBuilder author(String author) { this.author = author; return this; }
        public BlogPostDtoBuilder date(String date) { this.date = date; return this; }
        public BlogPostDtoBuilder category(String category) { this.category = category; return this; }
        public BlogPostDtoBuilder readTime(String readTime) { this.readTime = readTime; return this; }

        public BlogPostDto build() {
            return new BlogPostDto(id, slug, title, excerpt, content, image, author, date, category, readTime);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getReadTime() { return readTime; }
    public void setReadTime(String readTime) { this.readTime = readTime; }
}
