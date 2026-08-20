package com.sanvimaritime.dto;

public class ServiceDto {
    private String id;
    private String title;
    private String shortDescription;
    private String fullDescription;
    private String image;
    private String icon;
    private String featuresJson;

    public ServiceDto() {}

    public ServiceDto(String id, String title, String shortDescription, String fullDescription, String image, String icon, String featuresJson) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.image = image;
        this.icon = icon;
        this.featuresJson = featuresJson;
    }

    public static ServiceDtoBuilder builder() {
        return new ServiceDtoBuilder();
    }

    public static class ServiceDtoBuilder {
        private String id;
        private String title;
        private String shortDescription;
        private String fullDescription;
        private String image;
        private String icon;
        private String featuresJson;

        public ServiceDtoBuilder id(String id) { this.id = id; return this; }
        public ServiceDtoBuilder title(String title) { this.title = title; return this; }
        public ServiceDtoBuilder shortDescription(String shortDescription) { this.shortDescription = shortDescription; return this; }
        public ServiceDtoBuilder fullDescription(String fullDescription) { this.fullDescription = fullDescription; return this; }
        public ServiceDtoBuilder image(String image) { this.image = image; return this; }
        public ServiceDtoBuilder icon(String icon) { this.icon = icon; return this; }
        public ServiceDtoBuilder featuresJson(String featuresJson) { this.featuresJson = featuresJson; return this; }

        public ServiceDto build() {
            return new ServiceDto(id, title, shortDescription, fullDescription, image, icon, featuresJson);
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
