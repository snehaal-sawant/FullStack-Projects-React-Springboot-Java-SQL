package com.sanvimaritime.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "company_settings")
public class CompanySetting {

    @Id
    @Column(length = 60)
    private String id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 255)
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "TEXT")
    private String warehouseAddress;

    @Column(length = 50)
    private String phone;

    @Column(length = 50)
    private String altPhone;

    @Column(length = 100)
    private String email;

    @Column(length = 100)
    private String salesEmail;

    @Column(length = 150)
    private String workingHours;

    @Column(length = 255)
    private String facebook;

    @Column(length = 255)
    private String linkedin;

    @Column(length = 255)
    private String whatsapp;

    @Column(length = 255)
    private String logo;

    @Column(name = "stats_json", columnDefinition = "TEXT")
    private String statsJson;

    public CompanySetting() {}

    public CompanySetting(String id, String name, String tagline, String address, String warehouseAddress,
                          String phone, String altPhone, String email, String salesEmail, String workingHours,
                          String facebook, String linkedin, String whatsapp, String logo, String statsJson) {
        this.id = id;
        this.name = name;
        this.tagline = tagline;
        this.address = address;
        this.warehouseAddress = warehouseAddress;
        this.phone = phone;
        this.altPhone = altPhone;
        this.email = email;
        this.salesEmail = salesEmail;
        this.workingHours = workingHours;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.whatsapp = whatsapp;
        this.logo = logo;
        this.statsJson = statsJson;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getWarehouseAddress() { return warehouseAddress; }
    public void setWarehouseAddress(String warehouseAddress) { this.warehouseAddress = warehouseAddress; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAltPhone() { return altPhone; }
    public void setAltPhone(String altPhone) { this.altPhone = altPhone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSalesEmail() { return salesEmail; }
    public void setSalesEmail(String salesEmail) { this.salesEmail = salesEmail; }

    public String getWorkingHours() { return workingHours; }
    public void setWorkingHours(String workingHours) { this.workingHours = workingHours; }

    public String getFacebook() { return facebook; }
    public void setFacebook(String facebook) { this.facebook = facebook; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getWhatsapp() { return whatsapp; }
    public void setWhatsapp(String whatsapp) { this.whatsapp = whatsapp; }

    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }

    public String getStatsJson() { return statsJson; }
    public void setStatsJson(String statsJson) { this.statsJson = statsJson; }
}
