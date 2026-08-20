package com.sanvimaritime.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rfq_inquiries")
public class RfqInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_number", unique = true, nullable = false, length = 50)
    private String referenceNumber;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 150)
    private String company;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 30)
    private String phone;

    @Column(name = "vessel_name", length = 100)
    private String vesselName;

    @Column(name = "imo_number", length = 50)
    private String imoNumber;

    @Column(name = "delivery_port", length = 100)
    private String deliveryPort;

    @Column(length = 50)
    private String urgency;

    @Column(length = 200)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(length = 30)
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "rfqInquiry", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RfqItem> items = new ArrayList<>();

    public RfqInquiry() {}

    public RfqInquiry(Long id, String referenceNumber, String name, String company, String email,
                      String phone, String vesselName, String imoNumber, String deliveryPort,
                      String urgency, String subject, String message, String notes, String status,
                      LocalDateTime createdAt, List<RfqItem> items) {
        this.id = id;
        this.referenceNumber = referenceNumber;
        this.name = name;
        this.company = company;
        this.email = email;
        this.phone = phone;
        this.vesselName = vesselName;
        this.imoNumber = imoNumber;
        this.deliveryPort = deliveryPort;
        this.urgency = urgency;
        this.subject = subject;
        this.message = message;
        this.notes = notes;
        this.status = status;
        this.createdAt = createdAt;
        if (items != null) {
            this.items = items;
        }
    }

    public static RfqInquiryBuilder builder() {
        return new RfqInquiryBuilder();
    }

    public static class RfqInquiryBuilder {
        private Long id;
        private String referenceNumber;
        private String name;
        private String company;
        private String email;
        private String phone;
        private String vesselName;
        private String imoNumber;
        private String deliveryPort;
        private String urgency;
        private String subject;
        private String message;
        private String notes;
        private String status;
        private LocalDateTime createdAt;
        private List<RfqItem> items = new ArrayList<>();

        public RfqInquiryBuilder id(Long id) { this.id = id; return this; }
        public RfqInquiryBuilder referenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; return this; }
        public RfqInquiryBuilder name(String name) { this.name = name; return this; }
        public RfqInquiryBuilder company(String company) { this.company = company; return this; }
        public RfqInquiryBuilder email(String email) { this.email = email; return this; }
        public RfqInquiryBuilder phone(String phone) { this.phone = phone; return this; }
        public RfqInquiryBuilder vesselName(String vesselName) { this.vesselName = vesselName; return this; }
        public RfqInquiryBuilder imoNumber(String imoNumber) { this.imoNumber = imoNumber; return this; }
        public RfqInquiryBuilder deliveryPort(String deliveryPort) { this.deliveryPort = deliveryPort; return this; }
        public RfqInquiryBuilder urgency(String urgency) { this.urgency = urgency; return this; }
        public RfqInquiryBuilder subject(String subject) { this.subject = subject; return this; }
        public RfqInquiryBuilder message(String message) { this.message = message; return this; }
        public RfqInquiryBuilder notes(String notes) { this.notes = notes; return this; }
        public RfqInquiryBuilder status(String status) { this.status = status; return this; }
        public RfqInquiryBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public RfqInquiryBuilder items(List<RfqItem> items) { if (items != null) this.items = items; return this; }

        public RfqInquiry build() {
            return new RfqInquiry(id, referenceNumber, name, company, email, phone, vesselName, imoNumber, deliveryPort, urgency, subject, message, notes, status, createdAt, items);
        }
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "Received";
        }
    }

    public void addItem(RfqItem item) {
        items.add(item);
        item.setRfqInquiry(this);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getVesselName() { return vesselName; }
    public void setVesselName(String vesselName) { this.vesselName = vesselName; }

    public String getImoNumber() { return imoNumber; }
    public void setImoNumber(String imoNumber) { this.imoNumber = imoNumber; }

    public String getDeliveryPort() { return deliveryPort; }
    public void setDeliveryPort(String deliveryPort) { this.deliveryPort = deliveryPort; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<RfqItem> getItems() { return items; }
    public void setItems(List<RfqItem> items) { this.items = items; }
}
