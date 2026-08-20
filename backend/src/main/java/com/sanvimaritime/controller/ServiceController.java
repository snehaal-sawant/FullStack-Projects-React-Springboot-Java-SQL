package com.sanvimaritime.controller;

import com.sanvimaritime.dto.ApiResponse;
import com.sanvimaritime.dto.ServiceDto;
import com.sanvimaritime.service.MarineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final MarineService marineService;

    public ServiceController(MarineService marineService) {
        this.marineService = marineService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceDto>>> getAllServices() {
        List<ServiceDto> services = marineService.getAllServices();
        return ResponseEntity.ok(ApiResponse.success(services));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceDto>> getServiceById(@PathVariable String id) {
        ServiceDto service = marineService.getServiceById(id);
        return ResponseEntity.ok(ApiResponse.success(service));
    }
}
