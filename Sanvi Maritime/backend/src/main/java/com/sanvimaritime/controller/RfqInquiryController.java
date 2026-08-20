package com.sanvimaritime.controller;

import com.sanvimaritime.dto.ApiResponse;
import com.sanvimaritime.dto.RfqInquiryRequest;
import com.sanvimaritime.dto.RfqInquiryResponse;
import com.sanvimaritime.service.RfqInquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rfq")
public class RfqInquiryController {

    private final RfqInquiryService rfqInquiryService;

    public RfqInquiryController(RfqInquiryService rfqInquiryService) {
        this.rfqInquiryService = rfqInquiryService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RfqInquiryResponse>> submitRfq(@Valid @RequestBody RfqInquiryRequest request) {
        RfqInquiryResponse response = rfqInquiryService.submitRfq(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/my-rfqs")
    public ResponseEntity<ApiResponse<List<RfqInquiryResponse>>> getSubmittedRfqs(@RequestParam String email) {
        List<RfqInquiryResponse> list = rfqInquiryService.getRfqsByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/{referenceNumber}")
    public ResponseEntity<ApiResponse<RfqInquiryResponse>> getRfqByReference(@PathVariable String referenceNumber) {
        RfqInquiryResponse response = rfqInquiryService.getRfqByReference(referenceNumber);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
