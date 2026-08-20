package com.sanvimaritime.dto;

public class RfqItemDto {
    private String productId;
    private String partNumber;
    private String title;
    private Integer quantity;

    public RfqItemDto() {}

    public RfqItemDto(String productId, String partNumber, String title, Integer quantity) {
        this.productId = productId;
        this.partNumber = partNumber;
        this.title = title;
        this.quantity = quantity;
    }

    public static RfqItemDtoBuilder builder() {
        return new RfqItemDtoBuilder();
    }

    public static class RfqItemDtoBuilder {
        private String productId;
        private String partNumber;
        private String title;
        private Integer quantity;

        public RfqItemDtoBuilder productId(String productId) { this.productId = productId; return this; }
        public RfqItemDtoBuilder partNumber(String partNumber) { this.partNumber = partNumber; return this; }
        public RfqItemDtoBuilder title(String title) { this.title = title; return this; }
        public RfqItemDtoBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }

        public RfqItemDto build() {
            return new RfqItemDto(productId, partNumber, title, quantity);
        }
    }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getPartNumber() { return partNumber; }
    public void setPartNumber(String partNumber) { this.partNumber = partNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
