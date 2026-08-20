package com.sanvimaritime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "blog_posts")
public class BlogPost {

    @Id
    @Column(length = 60)
    private String id;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(nullable = false, length = 250)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String excerpt;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(length = 255)
    private String image;

    @Column(length = 100)
    private String author;

    @Column(length = 50)
    private String date;

    @Column(length = 100)
    private String category;

    @Column(name = "read_time", length = 30)
    private String readTime;

    public BlogPost() {}

    public BlogPost(String id, String slug, String title, String excerpt, String content,
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

    public static BlogPostBuilder builder() {
        return new BlogPostBuilder();
    }

    public static class BlogPostBuilder {
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

        public BlogPostBuilder id(String id) { this.id = id; return this; }
        public BlogPostBuilder slug(String slug) { this.slug = slug; return this; }
        public BlogPostBuilder title(String title) { this.title = title; return this; }
        public BlogPostBuilder excerpt(String excerpt) { this.excerpt = excerpt; return this; }
        public BlogPostBuilder content(String content) { this.content = content; return this; }
        public BlogPostBuilder image(String image) { this.image = image; return this; }
        public BlogPostBuilder author(String author) { this.author = author; return this; }
        public BlogPostBuilder date(String date) { this.date = date; return this; }
        public BlogPostBuilder category(String category) { this.category = category; return this; }
        public BlogPostBuilder readTime(String readTime) { this.readTime = readTime; return this; }

        public BlogPost build() {
            return new BlogPost(id, slug, title, excerpt, content, image, author, date, category, readTime);
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
