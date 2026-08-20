package com.sanvimaritime.controller;

import com.sanvimaritime.dto.ApiResponse;
import com.sanvimaritime.entity.CompanySetting;
import com.sanvimaritime.repository.CompanySettingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CompanySettingController {

    private final CompanySettingRepository companySettingRepository;

    public CompanySettingController(CompanySettingRepository companySettingRepository) {
        this.companySettingRepository = companySettingRepository;
    }

    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<CompanySetting>> getSettings() {
        CompanySetting setting = companySettingRepository.findById("default").orElse(null);
        return ResponseEntity.ok(ApiResponse.success(setting));
    }

    @PutMapping("/admin/settings")
    public ResponseEntity<ApiResponse<CompanySetting>> updateSettings(@RequestBody CompanySetting newSetting) {
        newSetting.setId("default");
        CompanySetting saved = companySettingRepository.save(newSetting);
        return ResponseEntity.ok(ApiResponse.success("Company settings updated successfully", saved));
    }
}
