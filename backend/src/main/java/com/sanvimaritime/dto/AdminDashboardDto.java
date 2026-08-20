package com.sanvimaritime.dto;

import java.util.List;

public class AdminDashboardDto {
    private long totalProducts;
    private long totalCategories;
    private long totalServices;
    private long totalBlogs;
    private long totalRfqs;
    private long totalUsers;
    private List<RfqInquiryResponse> recentRfqs;

    public AdminDashboardDto() {}

    public AdminDashboardDto(long totalProducts, long totalCategories, long totalServices, long totalBlogs, long totalRfqs, long totalUsers, List<RfqInquiryResponse> recentRfqs) {
        this.totalProducts = totalProducts;
        this.totalCategories = totalCategories;
        this.totalServices = totalServices;
        this.totalBlogs = totalBlogs;
        this.totalRfqs = totalRfqs;
        this.totalUsers = totalUsers;
        this.recentRfqs = recentRfqs;
    }

    public static AdminDashboardDtoBuilder builder() {
        return new AdminDashboardDtoBuilder();
    }

    public static class AdminDashboardDtoBuilder {
        private long totalProducts;
        private long totalCategories;
        private long totalServices;
        private long totalBlogs;
        private long totalRfqs;
        private long totalUsers;
        private List<RfqInquiryResponse> recentRfqs;

        public AdminDashboardDtoBuilder totalProducts(long totalProducts) { this.totalProducts = totalProducts; return this; }
        public AdminDashboardDtoBuilder totalCategories(long totalCategories) { this.totalCategories = totalCategories; return this; }
        public AdminDashboardDtoBuilder totalServices(long totalServices) { this.totalServices = totalServices; return this; }
        public AdminDashboardDtoBuilder totalBlogs(long totalBlogs) { this.totalBlogs = totalBlogs; return this; }
        public AdminDashboardDtoBuilder totalRfqs(long totalRfqs) { this.totalRfqs = totalRfqs; return this; }
        public AdminDashboardDtoBuilder totalUsers(long totalUsers) { this.totalUsers = totalUsers; return this; }
        public AdminDashboardDtoBuilder recentRfqs(List<RfqInquiryResponse> recentRfqs) { this.recentRfqs = recentRfqs; return this; }

        public AdminDashboardDto build() {
            return new AdminDashboardDto(totalProducts, totalCategories, totalServices, totalBlogs, totalRfqs, totalUsers, recentRfqs);
        }
    }

    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

    public long getTotalCategories() { return totalCategories; }
    public void setTotalCategories(long totalCategories) { this.totalCategories = totalCategories; }

    public long getTotalServices() { return totalServices; }
    public void setTotalServices(long totalServices) { this.totalServices = totalServices; }

    public long getTotalBlogs() { return totalBlogs; }
    public void setTotalBlogs(long totalBlogs) { this.totalBlogs = totalBlogs; }

    public long getTotalRfqs() { return totalRfqs; }
    public void setTotalRfqs(long totalRfqs) { this.totalRfqs = totalRfqs; }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public List<RfqInquiryResponse> getRecentRfqs() { return recentRfqs; }
    public void setRecentRfqs(List<RfqInquiryResponse> recentRfqs) { this.recentRfqs = recentRfqs; }
}
