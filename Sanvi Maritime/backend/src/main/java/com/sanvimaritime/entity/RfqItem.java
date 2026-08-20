package com.sanvimaritime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rfq_items")
public class RfqItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rfq_inquiry_id")
    private RfqInquiry rfqInquiry;

    @Column(name = "product_id", length = 60)
    private String productId;

    @Column(name = "part_number", length = 100)
    private String partNumber;

    @Column(length = 200)
    private String title;

    private Integer quantity;

    public RfqItem() {}

    public RfqItem(Long id, RfqInquiry rfqInquiry, String productId, String partNumber, String title, Integer quantity) {
        this.id = id;
        this.rfqInquiry = rfqInquiry;
        this.productId = productId;
        this.partNumber = partNumber;
        this.title = title;
        this.quantity = quantity;
    }

    public static RfqItemBuilder builder() {
        return new RfqItemBuilder();
    }

    public static class RfqItemBuilder {
        private Long id;
        private RfqInquiry rfqInquiry;
        private String productId;
        private String partNumber;
        private String title;
        private Integer quantity;

        public RfqItemBuilder id(Long id) { this.id = id; return this; }
        public RfqItemBuilder rfqInquiry(RfqInquiry rfqInquiry) { this.rfqInquiry = rfqInquiry; return this; }
        public RfqItemBuilder productId(String productId) { this.productId = productId; return this; }
        public RfqItemBuilder partNumber(String partNumber) { this.partNumber = partNumber; return this; }
        public RfqItemBuilder title(String title) { this.title = title; return this; }
        public RfqItemBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }

        public RfqItem build() {
            return new RfqItem(id, rfqInquiry, productId, partNumber, title, quantity);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public RfqInquiry getRfqInquiry() { return rfqInquiry; }
    public void setRfqInquiry(RfqInquiry rfqInquiry) { this.rfqInquiry = rfqInquiry; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getPartNumber() { return partNumber; }
    public void setPartNumber(String partNumber) { this.partNumber = partNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
