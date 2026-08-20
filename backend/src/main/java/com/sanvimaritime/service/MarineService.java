package com.sanvimaritime.service;

import com.sanvimaritime.dto.ServiceDto;
import com.sanvimaritime.entity.MarineServiceEntity;
import com.sanvimaritime.repository.MarineServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MarineService {

    private final MarineServiceRepository marineServiceRepository;

    public MarineService(MarineServiceRepository marineServiceRepository) {
        this.marineServiceRepository = marineServiceRepository;
    }

    public List<ServiceDto> getAllServices() {
        return marineServiceRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ServiceDto getServiceById(String id) {
        MarineServiceEntity entity = marineServiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id: " + id));
        return mapToDto(entity);
    }

    public ServiceDto createService(ServiceDto dto) {
        String id = dto.getId() != null && !dto.getId().isBlank() ? dto.getId() : "srv-" + System.currentTimeMillis();

        MarineServiceEntity entity = MarineServiceEntity.builder()
                .id(id)
                .title(dto.getTitle())
                .shortDescription(dto.getShortDescription())
                .fullDescription(dto.getFullDescription())
                .image(dto.getImage())
                .icon(dto.getIcon())
                .featuresJson(dto.getFeaturesJson())
                .build();

        MarineServiceEntity saved = marineServiceRepository.save(entity);
        return mapToDto(saved);
    }

    public ServiceDto updateService(String id, ServiceDto dto) {
        MarineServiceEntity entity = marineServiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found with id: " + id));

        entity.setTitle(dto.getTitle());
        entity.setShortDescription(dto.getShortDescription());
        entity.setFullDescription(dto.getFullDescription());
        entity.setImage(dto.getImage());
        entity.setIcon(dto.getIcon());
        entity.setFeaturesJson(dto.getFeaturesJson());

        MarineServiceEntity updated = marineServiceRepository.save(entity);
        return mapToDto(updated);
    }

    public void deleteService(String id) {
        if (!marineServiceRepository.existsById(id)) {
            throw new IllegalArgumentException("Service not found with id: " + id);
        }
        marineServiceRepository.deleteById(id);
    }

    public long countServices() {
        return marineServiceRepository.count();
    }

    private ServiceDto mapToDto(MarineServiceEntity entity) {
        return ServiceDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .shortDescription(entity.getShortDescription())
                .fullDescription(entity.getFullDescription())
                .image(entity.getImage())
                .icon(entity.getIcon())
                .featuresJson(entity.getFeaturesJson())
                .build();
    }
}
