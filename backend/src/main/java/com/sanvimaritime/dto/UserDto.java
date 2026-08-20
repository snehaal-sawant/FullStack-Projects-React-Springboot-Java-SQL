package com.sanvimaritime.dto;

public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String company;
    private String phone;
    private String role;

    public UserDto() {}

    public UserDto(Long id, String email, String name, String company, String phone, String role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.role = role;
    }

    public static UserDtoBuilder builder() {
        return new UserDtoBuilder();
    }

    public static class UserDtoBuilder {
        private Long id;
        private String email;
        private String name;
        private String company;
        private String phone;
        private String role;

        public UserDtoBuilder id(Long id) { this.id = id; return this; }
        public UserDtoBuilder email(String email) { this.email = email; return this; }
        public UserDtoBuilder name(String name) { this.name = name; return this; }
        public UserDtoBuilder company(String company) { this.company = company; return this; }
        public UserDtoBuilder phone(String phone) { this.phone = phone; return this; }
        public UserDtoBuilder role(String role) { this.role = role; return this; }

        public UserDto build() {
            return new UserDto(id, email, name, company, phone, role);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
