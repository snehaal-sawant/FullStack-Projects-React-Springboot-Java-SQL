package com.sanvimaritime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "marine_services")
public class MarineServiceEntity {

    @Id
    @Column(length = 60)
    private String id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    @Column(name = "full_description", columnDefinition = "MEDIUMTEXT")
    private String fullDescription;

    @Column(length = 255)
    private String image;

    @Column(length = 50)
    private String icon;

    @Column(name = "features_json", columnDefinition = "TEXT")
    private String featuresJson;

    public MarineServiceEntity() {}

    public MarineServiceEntity(String id, String title, String shortDescription, String fullDescription,
                                String image, String icon, String featuresJson) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.image = image;
        this.icon = icon;
        this.featuresJson = featuresJson;
    }

    public static MarineServiceEntityBuilder builder() {
        return new MarineServiceEntityBuilder();
    }

    public static class MarineServiceEntityBuilder {
        private String id;
        private String title;
        private String shortDescription;
        private String fullDescription;
        private String image;
        private String icon;
        private String featuresJson;

        public MarineServiceEntityBuilder id(String id) { this.id = id; return this; }
        public MarineServiceEntityBuilder title(String title) { this.title = title; return this; }
        public MarineServiceEntityBuilder shortDescription(String shortDescription) { this.shortDescription = shortDescription; return this; }
        public MarineServiceEntityBuilder fullDescription(String fullDescription) { this.fullDescription = fullDescription; return this; }
        public MarineServiceEntityBuilder image(String image) { this.image = image; return this; }
        public MarineServiceEntityBuilder icon(String icon) { this.icon = icon; return this; }
        public MarineServiceEntityBuilder featuresJson(String featuresJson) { this.featuresJson = featuresJson; return this; }

        public MarineServiceEntity build() {
            return new MarineServiceEntity(id, title, shortDescription, fullDescription, image, icon, featuresJson);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getFeaturesJson() { return featuresJson; }
    public void setFeaturesJson(String featuresJson) { this.featuresJson = featuresJson; }
}
