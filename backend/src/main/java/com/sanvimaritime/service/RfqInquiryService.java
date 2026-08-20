package com.sanvimaritime.service;

import com.sanvimaritime.dto.RfqInquiryRequest;
import com.sanvimaritime.dto.RfqInquiryResponse;
import com.sanvimaritime.dto.RfqItemDto;
import com.sanvimaritime.entity.RfqInquiry;
import com.sanvimaritime.entity.RfqItem;
import com.sanvimaritime.repository.RfqInquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class RfqInquiryService {

    private final RfqInquiryRepository rfqInquiryRepository;

    public RfqInquiryService(RfqInquiryRepository rfqInquiryRepository) {
        this.rfqInquiryRepository = rfqInquiryRepository;
    }

    @Transactional
    public RfqInquiryResponse submitRfq(RfqInquiryRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required for RFQ submission");
        }
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Name is required for RFQ submission");
        }

        String refNum = generateReferenceNumber();

        RfqInquiry inquiry = RfqInquiry.builder()
                .referenceNumber(refNum)
                .name(request.getName())
                .company(request.getCompany())
                .email(request.getEmail())
                .phone(request.getPhone())
                .vesselName(request.getVesselName())
                .imoNumber(request.getImoNumber())
                .deliveryPort(request.getDeliveryPort())
                .urgency(request.getUrgency())
                .subject(request.getSubject())
                .message(request.getMessage())
                .notes(request.getNotes())
                .status("Received")
                .build();

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (RfqItemDto itemDto : request.getItems()) {
                RfqItem item = RfqItem.builder()
                        .productId(itemDto.getProductId())
                        .partNumber(itemDto.getPartNumber())
                        .title(itemDto.getTitle())
                        .quantity(itemDto.getQuantity() != null ? itemDto.getQuantity() : 1)
                        .build();
                inquiry.addItem(item);
            }
        }

        RfqInquiry saved = rfqInquiryRepository.save(inquiry);

        RfqInquiryResponse response = mapInquiryToResponse(saved);
        response.setMessage("Quotation request submitted successfully. Our marine sales engineer will contact you shortly.");
        return response;
    }

    public List<RfqInquiryResponse> getRfqsByEmail(String email) {
        return rfqInquiryRepository.findByEmailOrderByCreatedAtDesc(email).stream()
                .map(this::mapInquiryToResponse)
                .collect(Collectors.toList());
    }

    public RfqInquiryResponse getRfqByReference(String referenceNumber) {
        RfqInquiry inquiry = rfqInquiryRepository.findByReferenceNumber(referenceNumber)
                .orElseThrow(() -> new IllegalArgumentException("RFQ Inquiry not found: " + referenceNumber));
        return mapInquiryToResponse(inquiry);
    }

    public List<RfqInquiryResponse> getAllRfqs() {
        return rfqInquiryRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapInquiryToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public RfqInquiryResponse updateRfqStatus(Long id, String status) {
        RfqInquiry inquiry = rfqInquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("RFQ Inquiry not found with id: " + id));
        inquiry.setStatus(status);
        RfqInquiry updated = rfqInquiryRepository.save(inquiry);
        return mapInquiryToResponse(updated);
    }

    @Transactional
    public void deleteRfq(Long id) {
        if (!rfqInquiryRepository.existsById(id)) {
            throw new IllegalArgumentException("RFQ Inquiry not found with id: " + id);
        }
        rfqInquiryRepository.deleteById(id);
    }

    public long countRfqs() {
        return rfqInquiryRepository.count();
    }

    private String generateReferenceNumber() {
        Random random = new Random();
        int number = 100000 + random.nextInt(900000);
        return "RFQ-" + number;
    }

    private RfqItemDto mapItemToDto(RfqItem item) {
        return RfqItemDto.builder()
                .productId(item.getProductId())
                .partNumber(item.getPartNumber())
                .title(item.getTitle())
                .quantity(item.getQuantity())
                .build();
    }

    private RfqInquiryResponse mapInquiryToResponse(RfqInquiry inquiry) {
        return RfqInquiryResponse.builder()
                .id(inquiry.getId())
                .referenceNumber(inquiry.getReferenceNumber())
                .name(inquiry.getName())
                .company(inquiry.getCompany())
                .email(inquiry.getEmail())
                .phone(inquiry.getPhone())
                .vesselName(inquiry.getVesselName())
                .imoNumber(inquiry.getImoNumber())
                .deliveryPort(inquiry.getDeliveryPort())
                .urgency(inquiry.getUrgency())
                .subject(inquiry.getSubject())
                .message(inquiry.getMessage())
                .notes(inquiry.getNotes())
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .items(inquiry.getItems() != null ?
                        inquiry.getItems().stream().map(this::mapItemToDto).collect(Collectors.toList()) :
                        List.of())
                .build();
    }
}
