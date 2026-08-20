package com.sanvimaritime.repository;

import com.sanvimaritime.entity.RfqInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RfqInquiryRepository extends JpaRepository<RfqInquiry, Long> {
    Optional<RfqInquiry> findByReferenceNumber(String referenceNumber);
    List<RfqInquiry> findByEmailOrderByCreatedAtDesc(String email);
    List<RfqInquiry> findAllByOrderByCreatedAtDesc();
}
