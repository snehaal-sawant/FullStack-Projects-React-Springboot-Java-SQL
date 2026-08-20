package com.sanvimaritime.dto;

import java.time.LocalDateTime;
import java.util.List;

public class RfqInquiryResponse {
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
    private List<RfqItemDto> items;

    public RfqInquiryResponse() {}

    public RfqInquiryResponse(Long id, String referenceNumber, String name, String company, String email,
                              String phone, String vesselName, String imoNumber, String deliveryPort,
                              String urgency, String subject, String message, String notes, String status,
                              LocalDateTime createdAt, List<RfqItemDto> items) {
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
        this.items = items;
    }

    public static RfqInquiryResponseBuilder builder() {
        return new RfqInquiryResponseBuilder();
    }

    public static class RfqInquiryResponseBuilder {
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
        private List<RfqItemDto> items;

        public RfqInquiryResponseBuilder id(Long id) { this.id = id; return this; }
        public RfqInquiryResponseBuilder referenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; return this; }
        public RfqInquiryResponseBuilder name(String name) { this.name = name; return this; }
        public RfqInquiryResponseBuilder company(String company) { this.company = company; return this; }
        public RfqInquiryResponseBuilder email(String email) { this.email = email; return this; }
        public RfqInquiryResponseBuilder phone(String phone) { this.phone = phone; return this; }
        public RfqInquiryResponseBuilder vesselName(String vesselName) { this.vesselName = vesselName; return this; }
        public RfqInquiryResponseBuilder imoNumber(String imoNumber) { this.imoNumber = imoNumber; return this; }
        public RfqInquiryResponseBuilder deliveryPort(String deliveryPort) { this.deliveryPort = deliveryPort; return this; }
        public RfqInquiryResponseBuilder urgency(String urgency) { this.urgency = urgency; return this; }
        public RfqInquiryResponseBuilder subject(String subject) { this.subject = subject; return this; }
        public RfqInquiryResponseBuilder message(String message) { this.message = message; return this; }
        public RfqInquiryResponseBuilder notes(String notes) { this.notes = notes; return this; }
        public RfqInquiryResponseBuilder status(String status) { this.status = status; return this; }
        public RfqInquiryResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public RfqInquiryResponseBuilder items(List<RfqItemDto> items) { this.items = items; return this; }

        public RfqInquiryResponse build() {
            return new RfqInquiryResponse(id, referenceNumber, name, company, email, phone, vesselName, imoNumber, deliveryPort, urgency, subject, message, notes, status, createdAt, items);
        }
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

    public List<RfqItemDto> getItems() { return items; }
    public void setItems(List<RfqItemDto> items) { this.items = items; }
}
