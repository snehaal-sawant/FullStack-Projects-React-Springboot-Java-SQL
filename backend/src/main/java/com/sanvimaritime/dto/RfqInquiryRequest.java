package com.sanvimaritime.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class RfqInquiryRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String company;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    private String vesselName;
    private String imoNumber;
    private String deliveryPort;
    private String urgency;
    private String subject;
    private String message;
    private String notes;

    private List<RfqItemDto> items;
    private List<RfqItemDto> itemsRequested;

    public RfqInquiryRequest() {}

    public RfqInquiryRequest(String name, String company, String email, String phone, String vesselName,
                             String imoNumber, String deliveryPort, String urgency, String subject,
                             String message, String notes, List<RfqItemDto> items, List<RfqItemDto> itemsRequested) {
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
        this.items = items;
        this.itemsRequested = itemsRequested;
    }

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

    public List<RfqItemDto> getItems() {
        if (items != null && !items.isEmpty()) {
            return items;
        }
        return itemsRequested;
    }
    public void setItems(List<RfqItemDto> items) { this.items = items; }

    public List<RfqItemDto> getItemsRequested() { return itemsRequested; }
    public void setItemsRequested(List<RfqItemDto> itemsRequested) { this.itemsRequested = itemsRequested; }
}
